/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import PHForm from "../../components/form/PHForm";
import GradientContainer from "../../components/gradientContainer/gradientContainer";
import styles from "./register.module.css";

const Register = () => {
  const { register } = useForm();

  function handleRegister(data: any) {
    console.log(data);
  }

  return (
    <PHForm onSubmit={handleRegister}>
      <div className={styles.main}>
        <GradientContainer>
          <div className={styles.form}>
            <div className={styles.container}>
              <div>
                <label htmlFor="id">Name</label>
                <span>:</span>
                <input
                  type="text"
                  id="id"
                  placeholder="Your Name"
                  {...register("name")}
                />
              </div>
              <div>
                <label htmlFor="Email">Email</label>
                <span>:</span>
                <input
                  type="email"
                  id="Email"
                  placeholder="Your Email"
                  {...register("email")}
                />
              </div>
              <div>
                <button type="submit">Register</button>
              </div>
            </div>
          </div>
        </GradientContainer>
      </div>
    </PHForm>
  );
};

export default Register;
