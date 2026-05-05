from fastapi import APIRouter

from app.api.v1 import analytics, auth, political

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(political.router)
api_router.include_router(analytics.router)
