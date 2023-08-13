import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getCategoriaProdutos = async () => {
  const response = await axios.get(`${base_url}categoria/`);
  return response.data;
};

const createCategoria = async (categoria) => {
  const response = await axios.post(`${base_url}categoria/`, categoria, config);
  return response.data;
};

const getCategoriaProduto = async (id) => {
  const response = await axios.get(`${base_url}categoria/${id}`, config);
  return response.data;
};

const deleteCategoriaProduto = async (id) => {
  const response = await axios.delete(`${base_url}categoria/${id}`, config);
  return response.data;
};

const updateCategoriaProduto = async (categoria) => {
  console.log(categoria);
  const response = await axios.put(
    `${base_url}categoria/${categoria.id}`,
    { title: categoria.pCatData.title },
    config
  );
  return response.data;
};

const pCategoriaService = {
  getCategoriaProdutos,
  createCategoria,
  getCategoriaProduto,
  deleteCategoriaProduto,
  updateCategoriaProduto,
};

export default pCategoriaService;
