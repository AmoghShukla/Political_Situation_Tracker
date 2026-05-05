export const permissions = {
  manageUsers: "users:manage",
  manageRoles: "roles:manage",
  readPoliticalData: "political:read",
  managePoliticalData: "political:manage",
  manageElectionData: "elections:manage",
  readAnalytics: "analytics:read",
  exportData: "data:export",
  readAuditLogs: "audit:read"
} as const;
