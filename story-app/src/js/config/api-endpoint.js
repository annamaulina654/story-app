import Config from "./config";

const ApiEndpoint = {
  REGISTER: `${Config.BASE_URL}/register`,
  LOGIN: `${Config.BASE_URL}/login`,

  GET_ALL_TRANSACTION: `${Config.BASE_URL}/stories`,
  GET_BY_ID_TRANSACTION: (id) => `${Config.BASE_URL}/stories/${id}`,
  STORE_TRANSACTION: `${Config.BASE_URL}/stories`,
  // UPDATE_TRANSACTION: (id) => `${Config.BASE_URL}/stories/${id}`,
  // DESTROY_TRANSACTION: (id) => `${Config.BASE_URL}/stories/${id}`,
};

export default ApiEndpoint;
