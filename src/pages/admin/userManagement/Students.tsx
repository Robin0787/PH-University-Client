import {
  Button,
  Flex,
  Pagination,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { Key, useState } from "react";
import { Link } from "react-router-dom";
import GradientContainer from "../../../components/gradientContainer/gradientContainer";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
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
    render: (item) => {
      return (
        <Flex justify="center" align="center" gap={10}>
          <Button>
            <Link to={`/admin/student-data/${item._id}`}>Details</Link>
          </Button>
          <Button>Update</Button>
          <Button>Block</Button>
        </Flex>
      );
    },
    align: "center",
    width: "1%",
  },
];

const Students = () => {
  const [page, setPage] = useState<number>(1);
  const [params] = useState<TQueryParam[]>([]);
  const { data, isLoading } = useGetAllStudentsQuery([
    { name: "limit", value: 5 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  const studentData = data?.data;
  const metaData = data?.meta;

  console.log(studentData);

  const tableData = studentData?.map(
    ({ _id, id, fullName, email, contactNo }) => ({
      key: _id,
      _id,
      id,
      email,
      fullName,
      contactNo,
    })
  );

  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    _filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "paginate") {
      console.log(pagination);
    }
  };

  return (
    <GradientContainer>
      <div style={{ padding: "20px 0" }}>
        <div style={{ paddingBlock: "10px 20px" }}>
          <h1 className="heading">Student List</h1>
        </div>
        <Table
          columns={columns}
          dataSource={tableData}
          onChange={onChange}
          loading={isLoading}
          pagination={false}
          style={{ minHeight: "400px" }}
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

export default Students;
