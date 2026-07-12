import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Student } from "@/types/student";

interface AttendanceTableRowProps {
  student: Student;
  index: number;
  isSelected: boolean;
  onToggleSelect: (student: Student) => void;
}

export function AttendanceTableRow({
  student,
  index,
  isSelected,
  onToggleSelect,
}: AttendanceTableRowProps) {
  return (
    <TableRow className={`border border-background ${index % 2 === 0 ? "bg-background" : ""}`}>
      <TableCell className="py-4 !pl-0 text-sm text-center">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggleSelect(student)}
          className="w-5 h-5 border-2 border-gray-300 data-[state=checked]:text-E-white data-[state=checked]:bg-primary cursor-pointer"
        />
      </TableCell>
      <TableCell className="px-6 py-4 text-sm text-center">{student.id}</TableCell>
      <TableCell className="px-6 py-4 text-sm">{student.name}</TableCell>
      <TableCell className="px-6 py-4 text-sm">{student.hanziName}</TableCell>
      <TableCell className="px-6 py-4 text-sm text-center">{student.tokenRemaining}</TableCell>
    </TableRow>
  );
}