import { TableCell, TableRow } from "@/components/ui/table";
import { Student } from "@/types/student";

interface StudentTableRowProps {
  student: Student;
  onViewDetail: (studentId: number) => void;
}

export function StudentTableRow({ student, onViewDetail }: StudentTableRowProps) {
  return (
    <TableRow className="border border-background">
      <TableCell className="px-6 py-4 text-center">{student.id}</TableCell>
      <TableCell className="px-6 py-4">{student.name}</TableCell>
      <TableCell className="px-6 py-4">{student.hanziName}</TableCell>
      <TableCell className="px-6 py-4">{student.phoneNumber}</TableCell>
      <TableCell className="px-6 py-4 text-center">{student.tokenRemaining}</TableCell>
      <TableCell className="px-6 py-4 font-semibold text-center min-w-32">{student.tipeHarga}</TableCell>
      <TableCell className="px-6 py-4 text-center">{student.lessonPrice}</TableCell>
      <TableCell className="px-6 py-4 text-center">{student.startLevel}</TableCell>
      <TableCell
        onClick={() => onViewDetail(student.id)}
        className="px-6 py-4 text-center font-semibold underline hover:no-underline cursor-pointer"
      >
        Lihat Detail
      </TableCell>
    </TableRow>
  );
}
