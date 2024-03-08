import { Button, Flex, Table, TableColumnsType, TableProps } from "antd";
import { Key } from "react";
import GradientContainer from "../../../../components/gradientContainer/gradientContainer";
import { useGetAllFacultyQuery } from "../../../../redux/features/admin/academicManagement.api";

export type TTableData = {
  key: string;
  _id: string;
  name: string;
};

export type TQueryParam = {
  name: string;
  value: boolean | Key;
};

const columns: TableColumnsType<TTableData> = [
  {
    title: "",
    dataIndex: "",
  },
  {
    title: <p className="tableHeading">Name</p>,
    dataIndex: "name",
  },
  {
    title: "",
    dataIndex: "",
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

const AcademicFaculty = () => {
  const { data, isLoading } = useGetAllFacultyQuery(undefined);
  const academicFaculties = data?.data;

  const tableData = academicFaculties?.map(({ _id, name }) => ({
    key: _id,
    _id,
    name,
  }));

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
          <h1 className="heading">Academic Faculties</h1>
        </div>
        <Table
          columns={columns}
          dataSource={tableData}
          onChange={onChange}
          loading={isLoading}
        />
      </div>
    </GradientContainer>
  );
};

export default AcademicFaculty;
