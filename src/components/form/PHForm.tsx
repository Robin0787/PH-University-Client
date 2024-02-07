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
}

const PHForm = ({ onSubmit, children }: TPHFormProps) => {
  const methods = useForm({
    defaultValues: {
      id: "A-0001",
      password: "robin123",
      name: "Robin",
      email: "mohammadrobin636@gmail.com",
    },
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        style={{ width: "100%", height: "100%" }}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default PHForm;
