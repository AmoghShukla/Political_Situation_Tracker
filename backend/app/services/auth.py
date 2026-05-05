from datetime import timedelta

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.core.security import create_token, decode_token, hash_password, verify_password
from app.models.auth import Role, User
from app.repositories.auth import UserRepository
from app.schemas.auth import TokenPair, UserCreate


class AuthService:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session
        self.users = UserRepository(session)
        self.settings = get_settings()

    async def authenticate(self, email: str, password: str) -> TokenPair:
        user = await self.users.by_email(email)
        if not user or not user.is_active or not verify_password(password, user.hashed_password):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
        return self._tokens_for_user(user)

    async def refresh(self, refresh_token: str) -> TokenPair:
        try:
            payload = decode_token(refresh_token, "refresh")
        except ValueError as exc:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token") from exc
        user = await self.users.get(payload["sub"])
        if not user or not user.is_active or int(payload.get("token_version", -1)) != user.token_version:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token expired")
        user.token_version += 1
        await self.session.flush()
        return self._tokens_for_user(user)

    async def create_user(self, payload: UserCreate) -> User:
        user = await self.users.create(
            {
                "name": payload.name,
                "email": payload.email.lower(),
                "hashed_password": hash_password(payload.password),
                "role_id": payload.role_id,
            }
        )
        await self.session.flush()
        return user

    def _tokens_for_user(self, user: User) -> TokenPair:
        return TokenPair(
            access_token=create_token(user.id, "access", timedelta(minutes=self.settings.ACCESS_TOKEN_EXPIRE_MINUTES), user.token_version),
            refresh_token=create_token(user.id, "refresh", timedelta(days=self.settings.REFRESH_TOKEN_EXPIRE_DAYS), user.token_version),
        )
