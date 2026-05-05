from datetime import datetime
from uuid import UUID

from sqlalchemy import Boolean, DateTime, ForeignKey, Index, Integer, Numeric, String, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, SoftDeleteMixin, TimestampMixin, UUIDMixin


class PoliticalParty(UUIDMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "political_parties"
    __table_args__ = (
        Index("ix_parties_name_trgm", "name", postgresql_using="gin", postgresql_ops={"name": "gin_trgm_ops"}),
        Index("ix_parties_search", "name", "ideology", "president"),
    )

    name: Mapped[str] = mapped_column(String(180), unique=True, index=True)
    abbreviation: Mapped[str] = mapped_column(String(32), unique=True, index=True)
    founded_year: Mapped[int | None] = mapped_column(Integer)
    ideology: Mapped[str | None] = mapped_column(String(180), index=True)
    headquarters: Mapped[str | None] = mapped_column(String(255))
    president: Mapped[str | None] = mapped_column(String(180), index=True)
    description: Mapped[str | None] = mapped_column(Text)
    total_members: Mapped[int | None] = mapped_column(Integer)
    website: Mapped[str | None] = mapped_column(String(255))
    logo_url: Mapped[str | None] = mapped_column(String(500))


class Constituency(UUIDMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "constituencies"
    __table_args__ = (UniqueConstraint("name", "state", "type", name="uq_constituency_identity"),)

    name: Mapped[str] = mapped_column(String(180), index=True)
    state: Mapped[str] = mapped_column(String(120), index=True)
    type: Mapped[str] = mapped_column(String(60), index=True)
    population: Mapped[int | None] = mapped_column(Integer)


class Politician(UUIDMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "politicians"
    __table_args__ = (
        Index("ix_politicians_name_trgm", "full_name", postgresql_using="gin", postgresql_ops={"full_name": "gin_trgm_ops"}),
        Index("ix_politicians_search", "full_name", "current_position"),
    )

    full_name: Mapped[str] = mapped_column(String(180), index=True)
    age: Mapped[int | None] = mapped_column(Integer)
    gender: Mapped[str | None] = mapped_column(String(32))
    political_party_id: Mapped[UUID | None] = mapped_column(ForeignKey("political_parties.id"), index=True)
    constituency_id: Mapped[UUID | None] = mapped_column(ForeignKey("constituencies.id"), index=True)
    current_position: Mapped[str | None] = mapped_column(String(180), index=True)
    education: Mapped[str | None] = mapped_column(String(255))
    assets_declared: Mapped[float | None] = mapped_column(Numeric(14, 2))
    criminal_cases: Mapped[int | None] = mapped_column(Integer, default=0)
    image_url: Mapped[str | None] = mapped_column(String(500))
    bio: Mapped[str | None] = mapped_column(Text)
    party: Mapped[PoliticalParty | None] = relationship(lazy="selectin")
    constituency: Mapped[Constituency | None] = relationship(lazy="selectin")


class Election(UUIDMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "elections"
    __table_args__ = (Index("ix_elections_year_state_type", "year", "state", "election_type"),)

    election_name: Mapped[str] = mapped_column(String(220), index=True)
    election_type: Mapped[str] = mapped_column(String(80), index=True)
    year: Mapped[int] = mapped_column(Integer, index=True)
    state: Mapped[str | None] = mapped_column(String(120), index=True)
    total_seats: Mapped[int] = mapped_column(Integer)
    winning_party_id: Mapped[UUID | None] = mapped_column(ForeignKey("political_parties.id"), index=True)
    turnout_percentage: Mapped[float | None] = mapped_column(Numeric(5, 2))
    status: Mapped[str] = mapped_column(String(40), index=True)
    winning_party: Mapped[PoliticalParty | None] = relationship(lazy="selectin")


class ElectionResult(UUIDMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "election_results"
    __table_args__ = (
        UniqueConstraint("election_id", "constituency_id", "politician_id", name="uq_result_candidate_constituency"),
        Index("ix_results_party_year", "party_id", "election_id"),
        Index("ix_results_constituency_won", "constituency_id", "won"),
    )

    election_id: Mapped[UUID] = mapped_column(ForeignKey("elections.id"), index=True)
    constituency_id: Mapped[UUID] = mapped_column(ForeignKey("constituencies.id"), index=True)
    politician_id: Mapped[UUID] = mapped_column(ForeignKey("politicians.id"), index=True)
    party_id: Mapped[UUID] = mapped_column(ForeignKey("political_parties.id"), index=True)
    votes_received: Mapped[int] = mapped_column(Integer)
    vote_percentage: Mapped[float] = mapped_column(Numeric(5, 2))
    won: Mapped[bool] = mapped_column(Boolean, index=True)
    election: Mapped[Election] = relationship(lazy="selectin")
    constituency: Mapped[Constituency] = relationship(lazy="selectin")
    politician: Mapped[Politician] = relationship(lazy="selectin")
    party: Mapped[PoliticalParty] = relationship(lazy="selectin")


class Alliance(UUIDMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "alliances"

    alliance_name: Mapped[str] = mapped_column(String(180), unique=True, index=True)
    description: Mapped[str | None] = mapped_column(Text)
    members: Mapped[list["AllianceMember"]] = relationship(back_populates="alliance", cascade="all, delete-orphan", lazy="selectin")


class AllianceMember(Base):
    __tablename__ = "alliance_members"

    alliance_id: Mapped[UUID] = mapped_column(ForeignKey("alliances.id", ondelete="CASCADE"), primary_key=True)
    party_id: Mapped[UUID] = mapped_column(ForeignKey("political_parties.id", ondelete="CASCADE"), primary_key=True)
    alliance: Mapped[Alliance] = relationship(back_populates="members")
    party: Mapped[PoliticalParty] = relationship(lazy="selectin")


class PoliticalNews(UUIDMixin, TimestampMixin, SoftDeleteMixin, Base):
    __tablename__ = "political_news"
    __table_args__ = (Index("ix_news_published_source", "published_at", "source"),)

    title: Mapped[str] = mapped_column(String(260), index=True)
    content: Mapped[str] = mapped_column(Text)
    source: Mapped[str] = mapped_column(String(160), index=True)
    published_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), index=True)


class AuditLog(UUIDMixin, Base):
    __tablename__ = "audit_logs"
    __table_args__ = (Index("ix_audit_entity", "entity_type", "entity_id"), Index("ix_audit_user_created", "user_id", "created_at"))

    user_id: Mapped[UUID | None] = mapped_column(ForeignKey("users.id"), index=True)
    action: Mapped[str] = mapped_column(String(80), index=True)
    entity_type: Mapped[str] = mapped_column(String(120), index=True)
    entity_id: Mapped[UUID | None] = mapped_column(index=True)
    old_value: Mapped[dict | None] = mapped_column(JSONB)
    new_value: Mapped[dict | None] = mapped_column(JSONB)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, index=True)
