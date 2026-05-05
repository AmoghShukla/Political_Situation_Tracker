from typing import Any

from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.political import ElectionRepository, PartyRepository, PoliticianRepository, ResultRepository
from app.schemas.common import Page


class PoliticalService:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def search_parties(self, filters: dict[str, Any], page: int, size: int, sort_by: str, sort_dir: str) -> Page:
        repo = PartyRepository(self.session)
        items, total = await repo.list_paginated(repo.searchable_stmt(filters, sort_by, sort_dir), page, size)
        return Page(items=items, total=total, page=page, size=size, pages=(total + size - 1) // size)

    async def search_politicians(self, filters: dict[str, Any], page: int, size: int, sort_by: str, sort_dir: str) -> Page:
        repo = PoliticianRepository(self.session)
        items, total = await repo.list_paginated(repo.searchable_stmt(filters, sort_by, sort_dir), page, size)
        return Page(items=items, total=total, page=page, size=size, pages=(total + size - 1) // size)

    async def search_elections(self, filters: dict[str, Any], page: int, size: int, sort_by: str, sort_dir: str) -> Page:
        repo = ElectionRepository(self.session)
        items, total = await repo.list_paginated(repo.searchable_stmt(filters, sort_by, sort_dir), page, size)
        return Page(items=items, total=total, page=page, size=size, pages=(total + size - 1) // size)


class AnalyticsService:
    def __init__(self, session: AsyncSession) -> None:
        self.results = ResultRepository(session)

    async def dashboard(self) -> dict[str, Any]:
        return {
            "seats_by_party_year": await self.results.seats_by_party_year(),
            "vote_share": await self.results.vote_share(),
        }
