class PermissionCode:
    MANAGE_USERS = "users:manage"
    MANAGE_ROLES = "roles:manage"
    READ_POLITICAL_DATA = "political:read"
    MANAGE_POLITICAL_DATA = "political:manage"
    MANAGE_ELECTION_DATA = "elections:manage"
    READ_ANALYTICS = "analytics:read"
    EXPORT_DATA = "data:export"
    READ_AUDIT_LOGS = "audit:read"


ROLE_PERMISSION_MAP = {
    "SUPER_ADMIN": [
        PermissionCode.MANAGE_USERS,
        PermissionCode.MANAGE_ROLES,
        PermissionCode.READ_POLITICAL_DATA,
        PermissionCode.MANAGE_POLITICAL_DATA,
        PermissionCode.MANAGE_ELECTION_DATA,
        PermissionCode.READ_ANALYTICS,
        PermissionCode.EXPORT_DATA,
        PermissionCode.READ_AUDIT_LOGS,
    ],
    "ADMIN": [
        PermissionCode.MANAGE_USERS,
        PermissionCode.READ_POLITICAL_DATA,
        PermissionCode.MANAGE_POLITICAL_DATA,
        PermissionCode.MANAGE_ELECTION_DATA,
        PermissionCode.READ_ANALYTICS,
        PermissionCode.EXPORT_DATA,
        PermissionCode.READ_AUDIT_LOGS,
    ],
    "MODERATOR": [PermissionCode.READ_POLITICAL_DATA, PermissionCode.MANAGE_ELECTION_DATA],
    "ANALYST": [PermissionCode.READ_POLITICAL_DATA, PermissionCode.READ_ANALYTICS, PermissionCode.EXPORT_DATA],
    "USER": [PermissionCode.READ_POLITICAL_DATA],
}
