import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagement.api";

const StudentDetails = () => {
  const { studentId } = useParams();
  const { data } = useGetSingleStudentQuery(studentId);

  const studentDetails = data?.data;

  console.log(studentDetails);
  return (
    <div>
      <h1>Student Data</h1>
    </div>
  );
};

export default StudentDetails;
