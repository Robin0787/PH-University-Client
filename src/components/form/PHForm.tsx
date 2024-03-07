import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

interface TPHFormProps {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  defaultValues?: object;
  resolver?: any;
}

interface TFormConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

const PHForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TPHFormProps) => {
  const formConfig: TFormConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <Form
        onFinish={methods.handleSubmit(onSubmit)}
        style={{ width: "100%", height: "100%" }}
      >
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHForm;
