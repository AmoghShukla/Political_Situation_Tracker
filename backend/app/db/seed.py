import asyncio
from datetime import datetime, timezone

from sqlalchemy import select

from app.core.config import get_settings
from app.core.security import hash_password
from app.db.session import AsyncSessionLocal
from app.models.auth import Permission, Role, User
from app.models.political import Constituency, Election, ElectionResult, PoliticalParty, Politician
from app.permissions.codes import ROLE_PERMISSION_MAP


async def seed() -> None:
    settings = get_settings()
    async with AsyncSessionLocal() as session:
        async with session.begin():
            permissions_by_code: dict[str, Permission] = {}
            for codes in ROLE_PERMISSION_MAP.values():
                for code in codes:
                    permission = await session.scalar(select(Permission).where(Permission.code == code))
                    if not permission:
                        permission = Permission(name=code.replace(":", " ").title(), code=code)
                        session.add(permission)
                    permissions_by_code[code] = permission

            roles: dict[str, Role] = {}
            for role_name, codes in ROLE_PERMISSION_MAP.items():
                role = await session.scalar(select(Role).where(Role.name == role_name))
                if not role:
                    role = Role(name=role_name, description=f"{role_name.title()} platform role")
                    session.add(role)
                role.permissions = [permissions_by_code[code] for code in codes]
                roles[role_name] = role

            admin = await session.scalar(select(User).where(User.email == settings.FIRST_SUPERADMIN_EMAIL.lower()))
            if not admin:
                session.add(User(name="Platform Super Admin", email=settings.FIRST_SUPERADMIN_EMAIL.lower(), hashed_password=hash_password(settings.FIRST_SUPERADMIN_PASSWORD), role=roles["SUPER_ADMIN"]))

            party = await session.scalar(select(PoliticalParty).where(PoliticalParty.abbreviation == "NDA"))
            if not party:
                party = PoliticalParty(name="National Democratic Alliance", abbreviation="NDA", founded_year=1998, ideology="Centre-right coalition", headquarters="New Delhi", president="Coalition leadership", description="Sample alliance-style party record for demo analytics.", total_members=12000000, website="https://example.org", logo_url="")
                opposition = PoliticalParty(name="Indian National Developmental Inclusive Alliance", abbreviation="INDIA", founded_year=2023, ideology="Big tent coalition", headquarters="New Delhi", president="Coalition council", description="Sample opposition coalition record.", total_members=9000000, website="https://example.org", logo_url="")
                constituency = Constituency(name="Lucknow", state="Uttar Pradesh", type="Lok Sabha", population=2400000)
                politician = Politician(full_name="Aarav Sharma", age=54, gender="Male", party=party, constituency=constituency, current_position="Member of Parliament", education="MA Political Science", assets_declared=72500000, criminal_cases=0, bio="Sample elected representative profile.")
                election = Election(election_name="General Election 2024", election_type="Lok Sabha", year=2024, state="National", total_seats=543, winning_party=party, turnout_percentage=65.8, status="completed")
                result = ElectionResult(election=election, constituency=constituency, politician=politician, party=party, votes_received=612000, vote_percentage=52.4, won=True)
                session.add_all([party, opposition, constituency, politician, election, result])


if __name__ == "__main__":
    asyncio.run(seed())
