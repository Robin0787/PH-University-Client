/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { TUserInfo } from "../../types/baseApi.types";
import verifyToken from "../../utils/verifyToken";
import style from "./login.module.css";

const Login = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "robin123",
    },
  });
  async function handleLogin(data: any) {
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

    try {
      const res = await login(loginData).unwrap();
      const token = res?.data?.accessToken;
      if (token) {
        const user = verifyToken(token);
        dispatch(setUser({ user, token: token }));

        // ------------------------ //
        toast.success(res?.message);
        navigate("/");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
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