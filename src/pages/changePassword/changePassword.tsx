import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/form/FormInput";
import PHForm from "../../components/form/PHForm";
import GradientContainer from "../../components/gradientContainer/gradientContainer";
import { useChangePasswordMutation } from "../../redux/features/admin/userManagement.api";
import { logOut } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import handleAPIRequest from "../../utils/handleAPIRequest";

const ChangePassword = () => {
  const [changeUserPassword] = useChangePasswordMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChangePassword = async (data: FieldValues) => {
    const toastId = toast.loading("Password is changing...");
    const res = await handleAPIRequest(changeUserPassword, data, toastId);
    if (res) {
      dispatch(logOut());
      navigate("/login");
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <section className="main">
      <PHForm onSubmit={handleChangePassword}>
        <GradientContainer>
          <div className="form">
            <div className="heading">Change Your Password</div>
            <div>
              <FormInput
                type="text"
                name="currentPassword"
                label="Current Password"
              />
              <FormInput type="text" name="newPassword" label="New Password" />
              <div>
                <button type="submit" className="submitBtn">
                  Login
                </button>
              </div>
            </div>
          </div>
        </GradientContainer>
      </PHForm>
    </section>
  );
};

export default ChangePassword;
