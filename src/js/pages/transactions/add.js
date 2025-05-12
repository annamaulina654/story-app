import CheckUserAuth from "../auth/check-user-auth";
import Transactions from "../../network/transactions";
import Swal from "sweetalert2";

const Add = {
  async init() {
    CheckUserAuth.checkLoginState();
    this._initialListener();
  },

  _initialListener() {
    const addFormRecord = document.querySelector("#addRecordForm");
    addFormRecord.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        addFormRecord.classList.add("was-validated");
        this._sendPost();
      },
      false,
    );
  },

  async _sendPost() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log("formData");
      console.log(formData);

      try {
        // eslint-disable-next-line no-unused-vars
        const response = await Transactions.store(formData);
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "New story added successfully.",
        });
        this._goToDashboardPage();
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Something went wrong while adding the story.",
        });
      }
    }
  },

  _getFormData() {
    const descriptionInput = document.querySelector(
      "#validationCustomDescription",
    );
    const photoInput = document.querySelector("#validationCustomPhoto");

    return {
      description: descriptionInput.value,
      photo: photoInput.files[0],
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter(
      (item) => item === "",
    );

    if (formData.photo && formData.photo.size > 5000000) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "File size exceeds the limit of 5MB",
      });
      return false;
    }

    return formDataFiltered.length === 0;
  },

  _goToDashboardPage() {
    window.location.href = "/";
  },
};

export default Add;
