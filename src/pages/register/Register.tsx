/* eslint-disable @typescript-eslint/no-explicit-any */
import FormInput from "../../components/form/FormInput";
import PHForm from "../../components/form/PHForm";
import GradientContainer from "../../components/gradientContainer/gradientContainer";

const Register = () => {
  function handleRegister(data: any) {
    console.log(data);
  }

  return (
    <section className="main">
      <PHForm onSubmit={handleRegister}>
        <GradientContainer>
          <div className="form">
            <div className="heading">Register</div>
            <div>
              <FormInput name="name" type="text" label="Name" />
              <FormInput name="email" type="email" label="Email" />
              <div>
                <button type="submit" className="submitBtn">
                  Register
                </button>
              </div>
            </div>
          </div>
        </GradientContainer>
      </PHForm>
    </section>
  );
};

export default Register;
