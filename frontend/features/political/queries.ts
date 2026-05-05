import { api } from "@/services/api";
import type { ApiResponse, Election, Page, Party, Politician } from "@/types/api";

export async function listParties(q = "") {
  const { data } = await api.get<ApiResponse<Page<Party>>>("/parties", { params: { q } });
  return data.data;
}

export async function listPoliticians(q = "") {
  const { data } = await api.get<ApiResponse<Page<Politician>>>("/politicians", { params: { q } });
  return data.data;
}

export async function listElections(params: Record<string, string | number | undefined> = {}) {
  const { data } = await api.get<ApiResponse<Page<Election>>>("/elections", { params });
  return data.data;
}

export async function dashboardAnalytics() {
  const { data } = await api.get<ApiResponse<{ seats_by_party_year: Array<{ year: number; party: string; seats: number }>; vote_share: Array<{ party: string; vote_share: number }> }>>("/analytics/dashboard");
  return data.data;
}
