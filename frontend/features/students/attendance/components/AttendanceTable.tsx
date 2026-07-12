import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Student } from "@/types/student";
import { AttendanceTableRow } from "./AttendanceTableRow";

interface AttendanceTableProps {
  students: Student[];
  selectedStudents: Student[];
  onToggleSelect: (student: Student) => void;
}

export function AttendanceTable({ students, selectedStudents, onToggleSelect }: AttendanceTableProps) {
  return (
    <div className="overflow-auto flex-1 mt-5 px-6">
      <div className="max-w-vw overflow-auto rounded-md">
        <Table className="w-full">
          <TableHeader className="text-E-gray">
            <TableRow>
              <TableHead className="py-3 text-center text-sm font-semibold cursor-pointer">Select</TableHead>
              <TableHead className="px-6 py-3 text-center text-sm font-semibold cursor-pointer">ID</TableHead>
              <TableHead className="px-6 py-3 text-left text-sm font-semibold cursor-pointer">Name</TableHead>
              <TableHead className="px-6 py-3 text-left text-sm font-semibold cursor-pointer">Hanzi</TableHead>
              <TableHead className="px-6 py-3 text-center text-sm font-semibold cursor-pointer">
                Tokens Remaining
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border border-background">
            {students.map((student, index) => (
              <AttendanceTableRow
                key={student.id}
                student={student}
                index={index}
                isSelected={selectedStudents.some((s) => s.id === student.id)}
                onToggleSelect={onToggleSelect}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}