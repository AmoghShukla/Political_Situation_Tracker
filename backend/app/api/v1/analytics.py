from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session
from app.dependencies.auth import require_permissions
from app.permissions.codes import PermissionCode
from app.schemas.common import APIResponse
from app.services.political import AnalyticsService

router = APIRouter(prefix="/analytics", tags=["analytics"], dependencies=[Depends(require_permissions(PermissionCode.READ_ANALYTICS))])


@router.get("/dashboard", response_model=APIResponse[dict])
async def dashboard(session: AsyncSession = Depends(get_session)) -> APIResponse[dict]:
    return APIResponse(data=await AnalyticsService(session).dashboard())
