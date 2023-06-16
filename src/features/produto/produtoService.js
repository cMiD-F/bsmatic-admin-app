import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getProdutos = async () => {
  const response = await axios.get(`${base_url}produto/`);
  return response.data;
};

const createProduto = async (produto) => {
  const response = await axios.post(`${base_url}produto/`, produto, config);
  return response.data;
};

const produtoService = {
  getProdutos,
  createProduto,
};

export default produtoService;
