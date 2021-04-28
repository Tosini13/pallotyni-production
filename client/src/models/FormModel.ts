import { useForm } from "react-hook-form";

export const FormModel = <T>() => {
  const { register, handleSubmit, reset } = useForm<T>();
  type TRegister = typeof register;
};
