// features/students/list/StatusAvatar.tsx
import { Student } from "@/types/student";

interface StatusAvatarProps {
  status: Student["status"];
}

export function StatusAvatar({ status }: StatusAvatarProps) {
  const color =
    status === "Aktif" ? "border-primary" :
    status === "Nonaktif" ? "border-secondary" :
    "border-tertiary";

  return (
    <div className={`w-20 h-20 rounded-full border-2 ${color} flex items-center justify-center`}>
      <div className="w-16 h-16 bg-white rounded-full"></div>
    </div>
  );
}