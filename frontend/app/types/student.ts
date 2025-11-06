export interface Student {
  id: number;
  name: string;
  hanziName: string|null;
  pinyinName: string|null;
  phoneNumber: string;
  email: string;
  address: string;
  joinedDate: string;
  tokenUsed: number;
  tokenRemaining: number;
  updatedAt?: string;
  status: "ACTIVE" | "OUT" | "TEMP_INACTIVE";
  notes: string|null;

  // extra fields returned by API
  payments?: any[];
  tokenUsageHistory?: any[];
  tokenAddHistory?: any[];
}
