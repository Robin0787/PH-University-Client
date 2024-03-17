import { Button, Flex, Pagination, Table, TableColumnsType } from "antd";
import { Key, useState } from "react";
import GradientContainer from "../../../components/gradientContainer/gradientContainer";
import { useGetAllRegisteredSemesterQuery } from "../../../redux/features/admin/courseManagement.api";

export type TTableData = {
  key: string;
  _id: string;
  academicSemester: string;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
};

export type TQueryParam = {
  name: string;
  value: boolean | Key;
};

const columns: TableColumnsType<TTableData> = [
  {
    title: <p className="tableHeading">Academic Semester</p>,
    dataIndex: "academicSemester",
  },
  {
    title: <p className="tableHeading">Status</p>,
    dataIndex: "status",
  },
  {
    title: <p className="tableHeading">Start Date</p>,
    dataIndex: "startDate",
  },
  {
    title: <p className="tableHeading">End Date</p>,
    dataIndex: "endDate",
  },
  {
    title: <p className="tableHeading">Min Credit</p>,
    dataIndex: "minCredit",
    align: "center",
  },
  {
    title: <p className="tableHeading">Max Credit</p>,
    dataIndex: "maxCredit",
    align: "center",
  },
  {
    title: <p className="tableHeading">Action</p>,
    render: () => (
      <Flex justify="center" align="center" gap={20}>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </Flex>
    ),
    align: "center",
    width: "1%",
  },
];

const RegisteredSemesters = () => {
  const [page, setPage] = useState<number>(1);
  const [params] = useState<TQueryParam[]>([]);
  const { data, isLoading } = useGetAllRegisteredSemesterQuery([
    { name: "limit", value: 5 },
    { name: "page", value: page },
    ...params,
  ]);
  const registeredSemesters = data?.data;
  const metaData = data?.meta;

  const tableData = registeredSemesters?.map(
    ({
      _id,
      academicSemester,
      status,
      startDate,
      endDate,
      minCredit,
      maxCredit,
    }) => ({
      key: _id,
      _id,
      academicSemester: academicSemester?.name,
      status,
      startDate,
      endDate,
      minCredit,
      maxCredit,
    })
  );

  return (
    <GradientContainer>
      <div style={{ padding: "20px 0" }}>
        <div style={{ paddingBlock: "10px 20px" }}>
          <h1 className="heading">Registered Semesters</h1>
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

export default RegisteredSemesters;
