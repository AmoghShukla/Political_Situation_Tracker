from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session
from app.dependencies.auth import get_current_user, require_permissions
from app.permissions.codes import PermissionCode
from app.schemas.auth import LoginRequest, RefreshRequest, TokenPair, UserCreate, UserRead
from app.schemas.common import APIResponse
from app.services.auth import AuthService

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=APIResponse[TokenPair])
async def login(payload: LoginRequest, session: AsyncSession = Depends(get_session)) -> APIResponse[TokenPair]:
    return APIResponse(data=await AuthService(session).authenticate(payload.email, payload.password))


@router.post("/refresh", response_model=APIResponse[TokenPair])
async def refresh(payload: RefreshRequest, session: AsyncSession = Depends(get_session)) -> APIResponse[TokenPair]:
    async with session.begin():
        tokens = await AuthService(session).refresh(payload.refresh_token)
    return APIResponse(data=tokens)


@router.get("/me", response_model=APIResponse[UserRead])
async def me(current_user=Depends(get_current_user)) -> APIResponse[UserRead]:
    return APIResponse(data=current_user)


@router.post("/users", response_model=APIResponse[UserRead], dependencies=[Depends(require_permissions(PermissionCode.MANAGE_USERS))])
async def create_user(payload: UserCreate, session: AsyncSession = Depends(get_session)) -> APIResponse[UserRead]:
    async with session.begin():
        user = await AuthService(session).create_user(payload)
    return APIResponse(data=user, message="User created")
