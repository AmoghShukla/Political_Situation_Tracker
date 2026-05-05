from uuid import UUID

from pydantic import BaseModel, EmailStr, Field

from app.schemas.common import ORMModel


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)


class TokenPair(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class RefreshRequest(BaseModel):
    refresh_token: str


class PermissionRead(ORMModel):
    id: UUID
    name: str
    code: str


class RoleRead(ORMModel):
    id: UUID
    name: str
    description: str | None = None
    permissions: list[PermissionRead] = []


class UserRead(ORMModel):
    id: UUID
    name: str
    email: EmailStr
    is_active: bool
    role: RoleRead


class UserCreate(BaseModel):
    name: str = Field(min_length=2, max_length=160)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    role_id: UUID
