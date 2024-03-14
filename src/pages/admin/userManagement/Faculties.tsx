import { Button, Flex, Pagination, Table, TableColumnsType } from "antd";
import { Key, useState } from "react";
import GradientContainer from "../../../components/gradientContainer/gradientContainer";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";

export type TTableData = {
  _id: string;
  id: string;
  fullName: string;
  email: string;
  contactNo: string;
  department: string;
  faculty: string;
};

export type TQueryParam = {
  name: string;
  value: boolean | Key;
};

const columns: TableColumnsType<TTableData> = [
  {
    title: <p className="tableHeading">ID</p>,
    dataIndex: "id",
    defaultSortOrder: "ascend",
    sorter: (a, b) => {
      const aId = a?.id.substring(2);
      const bId = b?.id.substring(2);
      return Number(aId) - Number(bId);
    },
  },
  {
    title: <p className="tableHeading">Name</p>,
    dataIndex: "fullName",
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
    title: <p className="tableHeading">Faculty</p>,
    dataIndex: "faculty",
  },
  {
    title: <p className="tableHeading">Department</p>,
    dataIndex: "department",
  },
  {
    title: <p className="tableHeading">Action</p>,
    render: (item) => {
      return (
        <Flex justify="center" align="center" gap={10}>
          <Button>Details</Button>
          <Button>Update</Button>
        </Flex>
      );
    },
    align: "center",
    width: "1%",
  },
];

const Faculties = () => {
  const [page, setPage] = useState<number>(1);
  const [params] = useState<TQueryParam[]>([]);
  const { data, isLoading } = useGetAllFacultiesQuery([
    { name: "limit", value: 5 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  const facultyData = data?.data;
  const metaData = data?.meta;

  const tableData = facultyData?.map(
    ({
      _id,
      id,
      fullName,
      email,
      contactNo,
      academicDepartment,
      academicFaculty,
    }) => ({
      key: _id,
      _id,
      id,
      email,
      fullName,
      contactNo,
      department: academicDepartment.name,
      faculty: academicFaculty.name,
    })
  );

  return (
    <GradientContainer>
      <div style={{ padding: "20px 0" }}>
        <div style={{ paddingBlock: "10px 20px" }}>
          <h1 className="heading">Faculty List</h1>
        </div>
        <Table
          columns={columns}
          dataSource={tableData}
          loading={isLoading}
          pagination={false}
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

export default Faculties;
