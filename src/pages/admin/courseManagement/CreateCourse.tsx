import { zodResolver } from "@hookform/resolvers/zod";
import { Col, Flex, Row } from "antd";
import { BaseOptionType } from "antd/es/select";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../components/form/FormInput";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import GradientContainer from "../../../components/gradientContainer/gradientContainer";
import {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { CourseManagementValidationSchemas } from "../../../schemas/CourseManagement.schema";
import { TCourse } from "../../../types/courseManagement.types";
import handleAPIRequest from "../../../utils/handleAPIRequest";

const CreateCourse = () => {
  const [createCourse] = useCreateCourseMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);
  const coursesForSelect = courses?.data?.map((course: TCourse) => ({
    value: course._id as string,
    label: course.title,
  }));
  const navigate = useNavigate();

  const handleCreateCourse = async (data: FieldValues) => {
    const toastId = toast.loading("Creating course...");
    if (data.preRequisiteCourses) {
      data.preRequisiteCourses = data.preRequisiteCourses.map(
        (item: string) => ({
          course: item,
          isDeleted: false,
        })
      );
    }
    data.code = Number(data.code);
    data.credits = Number(data.credits);

    const payload = {
      course: data,
    };

    handleAPIRequest(
      createCourse,
      payload,
      toastId,
      navigate,
      "/admin/courses"
    );
  };
  return (
    <div className="responsive-width80">
      <Flex justify="center" align="center" flex={"col"}>
        <Col span={24}>
          <PHForm
            onSubmit={handleCreateCourse}
            resolver={zodResolver(
              CourseManagementValidationSchemas.courseCreateValidationSchema
            )}
          >
            <GradientContainer>
              <div
                style={{ padding: "20px", width: "100%" }}
                className="container"
              >
                <h3 className="heading">Create Course</h3>
                <div className="phForm">
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }}>
                      <FormInput type="text" name="title" label="Title" />
                    </Col>
                    <Col span={24} md={{ span: 12 }}>
                      <FormInput type="text" name="prefix" label="Prefix" />
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }}>
                      <FormInput type="number" name="code" label="Code" />
                    </Col>
                    <Col span={24} md={{ span: 12 }}>
                      <FormInput type="number" name="credits" label="Credits" />
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }}>
                      <PHSelect
                        mode="multiple"
                        options={coursesForSelect as BaseOptionType[]}
                        name="preRequisiteCourses"
                        label="Pre Requisite Courses"
                        placeholder="Select preRequisiteCourses"
                      />
                    </Col>
                  </Row>
                  <div>
                    <button type="submit" className="submitBtn">
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </GradientContainer>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateCourse;
