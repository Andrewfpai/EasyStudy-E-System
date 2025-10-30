 "use client"; // If needed for interactivity
  import StudentForm from "./StudentForm";
  export default function AddStudentPage() {
    const handleStudentAdded = () => {
      // Refresh student list or navigate (e.g., using router.push("/students"))
      console.log("Student added, refreshing...");
    };
    return (
      <div>
        <h1>Add New Student</h1>
        <StudentForm onStudentAdded={handleStudentAdded} />
      </div>
    );
  }