import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PermissionGate } from "@/components/rbac/permission-gate";
import { useAuthStore } from "@/store/auth-store";

describe("PermissionGate", () => {
  it("renders allowed children", () => {
    useAuthStore.setState({ user: { id: "1", name: "A", email: "a@example.com", is_active: true, role: { id: "r", name: "USER", permissions: [{ id: "p", name: "Read", code: "political:read" }] } } });
    render(<PermissionGate code="political:read"><span>Allowed</span></PermissionGate>);
    expect(screen.getByText("Allowed")).toBeTruthy();
  });
});
