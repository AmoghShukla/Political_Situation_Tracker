from uuid import uuid4

from app.core.security import create_token, decode_token


def test_jwt_roundtrip(monkeypatch):
    monkeypatch.setenv("DATABASE_URL", "postgresql+asyncpg://postgres:postgres@localhost/test")
    monkeypatch.setenv("JWT_SECRET_KEY", "unit-test-secret")
    user_id = uuid4()
    token = create_token(user_id, "access", __import__("datetime").timedelta(minutes=5), 3)
    payload = decode_token(token, "access")
    assert payload["sub"] == str(user_id)
    assert payload["token_version"] == 3
