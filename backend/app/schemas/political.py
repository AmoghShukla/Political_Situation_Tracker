from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field

from app.schemas.common import ORMModel


class PartyBase(BaseModel):
    name: str = Field(min_length=2, max_length=180)
    abbreviation: str = Field(min_length=1, max_length=32)
    founded_year: int | None = Field(default=None, ge=1600, le=2100)
    ideology: str | None = None
    headquarters: str | None = None
    president: str | None = None
    description: str | None = None
    total_members: int | None = Field(default=None, ge=0)
    website: str | None = None
    logo_url: str | None = None


class PartyCreate(PartyBase):
    pass


class PartyUpdate(BaseModel):
    name: str | None = None
    abbreviation: str | None = None
    founded_year: int | None = None
    ideology: str | None = None
    headquarters: str | None = None
    president: str | None = None
    description: str | None = None
    total_members: int | None = None
    website: str | None = None
    logo_url: str | None = None


class PartyRead(PartyBase, ORMModel):
    id: UUID
    created_at: datetime
    updated_at: datetime


class ConstituencyCreate(BaseModel):
    name: str
    state: str
    type: str
    population: int | None = Field(default=None, ge=0)


class ConstituencyRead(ConstituencyCreate, ORMModel):
    id: UUID


class PoliticianCreate(BaseModel):
    full_name: str
    age: int | None = Field(default=None, ge=18, le=120)
    gender: str | None = None
    political_party_id: UUID | None = None
    constituency_id: UUID | None = None
    current_position: str | None = None
    education: str | None = None
    assets_declared: float | None = Field(default=None, ge=0)
    criminal_cases: int | None = Field(default=0, ge=0)
    image_url: str | None = None
    bio: str | None = None


class PoliticianRead(PoliticianCreate, ORMModel):
    id: UUID
    party: PartyRead | None = None
    constituency: ConstituencyRead | None = None


class ElectionCreate(BaseModel):
    election_name: str
    election_type: str
    year: int = Field(ge=1900, le=2100)
    state: str | None = None
    total_seats: int = Field(ge=1)
    winning_party_id: UUID | None = None
    turnout_percentage: float | None = Field(default=None, ge=0, le=100)
    status: str


class ElectionRead(ElectionCreate, ORMModel):
    id: UUID
    winning_party: PartyRead | None = None


class ElectionResultCreate(BaseModel):
    election_id: UUID
    constituency_id: UUID
    politician_id: UUID
    party_id: UUID
    votes_received: int = Field(ge=0)
    vote_percentage: float = Field(ge=0, le=100)
    won: bool


class ElectionResultRead(ElectionResultCreate, ORMModel):
    id: UUID
    election: ElectionRead | None = None
    constituency: ConstituencyRead | None = None
    politician: PoliticianRead | None = None
    party: PartyRead | None = None


class AllianceCreate(BaseModel):
    alliance_name: str
    description: str | None = None
    party_ids: list[UUID] = []


class AllianceRead(ORMModel):
    id: UUID
    alliance_name: str
    description: str | None
    parties: list[PartyRead] = []


class NewsCreate(BaseModel):
    title: str
    content: str
    source: str
    published_at: datetime


class NewsRead(NewsCreate, ORMModel):
    id: UUID
