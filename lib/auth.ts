// Auth layer. Supabase is NOT connected yet, so the app runs in DEMO MODE:
// - no account is created
// - no password or personal data is sent or stored anywhere
// When Supabase is set up, implement `supabaseAuth` with the same interface
// and set NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.

export const AUTH_MODE: "demo" | "supabase" =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "supabase" : "demo";

export type Role = "customer" | "pro";

export type AuthResult = { ok: true; demo: boolean } | { ok: false; error: string };

export interface AuthProvider {
  signUp(input: { email: string; password: string; role: Role }): Promise<AuthResult>;
  signIn(input: { email: string; password: string }): Promise<AuthResult>;
  resetPassword(email: string): Promise<AuthResult>;
}

const demoAuth: AuthProvider = {
  async signUp() {
    return { ok: true, demo: true };
  },
  async signIn() {
    return { ok: true, demo: true };
  },
  async resetPassword() {
    return { ok: true, demo: true };
  },
};

export function getAuth(): AuthProvider {
  if (AUTH_MODE === "supabase") {
    // Intentionally not implemented: do not fake a real backend.
    throw new Error("Supabase auth is configured but not implemented yet.");
  }
  return demoAuth;
}

// ---------- Validation (shared by forms, reusable on the server later) ----------

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/** Sudanese mobile numbers: +249 / 00249 / 0 followed by 9 digits starting with 1 or 9. */
export function normalizeSudanPhone(v: string): string | null {
  const digits = v.replace(/[\s\-()]/g, "");
  const m = digits.match(/^(?:\+249|00249|0)?([19]\d{8})$/);
  return m ? `+249${m[1]}` : null;
}

export function passwordProblems(pw: string): ("length" | "letter" | "number")[] {
  const out: ("length" | "letter" | "number")[] = [];
  if (pw.length < 8) out.push("length");
  if (!/\p{L}/u.test(pw)) out.push("letter");
  if (!/\d/.test(pw)) out.push("number");
  return out;
}
