export type Role = "admin" | "teacher" | "student" | "parent";

export interface User {
  email: string;
  name: string;
  role: Role;
}

const SEED: Record<string, { password: string; user: User }> = {
  "admin@helc.com": { password: "Admin@123", user: { email: "admin@helc.com", name: "HELC Admin", role: "admin" } },
  "teacher@helc.com": { password: "Teacher@123", user: { email: "teacher@helc.com", name: "Mr. Mensah", role: "teacher" } },
  "student@helc.com": { password: "Student@123", user: { email: "student@helc.com", name: "Ama Asante", role: "student" } },
  "parent@helc.com": { password: "Parent@123", user: { email: "parent@helc.com", name: "Mrs. Owusu", role: "parent" } },
};

const USERS_KEY = "helc_users";
const SESSION_KEY = "helc_session";

function loadUsers(): Record<string, { password: string; user: User }> {
  if (typeof window === "undefined") return SEED;
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) {
    localStorage.setItem(USERS_KEY, JSON.stringify(SEED));
    return SEED;
  }
  try { return { ...SEED, ...JSON.parse(raw) }; } catch { return SEED; }
}

function saveUsers(users: Record<string, { password: string; user: User }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function login(email: string, password: string): User | null {
  const users = loadUsers();
  const rec = users[email.toLowerCase()];
  if (!rec || rec.password !== password) return null;
  localStorage.setItem(SESSION_KEY, JSON.stringify(rec.user));
  window.dispatchEvent(new Event("helc-auth"));
  return rec.user;
}

export function signup(email: string, password: string, name: string, role: Exclude<Role, "admin">): User | null {
  const users = loadUsers();
  const key = email.toLowerCase();
  if (users[key]) return null;
  const user: User = { email: key, name, role };
  users[key] = { password, user };
  saveUsers(users);
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("helc-auth"));
  return user;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("helc-auth"));
}

export function getSession(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function dashboardPath(role: Role): string {
  switch (role) {
    case "admin": return "/admin";
    case "teacher": return "/teacher";
    case "student": return "/student";
    case "parent": return "/parent";
  }
}
