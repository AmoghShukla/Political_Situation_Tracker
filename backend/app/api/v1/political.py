from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session
from app.dependencies.auth import get_current_user, require_permissions
from app.models.auth import User
from app.permissions.codes import PermissionCode
from app.repositories.base import BaseRepository
from app.repositories.political import ElectionRepository, PartyRepository, PoliticianRepository, ResultRepository
from app.schemas.common import APIResponse, Page
from app.schemas.political import ElectionCreate, ElectionRead, ElectionResultCreate, ElectionResultRead, PartyCreate, PartyRead, PartyUpdate, PoliticianCreate, PoliticianRead
from app.services.audit import write_audit_log
from app.services.political import PoliticalService

router = APIRouter(tags=["political-data"], dependencies=[Depends(require_permissions(PermissionCode.READ_POLITICAL_DATA))])


@router.get("/parties", response_model=APIResponse[Page[PartyRead]])
async def parties(
    session: AsyncSession = Depends(get_session),
    q: str | None = None,
    ideology: str | None = None,
    page: Annotated[int, Query(ge=1)] = 1,
    size: Annotated[int, Query(ge=1, le=100)] = 25,
    sort_by: str = "name",
    sort_dir: str = "asc",
) -> APIResponse[Page[PartyRead]]:
    data = await PoliticalService(session).search_parties({"q": q, "ideology": ideology}, page, size, sort_by, sort_dir)
    return APIResponse(data=data)


@router.post("/parties", response_model=APIResponse[PartyRead], dependencies=[Depends(require_permissions(PermissionCode.MANAGE_POLITICAL_DATA))])
async def create_party(payload: PartyCreate, session: AsyncSession = Depends(get_session), user: User = Depends(get_current_user)) -> APIResponse[PartyRead]:
    async with session.begin():
        party = await PartyRepository(session).create(payload.model_dump())
        await write_audit_log(session, user.id, "create", "PoliticalParty", party.id, None, payload.model_dump())
    return APIResponse(data=party, message="Party created")


@router.patch("/parties/{party_id}", response_model=APIResponse[PartyRead], dependencies=[Depends(require_permissions(PermissionCode.MANAGE_POLITICAL_DATA))])
async def update_party(party_id: UUID, payload: PartyUpdate, session: AsyncSession = Depends(get_session), user: User = Depends(get_current_user)) -> APIResponse[PartyRead]:
    async with session.begin():
        repo = PartyRepository(session)
        party = await repo.get(party_id)
        if not party:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Party not found")
        old = {k: getattr(party, k) for k in payload.model_dump(exclude_unset=True)} if party else None
        for key, value in payload.model_dump(exclude_unset=True).items():
            setattr(party, key, value)
        await write_audit_log(session, user.id, "update", "PoliticalParty", party_id, old, payload.model_dump(exclude_unset=True))
    return APIResponse(data=party, message="Party updated")


@router.delete("/parties/{party_id}", response_model=APIResponse[dict], dependencies=[Depends(require_permissions(PermissionCode.MANAGE_POLITICAL_DATA))])
async def delete_party(party_id: UUID, session: AsyncSession = Depends(get_session), user: User = Depends(get_current_user)) -> APIResponse[dict]:
    async with session.begin():
        repo = PartyRepository(session)
        party = await repo.get(party_id)
        if not party:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Party not found")
        await repo.soft_delete(party)
        await write_audit_log(session, user.id, "delete", "PoliticalParty", party_id, None, None)
    return APIResponse(data={"id": str(party_id)}, message="Party deleted")


@router.get("/politicians", response_model=APIResponse[Page[PoliticianRead]])
async def politicians(session: AsyncSession = Depends(get_session), q: str | None = None, current_position: str | None = None, page: int = 1, size: int = 25) -> APIResponse[Page[PoliticianRead]]:
    data = await PoliticalService(session).search_politicians({"q": q, "current_position": current_position}, page, size, "full_name", "asc")
    return APIResponse(data=data)


@router.post("/politicians", response_model=APIResponse[PoliticianRead], dependencies=[Depends(require_permissions(PermissionCode.MANAGE_POLITICAL_DATA))])
async def create_politician(payload: PoliticianCreate, session: AsyncSession = Depends(get_session)) -> APIResponse[PoliticianRead]:
    async with session.begin():
        politician = await PoliticianRepository(session).create(payload.model_dump())
    return APIResponse(data=politician, message="Politician created")


@router.get("/elections", response_model=APIResponse[Page[ElectionRead]])
async def elections(session: AsyncSession = Depends(get_session), q: str | None = None, year: int | None = None, state: str | None = None, page: int = 1, size: int = 25) -> APIResponse[Page[ElectionRead]]:
    data = await PoliticalService(session).search_elections({"q": q, "year": year, "state": state}, page, size, "year", "desc")
    return APIResponse(data=data)


@router.post("/elections", response_model=APIResponse[ElectionRead], dependencies=[Depends(require_permissions(PermissionCode.MANAGE_ELECTION_DATA))])
async def create_election(payload: ElectionCreate, session: AsyncSession = Depends(get_session)) -> APIResponse[ElectionRead]:
    async with session.begin():
        election = await ElectionRepository(session).create(payload.model_dump())
    return APIResponse(data=election, message="Election created")


@router.post("/election-results", response_model=APIResponse[ElectionResultRead], dependencies=[Depends(require_permissions(PermissionCode.MANAGE_ELECTION_DATA))])
async def create_result(payload: ElectionResultCreate, session: AsyncSession = Depends(get_session)) -> APIResponse[ElectionResultRead]:
    async with session.begin():
        result = await ResultRepository(session).create(payload.model_dump())
    return APIResponse(data=result, message="Result recorded")
