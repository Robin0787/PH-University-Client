import { Button, Flex, Table, TableColumnsType, TableProps } from "antd";
import GradientContainer from "../../../../components/gradientContainer/gradientContainer";
import { useGetAllDepartmentQuery } from "../../../../redux/features/admin/academicManagement.api";

export type TTableData = {
  key: string;
  _id: string;
  name: string;
  faculty: string;
};

const columns: TableColumnsType<TTableData> = [
  {
    title: "",
    dataIndex: "",
  },
  {
    title: <p className="tableHeading">Department Name</p>,
    dataIndex: "name",
  },
  {
    title: <p className="tableHeading">Faculty Name</p>,
    dataIndex: "faculty",
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
  },
];

const AcademicDepartments = () => {
  const { data, isLoading } = useGetAllDepartmentQuery(undefined);
  const academicDepartments = data?.data;

  const tableData = academicDepartments?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      _id,
      name,
      faculty: academicFaculty?.name,
    })
  );

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      console.log(filters);
    }
  };

  return (
    <GradientContainer>
      <div style={{ padding: "20px 0" }}>
        <div style={{ paddingBlock: "10px 20px" }}>
          <h1 className="heading">Academic Departments</h1>
        </div>
        <Table
          columns={columns}
          dataSource={tableData}
          onChange={onChange}
          loading={isLoading}
          style={{ minHeight: "400px" }}
        />
      </div>
    </GradientContainer>
  );
};

export default AcademicDepartments;
