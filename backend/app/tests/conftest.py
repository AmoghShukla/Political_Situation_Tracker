import pytest


@pytest.fixture
def permission_codes():
    from app.permissions.codes import ROLE_PERMISSION_MAP

    return ROLE_PERMISSION_MAP
