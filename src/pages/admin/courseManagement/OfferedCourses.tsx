import { Flex, Pagination, Table, TableColumnsType } from "antd";
import { Key, useState } from "react";
import GradientContainer from "../../../components/gradientContainer/gradientContainer";
import { useGetAllOfferedCoursesQuery } from "../../../redux/features/admin/courseManagement.api";

export type TTableData = {
  key: string;
  _id: string;
  semesterRegistration: string;
  academicFaculty: string;
  academicDepartment: string;
  course: string;
  faculty: string;
  maxCapacity: number;
  section: number;
  days: string;
  time: string;
};

export type TQueryParam = {
  name: string;
  value: boolean | Key;
};

const columns: TableColumnsType<TTableData> = [
  {
    title: <p className="tableHeading">Course</p>,
    dataIndex: "course",
  },
  {
    title: <p className="tableHeading">Academic Faculty</p>,
    dataIndex: "academicFaculty",
  },
  {
    title: <p className="tableHeading">Academic Department</p>,
    dataIndex: "academicDepartment",
  },
  {
    title: <p className="tableHeading">Faculty</p>,
    dataIndex: "faculty",
  },
  {
    title: <p className="tableHeading">Max Capacity</p>,
    dataIndex: "maxCapacity",
    align: "center",
  },
  {
    title: <p className="tableHeading">Section</p>,
    dataIndex: "section",
    align: "center",
  },
  {
    title: <p className="tableHeading">Days</p>,
    dataIndex: "days",
  },
  {
    title: <p className="tableHeading">Course Time</p>,
    dataIndex: "time",
  },
];

const OfferedCourse = () => {
  const [page, setPage] = useState<number>(1);
  const [params] = useState<TQueryParam[]>([]);
  const { data, isLoading } = useGetAllOfferedCoursesQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    ...params,
  ]);
  const metaData = data?.meta;
  const offeredCourses = data?.data;
  console.log(offeredCourses);

  const tableData = offeredCourses?.map((offeredCourse) => {
    return {
      key: offeredCourse._id,
      _id: offeredCourse._id,
      course: offeredCourse.course.title,
      semesterRegistration: offeredCourse.semesterRegistration,
      academicFaculty: offeredCourse.academicFaculty.name,
      academicDepartment: offeredCourse.academicDepartment.name,
      faculty: offeredCourse.faculty.fullName,
      maxCapacity: offeredCourse.maxCapacity,
      section: offeredCourse.section,
      days: offeredCourse.days.join(" - "),
      time: `${offeredCourse.startTime} - ${offeredCourse.endTime}`,
    };
  });

  return (
    <GradientContainer>
      <div style={{ padding: "20px 0" }}>
        <div style={{ paddingBlock: "10px 20px" }}>
          <h1 className="heading">Offered Courses</h1>
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
  );
};

export default OfferedCourse;
