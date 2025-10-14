export interface Session {
  _id?: string;
  patientName: string;
  patientEmail: string;
  psychologistId:
    | string
    | {
        _id: string;
        name: string;
        email: string;
      };
  scheduledStart: string;
  durationMin?: number;
  status?: "pendiente" | "cancelada" | "reagendada" | "realizada";
  price: number;
  notes?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type SessionFormData = {
  patientName: string;
  patientEmail: string;
  psychologistId:
    | string
    | {
        _id: string;
        name: string;
        email: string;
      };
  scheduledStart: string;
  durationMin: number;
  price: number;
  status: "pendiente" | "cancelada" | "reagendada" | "realizada";
  notes: string;
};
