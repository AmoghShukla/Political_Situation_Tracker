from typing import Any

from sqlalchemy import Select, and_, asc, desc, func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.political import Election, ElectionResult, PoliticalParty, Politician
from app.repositories.base import BaseRepository


class PoliticalRepository(BaseRepository):
    searchable_columns: tuple[str, ...] = ()

    def searchable_stmt(self, filters: dict[str, Any], sort_by: str, sort_dir: str) -> Select:
        stmt = select(self.model).where(getattr(self.model, "deleted_at").is_(None))
        q = filters.pop("q", None)
        if q and self.searchable_columns:
            like = f"%{q}%"
            stmt = stmt.where(or_(*[getattr(self.model, col).ilike(like) for col in self.searchable_columns]))
        clauses = []
        for key, value in filters.items():
            if value is not None and hasattr(self.model, key):
                clauses.append(getattr(self.model, key) == value)
        if clauses:
            stmt = stmt.where(and_(*clauses))
        sort_col = getattr(self.model, sort_by, getattr(self.model, "created_at", None))
        if sort_col is not None:
            stmt = stmt.order_by(desc(sort_col) if sort_dir == "desc" else asc(sort_col))
        return stmt


class PartyRepository(PoliticalRepository):
    searchable_columns = ("name", "ideology", "president")

    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, PoliticalParty)


class PoliticianRepository(PoliticalRepository):
    searchable_columns = ("full_name", "current_position", "education")

    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, Politician)


class ElectionRepository(PoliticalRepository):
    searchable_columns = ("election_name", "election_type", "state", "status")

    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, Election)


class ResultRepository(BaseRepository[ElectionResult]):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, ElectionResult)

    async def seats_by_party_year(self) -> list[dict[str, Any]]:
        stmt = (
            select(Election.year, PoliticalParty.name.label("party"), func.count(ElectionResult.id).label("seats"))
            .join(Election, Election.id == ElectionResult.election_id)
            .join(PoliticalParty, PoliticalParty.id == ElectionResult.party_id)
            .where(ElectionResult.won.is_(True), ElectionResult.deleted_at.is_(None))
            .group_by(Election.year, PoliticalParty.name)
            .order_by(Election.year, PoliticalParty.name)
        )
        rows = await self.session.execute(stmt)
        return [dict(row._mapping) for row in rows]

    async def vote_share(self, election_id: str | None = None) -> list[dict[str, Any]]:
        stmt = (
            select(PoliticalParty.name.label("party"), func.avg(ElectionResult.vote_percentage).label("vote_share"))
            .join(PoliticalParty, PoliticalParty.id == ElectionResult.party_id)
            .where(ElectionResult.deleted_at.is_(None))
            .group_by(PoliticalParty.name)
            .order_by(desc("vote_share"))
        )
        if election_id:
            stmt = stmt.where(ElectionResult.election_id == election_id)
        rows = await self.session.execute(stmt)
        return [{"party": row.party, "vote_share": float(row.vote_share or 0)} for row in rows]
