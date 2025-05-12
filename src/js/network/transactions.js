// import axios from 'axios';
import axiosInstance from "../config/axios-instance";
// import Config from '../config/config';
// import Utils from '../utils/utils';
import ApiEndpoint from "../config/api-endpoint";
import "../components/SpinnersLoad";

const Transactions = {
  async getAll() {
    return await axiosInstance.get(ApiEndpoint.GET_ALL_TRANSACTION);
  },

  async getById(id) {
    return await axiosInstance.get(ApiEndpoint.GET_BY_ID_TRANSACTION(id));
  },

  async store({ description, photo }) {
    const loadingSpinner = document.createElement("spinners-load");
    document.body.appendChild(loadingSpinner);

    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);

    return await axiosInstance.post(ApiEndpoint.STORE_TRANSACTION, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default Transactions;
