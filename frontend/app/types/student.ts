export interface Student {
  id: number;
  name: string;
  hanziName: string | null;
  pinyinName: string | null;
  phoneNumber: string;
  email: string;
  address: string;
  joinedDate: string;
  birthDate?: string;
  tokenUsed: number;
  tokenRemaining: number;
  startLevel?: string;
  gender?: string;
  parentName?: string;
  parentPhone?: string;
  education?: string;
  schoolOrCompany?: string;
  mandarinGoal?: string;
  heardFrom?: string;
  lessonPrice?: string; // <-- added field
  updatedAt?: string;
  status: "Aktif" | "Nonaktif" | "Keluar";
  tipeHarga: "Lama" | "Baru",
  notes: string | null;

  // extra fields returned by API
  payments?: any[];
  tokenUsageHistory?: any[];
  tokenAddHistory?: any[];
}
