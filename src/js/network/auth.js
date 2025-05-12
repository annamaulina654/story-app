// import axios from 'axios';
import axiosInstance from "../config/axios-instance";
import ApiEndpoint from "../config/api-endpoint";

const Auth = {
  async register({ name, email, password }) {
    return await axiosInstance.post(ApiEndpoint.REGISTER, {
      name,
      email,
      password,
    });
  },

  async login({ email, password }) {
    return await axiosInstance.post(ApiEndpoint.LOGIN, { email, password });
  },
};

export default Auth;
