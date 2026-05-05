from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.auth import Role, User
from app.repositories.base import BaseRepository


class UserRepository(BaseRepository[User]):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, User)

    async def by_email(self, email: str) -> User | None:
        stmt = select(User).options(selectinload(User.role).selectinload(Role.permissions)).where(User.email == email.lower())
        return await self.session.scalar(stmt)
