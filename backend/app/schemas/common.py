from typing import Generic, TypeVar

from pydantic import BaseModel, ConfigDict, Field

T = TypeVar("T")


class APIResponse(BaseModel, Generic[T]):
    success: bool = True
    data: T | None = None
    message: str | None = None


class Page(BaseModel, Generic[T]):
    items: list[T]
    total: int
    page: int
    size: int
    pages: int


class PaginationParams(BaseModel):
    page: int = Field(default=1, ge=1)
    size: int = Field(default=25, ge=1, le=100)
    sort_by: str = "created_at"
    sort_dir: str = Field(default="desc", pattern="^(asc|desc)$")


class ORMModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)
