from typing import Any
from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.political import AuditLog


async def write_audit_log(
    session: AsyncSession,
    user_id: UUID | None,
    action: str,
    entity_type: str,
    entity_id: UUID | None,
    old_value: dict[str, Any] | None,
    new_value: dict[str, Any] | None,
) -> None:
    session.add(
        AuditLog(
            user_id=user_id,
            action=action,
            entity_type=entity_type,
            entity_id=entity_id,
            old_value=old_value,
            new_value=new_value,
        )
    )
