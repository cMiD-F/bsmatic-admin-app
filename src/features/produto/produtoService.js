import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}produtos/`);

  return response.data;
};
const createProduct = async (produto) => {
  const response = await axios.post(`${base_url}produtos/`, produto, config);
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
};

export default productService;
