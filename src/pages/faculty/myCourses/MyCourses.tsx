import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Col,
  Flex,
  Modal,
  Pagination,
  Row,
  Table,
  TableColumnsType,
} from "antd";
import { BaseOptionType } from "antd/es/select";
import { Key, useState } from "react";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import FormInput from "../../../components/form/FormInput";
import PHForm from "../../../components/form/PHForm";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import GradientContainer from "../../../components/gradientContainer/gradientContainer";
import {
  useGetAllCoursesQuery,
  useGetAllRegisteredSemesterQuery,
} from "../../../redux/features/admin/courseManagement.api";
import {
  useGetFacultyCoursesQuery,
  useUpdatedStudentMarksMutation,
} from "../../../redux/features/faculty/courseManagement.api";
import { facultyCoursesSchema } from "../../../schemas/FacultyCourse.schema";
import {
  TOfferedCourse,
  TSemesterRegistration,
} from "../../../types/courseManagement.types";
import { TStudent } from "../../../types/userManagement.types";
import handleAPIRequest from "../../../utils/handleAPIRequest";
import {
  getCourseOptions,
  getRegisteredSemesterOptions,
} from "../../admin/courseManagement/courseManagement.utils";

export type TTableData = {
  _id: string;
  id: string;
  fullName: string;
  email: string;
  contactNo: number;
  studentId: string;
  semesterRegistration: TSemesterRegistration;
  offeredCourse: TOfferedCourse;
  student: TStudent;
};
export type TQueryParam = {
  name: string;
  value: boolean | Key;
};

const columns: TableColumnsType<TTableData> = [
  {
    title: <p className="tableHeading">Name</p>,
    dataIndex: "fullName",
  },
  {
    title: <p className="tableHeading">Roll No</p>,
    dataIndex: "id",
    defaultSortOrder: "ascend",
    sorter: (a, b) => Number(a.id) - Number(b.id),
  },
  {
    title: <p className="tableHeading">Email</p>,
    dataIndex: "email",
  },
  {
    title: <p className="tableHeading">Contact No.</p>,
    dataIndex: "contactNo",
  },
  {
    title: <p className="tableHeading">Action</p>,
    render: (item) => {
      return <UpdateMarksModal modalData={item} />;
    },
    align: "center",
    width: "1%",
  },
];

const MyCourses = () => {
  const [page, setPage] = useState<number>(1);
  const [params] = useState<TQueryParam[]>([]);
  const [semesterRegistrationId, setSemesterRegistrationId] =
    useState<string>("");
  const [courseId, setCourseId] = useState<string>("");
  const { data: facultyCourses, isLoading } = useGetFacultyCoursesQuery([
    {
      name: "semesterRegistration",
      value: semesterRegistrationId,
    },
    {
      name: "course",
      value: courseId,
    },
    { name: "limit", value: 5 },
    { name: "page", value: page },
    ...params,
  ]);
  const metaData = facultyCourses?.meta;
  const { data: registeredSemesterData } = useGetAllRegisteredSemesterQuery([
    {
      name: "sort",
      value: "year",
    },
  ]);
  const { data: courseData } = useGetAllCoursesQuery([
    { name: "sort", value: "code" },
  ]);

  const registeredSemesterOptions = getRegisteredSemesterOptions(
    registeredSemesterData?.data
  );

  const courseOptions = getCourseOptions(courseData?.data);

  const tableData = facultyCourses?.data?.map(
    ({ student, semesterRegistration, offeredCourse, _id }) => ({
      key: _id,
      _id: student._id,
      id: student.id,
      email: student.email,
      fullName: student.fullName,
      contactNo: student.contactNo,
      studentId: student._id,
      semesterRegistration,
      offeredCourse,
    })
  );

  return (
    <div style={{ width: "100%" }}>
      <GradientContainer>
        <div style={{ padding: "20px 0" }}>
          <div style={{ paddingBlock: "20px" }}>
            <h1 className="heading">My Students</h1>
          </div>
          <div style={{ padding: "10px 10px" }}>
            <PHForm onSubmit={() => {}}>
              <div>
                <Row gutter={20}>
                  <Col span={24} md={{ span: 8 }}>
                    <PHSelectWithWatch
                      options={registeredSemesterOptions as BaseOptionType[]}
                      name="semesterRegistration"
                      placeholder="Filter By Semester Registration"
                      onValueChange={setSemesterRegistrationId}
                    />
                  </Col>
                  <Col span={24} md={{ span: 8 }}>
                    <PHSelectWithWatch
                      options={courseOptions as BaseOptionType[]}
                      name="course"
                      placeholder="Filter By Course"
                      onValueChange={setCourseId}
                    />
                  </Col>
                </Row>
              </div>
            </PHForm>
          </div>
          <Table
            columns={columns}
            dataSource={tableData}
            loading={isLoading}
            pagination={false}
            style={{
              minHeight: "400px",
              maxHeight: "500px",
              overflowY: "auto",
            }}
            className="tableScrollBar"
          />
          <Flex align="center" justify="center" style={{ paddingTop: "15px" }}>
            <Pagination
              total={metaData?.totalData}
              pageSize={metaData?.limit}
              onChange={(value) => setPage(value)}
            />
          </Flex>
        </div>
      </GradientContainer>
    </div>
  );
};

const UpdateMarksModal = ({ modalData }: { modalData: TTableData }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [updatedStudentMarks] = useUpdatedStudentMarksMutation();

  async function handleSubmit(data: FieldValues) {
    const toastId = toast.loading("Updating student course marks...");
    const payload = {
      semesterRegistration: modalData.semesterRegistration._id,
      offeredCourse: modalData.offeredCourse._id,
      student: modalData?.studentId,
      courseMarks: {
        classTest1: Number(data.classTest1),
        midTerm: Number(data.midTerm),
        classTest2: Number(data.classTest2),
        finalTerm: Number(data.finalTerm),
      },
    };

    const res = await handleAPIRequest(updatedStudentMarks, payload, toastId);
    if (res) {
      handleCancel();
    }
  }

  function showModal() {
    setIsModalOpen(true);
  }

  function handleCancel() {
    setIsModalOpen(false);
  }

  return (
    <>
      <Button className="btn" onClick={showModal}>
        Update Marks
      </Button>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Flex
          justify="center"
          align="center"
          style={{ paddingBlock: "10px 6px" }}
        >
          <h1 className="heading">Update Marks</h1>
        </Flex>
        <PHForm
          onSubmit={handleSubmit}
          resolver={zodResolver(
            facultyCoursesSchema.updateStudentMarksValidationSchema
          )}
        >
          <div>
            <FormInput type="number" name="classTest1" label="Class Test 1" />
            <FormInput type="number" name="midTerm" label="Mid Term" />
            <FormInput type="number" name="classTest2" label="Class Test 2" />
            <FormInput type="number" name="finalTerm" label="Final Term" />
          </div>
          <button
            type="submit"
            className="submitBtn"
            style={{
              paddingBlock: "12px",
              marginTop: "0px",
              marginBottom: "10px",
            }}
          >
            Update
          </button>
        </PHForm>
      </Modal>
    </>
  );
};

export default MyCourses;
