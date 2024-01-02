import { Button, Input, Textarea } from "@mantine/core";
import React from "react";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";

const validationSchema = yup.object().shape({
  name: yup.string().required().min(10).label("Name"),
  description: yup.string().nullable().optional().label("Description"),
});

type IFormPayload = yup.InferType<typeof validationSchema>;

interface Prop {
  onSubmit: (data: IFormPayload) => void;
  loading?: boolean;
}
const ProjectForm: React.FC<Prop> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormPayload>({
    resolver: yupResolver(validationSchema),
    defaultValues: {},
  });

  const handleOnSubmit: SubmitHandler<IFormPayload> = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="flex flex-col gap-4"
    >
      <Input.Wrapper
        label="Name"
        error={<ErrorMessage name={"name"} errors={errors} />}
      >
        <Input {...register("name")} />
      </Input.Wrapper>

      <Input.Wrapper
        label="Description"
        error={<ErrorMessage name={"description"} errors={errors} />}
      >
        <Textarea {...register("description")} />
      </Input.Wrapper>

      <Input.Wrapper>
        <Button type="submit" loading={loading}>
          Save
        </Button>
      </Input.Wrapper>
    </form>
  );
};

export default ProjectForm;
