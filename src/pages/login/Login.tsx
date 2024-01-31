/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { TUserInfo } from "../../types/baseApi.types";
import style from "./login.module.css";

const Login = () => {
  const [login, { error }] = useLoginMutation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "robin123",
    },
  });
  function handleLogin(data: any) {
    if (!data.id) {
      toast.error("id is required!");
      return;
    } else if (!data.password) {
      toast.error("password is required!");
      return;
    }
    const loginData: TUserInfo = {
      id: data.id,
      password: data.password,
    };
    login(loginData).then((res: any) => {
      const token = res?.data?.data?.accessToken;
      localStorage.setItem("accessToken", token);
      if (token) {
        toast.success("Login Successful.");
        navigate("/");
      }
    });
  }
  if (error) {
    console.log(error);
    toast.error(error?.data?.message || "Something went wrong!");
  }
  return (
    <section className={style.mainContainer}>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className={style.container}>
          <div>
            <label htmlFor="id">ID</label>
            <span>:</span>
            <input type="text" id="id" {...register("id")} />
          </div>
          <div>
            <label htmlFor="Password">Password</label>
            <span>:</span>
            <input type="password" id="password" {...register("password")} />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
