import {
  Button,
  Dropdown,
  Flex,
  Pagination,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import moment from "moment";
import { Key, useState } from "react";
import GradientContainer from "../../../components/gradientContainer/gradientContainer";
import {
  useGetAllRegisteredSemesterQuery,
  useUpdateRegisteredSemesterStatusMutation,
} from "../../../redux/features/admin/courseManagement.api";
import handleAPIRequest from "../../../utils/handleAPIRequest";

const statusOptions = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

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

const RegisteredSemesters = () => {
  const [updateRegisteredSemesterStatus] =
    useUpdateRegisteredSemesterStatusMutation();
  const [semesterId, setSemesterId] = useState<string>("");
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
      academicSemester: `${academicSemester?.name}-${academicSemester?.year} (${academicSemester?.startMonth}-${academicSemester?.endMonth})`,
      status,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
      minCredit,
      maxCredit,
    })
  );

  const handleStatusUpdate = (data: any) => {
    const updatedData = {
      _id: semesterId,
      data: { status: data.key },
    };
    handleAPIRequest(updateRegisteredSemesterStatus, updatedData);
  };

  const menuProps = {
    items: statusOptions,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: <p className="tableHeading">Academic Semester</p>,
      dataIndex: "academicSemester",
    },
    {
      title: <p className="tableHeading">Status</p>,
      dataIndex: "status",
      render: (item) => {
        let color: string = "red";
        if (item === "ONGOING") {
          color = "green";
        } else if (item === "UPCOMING") {
          color = "blue";
        }
        return (
          <Tag color={color} style={{ width: "100%", textAlign: "center" }}>
            {item}
          </Tag>
        );
      },
      width: "1%",
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
      render: (item) => (
        <Dropdown menu={menuProps} trigger={["click"]}>
          <Button
            onClick={() => {
              setSemesterId(item._id);
            }}
          >
            Update
          </Button>
        </Dropdown>
      ),
      align: "center",
      width: "1%",
    },
  ];

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

export default RegisteredSemesters;
