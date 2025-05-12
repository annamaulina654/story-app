import Auth from "../../network/auth";
import Config from "../../config/config";
import Utils from "../../utils/utils";
import CheckUserAuth from "./check-user-auth";
import Swal from "sweetalert2";

const Login = {
  async init() {
    CheckUserAuth.checkLoginState();

    this._initialListener();
  },

  _initialListener() {
    const loginForm = document.querySelector("#loginForm");
    loginForm.addEventListener(
      "submit",
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        loginForm.classList.add("was-validated");
        await this._getLogged();
      },
      false,
    );
  },

  async _getLogged() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log("formData");
      console.log(formData);

      try {
        const response = await Auth.login({
          email: formData.email,
          password: formData.password,
        });
        Utils.setUserToken(
          Config.USER_TOKEN_KEY,
          response.data.loginResult.token,
        );
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this._goToDashboardPage();
        });
      } catch (error) {
        console.error(error);
        const message =
          error?.response?.data?.message ||
          "Login gagal. Periksa email dan password Anda.";
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text:
            message || "Login failed. Please check your email and password.",
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill in all fields.",
      });
    }
  },

  _getFormData() {
    const email = document.querySelector("#validationCustomRecordEmail");
    const password = document.querySelector("#validationCustomPassword");

    return {
      email: email.value,
      password: password.value,
    };
  },

  _validateFormData(formData) {
    const isAllFilled = Object.values(formData).every((item) => item !== "");
    const isPasswordValid = formData.password.length >= 8;

    if (!isAllFilled) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill in all fields.",
      });
      return false;
    }

    if (!isPasswordValid) {
      Swal.fire({
        icon: "error",
        title: "Password Too Short",
        text: "Password must be at least 8 characters long.",
      });
      return false;
    }

    return true;
  },

  _goToDashboardPage() {
    window.location.href = "/";
  },
};

export default Login;
