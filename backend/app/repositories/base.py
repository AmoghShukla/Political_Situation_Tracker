from typing import Any, Generic, TypeVar
from uuid import UUID

from sqlalchemy import Select, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.base import Base

ModelT = TypeVar("ModelT", bound=Base)


class BaseRepository(Generic[ModelT]):
    def __init__(self, session: AsyncSession, model: type[ModelT]) -> None:
        self.session = session
        self.model = model

    async def get(self, entity_id: UUID) -> ModelT | None:
        return await self.session.get(self.model, entity_id)

    async def create(self, data: dict[str, Any]) -> ModelT:
        entity = self.model(**data)
        self.session.add(entity)
        await self.session.flush()
        return entity

    async def list_paginated(self, stmt: Select[tuple[ModelT]], page: int, size: int) -> tuple[list[ModelT], int]:
        total_stmt = select(func.count()).select_from(stmt.order_by(None).subquery())
        total = await self.session.scalar(total_stmt) or 0
        rows = await self.session.scalars(stmt.offset((page - 1) * size).limit(size))
        return list(rows.unique()), total

    async def soft_delete(self, entity: ModelT) -> None:
        if hasattr(entity, "deleted_at"):
            from datetime import datetime, timezone

            setattr(entity, "deleted_at", datetime.now(timezone.utc))
        await self.session.flush()
