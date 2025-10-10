export interface Session {
  _id?: string;
  patientName: string;
  patientEmail: string;
  psychologistId: string;
  scheduledStart: string;
  durationMin?: number;
  status?: "pendiente" | "cancelada" | "reagendada" | "realizada";
  price: number;
  notes?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
