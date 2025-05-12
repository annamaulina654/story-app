import Auth from "../../network/auth";
import CheckUserAuth from "./check-user-auth";
import Swal from "sweetalert2";

const Register = {
  async init() {
    CheckUserAuth.checkLoginState();

    this._initialListener();
  },

  _initialListener() {
    const registerForm = document.querySelector("#registerForm");
    registerForm.addEventListener(
      "submit",
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        registerForm.classList.add("was-validated");
        await this._getRegistered();
      },
      false,
    );
  },

  async _getRegistered() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log("formData");
      console.log(formData);

      try {
        // eslint-disable-next-line no-unused-vars
        const response = await Auth.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "Please login using your account.",
        }).then(() => {
          this._goToLoginPage();
        });
      } catch (error) {
        console.error(error);
        const message =
          error?.response?.data?.message ||
          "Registrasi gagal. Email mungkin sudah terdaftar.";
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text:
            message ||
            "Registration failed. The email might already be registered.",
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
    const name = document.querySelector("#validationCustomRecordName");
    const email = document.querySelector("#validationCustomEmail");
    const password = document.querySelector("#validationCustomPassword");

    return {
      name: name.value,
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

  _goToLoginPage() {
    window.location.href = "/auth/login.html";
  },
};

export default Register;
