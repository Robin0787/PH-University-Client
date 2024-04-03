import {
  Button,
  Col,
  Flex,
  Pagination,
  Row,
  Table,
  TableColumnsType,
} from "antd";
import { BaseOptionType } from "antd/es/select";
import { Key, useState } from "react";
import { FieldValues } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import GradientContainer from "../../../components/gradientContainer/gradientContainer";
import { useGetFacultyCoursesQuery } from "../../../redux/features/faculty/courseManagement.api";
import { TStudent } from "../../../types/userManagement.types";

export type TTableData = Pick<
  TStudent,
  "_id" | "id" | "fullName" | "email" | "contactNo"
>;

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
    render: () => {
      return (
        <Flex justify="center" align="center" gap={10}>
          <Button>Update</Button>
        </Flex>
      );
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
  const registeredSemesterOptions = facultyCourses?.data?.map((item) => ({
    value: item.semesterRegistration._id,
    label: `${item.academicSemester?.name} - ${item.academicSemester?.year} ( ${item.academicSemester?.startMonth} - ${item.academicSemester?.endMonth} )`,
  }));
  const courseOptions = facultyCourses?.data?.map((item) => ({
    value: item.course._id,
    label: item.course.title,
  }));

  console.log(facultyCourses);

  const tableData = facultyCourses?.data?.map(({ student }) => ({
    key: student._id,
    _id: student._id,
    id: student.id,
    email: student.email,
    fullName: student.fullName,
    contactNo: student.contactNo,
  }));

  const handleSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div style={{ width: "100%" }}>
      <GradientContainer>
        <div style={{ padding: "20px 0" }}>
          <div style={{ paddingBlock: "10px 20px" }}>
            <h1 className="heading">My Students</h1>
          </div>
          <div style={{ padding: "10px 10px" }}>
            <PHForm onSubmit={handleSubmit}>
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

export default MyCourses;
