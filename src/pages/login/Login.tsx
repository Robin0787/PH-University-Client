/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/form/FormInput";
import PHForm from "../../components/form/PHForm";
import GradientContainer from "../../components/gradientContainer/gradientContainer";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { TUser } from "../../types/authSlice";
import { TUserInfo } from "../../types/baseApi.types";
import verifyToken from "../../utils/verifyToken";
import styles from "./login.module.css";

interface TDefaultValues {
  id: string;
  password: string;
}

const defaultValues: TDefaultValues = {
  id: "A-0001",
  password: "robin123",
};

const Login = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function handleLogin(data: any) {
    if (!data.id) {
      toast.error("id is required!");
      return;
    } else if (!data.password) {
      toast.error("password is required!");
      return;
    }
    const toastId: string = toast.loading("User is logging...");
    const loginData: TUserInfo = {
      id: data.id,
      password: data.password,
    };

    try {
      const res = await login(loginData).unwrap();
      const token = res?.data?.accessToken;
      if (token) {
        const user: TUser = verifyToken<TUser>(token);
        dispatch(setUser({ user, token: token }));
        // ------------------------ //
        navigate(`/${user?.role}/dashboard`);
        toast.success(res?.message, { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!", {
        id: toastId,
      });
    }
  }

  return (
    <section className={styles.main}>
      <PHForm onSubmit={handleLogin} defaultValues={defaultValues}>
        <GradientContainer>
          <div className={styles.form}>
            <div className={styles.heading}>Login</div>
            <div className={styles.container}>
              <div>
                <label htmlFor="id">ID</label>
                <span>:</span>
                <FormInput type="text" name="id" />
              </div>
              <div>
                <label htmlFor="Password">Password</label>
                <span>:</span>
                <FormInput type="text" name="password" />
              </div>
              <div>
                <button type="submit">Login</button>
              </div>
            </div>
          </div>
        </GradientContainer>
      </PHForm>
    </section>
  );
};

export default Login;
