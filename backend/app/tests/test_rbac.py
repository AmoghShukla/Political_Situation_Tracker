def test_role_permission_map_is_hierarchical(permission_codes):
    assert "political:manage" in permission_codes["ADMIN"]
    assert "political:manage" not in permission_codes["USER"]
    assert "analytics:read" in permission_codes["ANALYST"]
    assert set(permission_codes["USER"]).issubset(set(permission_codes["SUPER_ADMIN"]))
