import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getProduto = async () => {
  const response = await axios.get(`${base_url}produtos/`);
  return response.data;
};

const createProdutos = async (produto) => {
  const response = await axios.post(`${base_url}produtos/`, produto, config);

  return response.data;
};

const produtoService = {
  getProduto,
  createProdutos,
};

export default produtoService;
