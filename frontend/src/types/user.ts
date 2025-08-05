export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "psychologist";
  token: string;
}
