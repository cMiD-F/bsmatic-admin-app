import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getCategoriaProdutos = async () => {
  const response = await axios.get(`${base_url}categoria/`);
  return response.data;
};

const createCategoria = async (categoria) => {
  const response = await axios.post(`${base_url}categoria/`, categoria, config);

  return response.data;
};

const pCategoriaService = {
    getCategoriaProdutos,
    createCategoria,
};

export default pCategoriaService;
