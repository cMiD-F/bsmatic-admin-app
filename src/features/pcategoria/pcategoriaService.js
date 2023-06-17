import axios from "axios";
import { base_url } from "../../utils/base_url";

const getCategoriaProdutos = async () => {
  const response = await axios.get(`${base_url}categoria`);
  return response.data;
};

const pCategoriaService = {
    getCategoriaProdutos,
};

export default pCategoriaService;
