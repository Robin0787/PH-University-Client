import { ReactNode } from "react";
import { useForm } from "react-hook-form";

const PHForm = ({
  onSubmit,
  children,
}: {
  onSubmit: (data: any) => void;
  children: ReactNode;
}) => {
  const { handleSubmit } = useForm();
  return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
};

export default PHForm;
