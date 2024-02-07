/* eslint-disable @typescript-eslint/no-explicit-any */
import FormInput from "../../components/form/FormInput";
import PHForm from "../../components/form/PHForm";
import GradientContainer from "../../components/gradientContainer/gradientContainer";
import styles from "./register.module.css";

const Register = () => {
  function handleRegister(data: any) {
    console.log(data);
  }

  return (
    <div className={styles.main}>
      <PHForm onSubmit={handleRegister}>
        <GradientContainer>
          <div className={styles.form}>
            <div className={styles.container}>
              <div>
                <label htmlFor="id">Name</label>
                <span>:</span>
                <FormInput name="name" type="text" placeholder="Your Name" />
              </div>
              <div>
                <label htmlFor="Email">Email</label>
                <span>:</span>
                <FormInput name="email" type="email" placeholder="Your Email" />
              </div>
              <div>
                <button type="submit">Register</button>
              </div>
            </div>
          </div>
        </GradientContainer>
      </PHForm>
    </div>
  );
};

export default Register;
