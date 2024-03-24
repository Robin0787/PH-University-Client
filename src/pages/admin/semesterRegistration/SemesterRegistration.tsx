import { zodResolver } from "@hookform/resolvers/zod";
import { Col, Flex, Row } from "antd";
import { BaseOptionType } from "antd/es/select";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../components/form/FormInput";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import GradientContainer from "../../../components/gradientContainer/gradientContainer";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import { useCreateSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";
import { semesterRegistrationCreateValidationSchema } from "../../../schemas/semesterRegistration.schema";
import handleAPIRequest from "../../../utils/handleAPIRequest";
import { semesterStatusOptions } from "./semesterRegistration.utils";

const SemesterRegistration = () => {
  const [createSemesterRegistration] = useCreateSemesterRegistrationMutation();
  const navigate = useNavigate();
  const { data: academicSemesters } = useGetAllSemesterQuery(undefined);
  const semesterNamesForSelect = academicSemesters?.data?.map((semester) => ({
    value: semester._id,
    label: `${semester.name} - ${semester.year} (${semester.startMonth}-${semester.endMonth})`,
  }));

  const handleSemesterRegistration = async (data: any) => {
    const toastId = toast.loading("Creating semester registration...");
    // converting string values into number
    data.minCredit = +data.minCredit;
    data.maxCredit = +data.maxCredit;

    handleAPIRequest(
      createSemesterRegistration,
      data,
      toastId,
      navigate,
      "/admin/registered-semesters"
    );
  };

  return (
    <div className="responsive-width80">
      <Flex justify="center" align="center" flex={"col"}>
        <Col span={24}>
          <PHForm
            onSubmit={handleSemesterRegistration}
            resolver={zodResolver(semesterRegistrationCreateValidationSchema)}
          >
            <GradientContainer>
              <div className="form">
                <div className="heading">Register Semester</div>
                <div>
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }}>
                      <PHSelect
                        label="Academic Semester"
                        name="academicSemester"
                        placeholder="Select Academic Semester"
                        options={semesterNamesForSelect as BaseOptionType[]}
                      />
                    </Col>
                    <Col span={24} md={{ span: 12 }}>
                      <PHSelect
                        name="status"
                        label="Status"
                        options={semesterStatusOptions}
                        placeholder="Select Semester Status"
                      />
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }}>
                      <PHDatePicker name="startDate" label="Start Date" />
                    </Col>
                    <Col span={24} md={{ span: 12 }}>
                      <PHDatePicker name="endDate" label="End Date" />
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={24} md={{ span: 12 }}>
                      <FormInput
                        type="number"
                        name="minCredit"
                        label="Min Credit"
                      />
                    </Col>
                    <Col span={24} md={{ span: 12 }}>
                      <FormInput
                        type="number"
                        name="maxCredit"
                        label="Max Credit"
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

export default SemesterRegistration;
