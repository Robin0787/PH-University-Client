import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Flex,
  Modal,
  Pagination,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { BaseOptionType } from "antd/es/select";
import { Key, useState } from "react";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import GradientContainer from "../../../components/gradientContainer/gradientContainer";
import {
  useAssignFacultiesToCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { CourseManagementValidationSchemas } from "../../../schemas/CourseManagement.schema";
import handleAPIRequest from "../../../utils/handleAPIRequest";

export type TTableData = {
  key: string;
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
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
    title: <p className="tableHeading">Title</p>,
    dataIndex: "title",
  },
  {
    title: <p className="tableHeading">Prefix</p>,
    dataIndex: "prefix",
  },
  {
    title: <p className="tableHeading">Code</p>,
    dataIndex: "code",
    align: "center",
  },
  {
    title: <p className="tableHeading">Credits</p>,
    dataIndex: "credits",
    align: "center",
  },
  {
    title: <p className="tableHeading">Action</p>,
    render: (item) => <AssignFacultyModal course={item} />,
    align: "center",
    width: "1%",
  },
  {
    title: "",
    dataIndex: "",
  },
];

const Courses = () => {
  const [page, setPage] = useState<number>(1);
  const [params] = useState<TQueryParam[]>([]);
  const { data, isLoading } = useGetAllCoursesQuery([
    { name: "limit", value: 5 },
    { name: "page", value: page },
    ...params,
  ]);
  const metaData = data?.meta;
  const courses = data?.data;

  const tableData = courses?.map(({ _id, title, prefix, code, credits }) => ({
    key: _id as string,
    _id: _id as string,
    title,
    prefix,
    code,
    credits,
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
          <h1 className="heading">Courses</h1>
        </div>
        <Table
          columns={columns}
          dataSource={tableData}
          onChange={onChange}
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

const AssignFacultyModal = ({ course }: { course: TTableData }) => {
  const { data: facultyData, isLoading } = useGetAllFacultiesQuery(undefined);
  const faculties = facultyData?.data;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [assignFaculties] = useAssignFacultiesToCourseMutation();

  async function handleSubmit(data: FieldValues) {
    const toastId = toast.loading("Assigning faculties...");
    const payload = {
      courseId: course._id,
      data: data,
    };

    const res = await handleAPIRequest(assignFaculties, payload, toastId);
    if (res) {
      setIsModalOpen(false);
    }
  }

  function showModal() {
    setIsModalOpen(true);
  }

  function handleCancel() {
    setIsModalOpen(false);
  }

  const facultiesOptionsForSelect = faculties?.map((faculty) => ({
    value: faculty._id,
    label: faculty.fullName,
  }));

  return (
    <>
      <Button className="btn" onClick={showModal} disabled={isLoading}>
        Assign Faculties
      </Button>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Flex
          justify="center"
          align="center"
          style={{ paddingBlock: "10px 6px" }}
        >
          <h1 className="heading">Assign Faculties</h1>
        </Flex>
        <PHForm
          onSubmit={handleSubmit}
          resolver={zodResolver(
            CourseManagementValidationSchemas.assignFacultiesValidationSchema
          )}
        >
          <div>
            <PHSelect
              mode="multiple"
              options={facultiesOptionsForSelect as BaseOptionType[]}
              name="faculties"
              label="Faculties"
              placeholder="Select faculties"
            />
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
            Assign
          </button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
