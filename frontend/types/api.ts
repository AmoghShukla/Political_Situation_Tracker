export type Permission = { id: string; name: string; code: string };
export type Role = { id: string; name: string; description?: string; permissions: Permission[] };
export type User = { id: string; name: string; email: string; is_active: boolean; role: Role };
export type ApiResponse<T> = { success: boolean; data: T; message?: string };
export type Page<T> = { items: T[]; total: number; page: number; size: number; pages: number };

export type Party = {
  id: string;
  name: string;
  abbreviation: string;
  founded_year?: number;
  ideology?: string;
  headquarters?: string;
  president?: string;
  total_members?: number;
  website?: string;
  logo_url?: string;
};

export type Politician = {
  id: string;
  full_name: string;
  age?: number;
  current_position?: string;
  party?: Party;
  constituency?: { id: string; name: string; state: string; type: string };
  assets_declared?: number;
  criminal_cases?: number;
};

export type Election = {
  id: string;
  election_name: string;
  election_type: string;
  year: number;
  state?: string;
  total_seats: number;
  turnout_percentage?: number;
  status: string;
  winning_party?: Party;
};
