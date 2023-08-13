import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getMarcas = async () => {
  const response = await axios.get(`${base_url}marca/`);

  return response.data;
};

const createMarca = async (marca) => {
  const response = await axios.post(`${base_url}marca/`, marca, config);

  return response.data;
};

const updateMarca = async (marca) => {
  const response = await axios.put(
    `${base_url}marca/${marca.id}`,
    { title: marca.marcaData.title },
    config
  );

  return response.data;
};
const getMarca = async (id) => {
  const response = await axios.get(`${base_url}marca/${id}`, config);

  return response.data;
};

const deleteMarca = async (id) => {
  const response = await axios.delete(`${base_url}marca/${id}`, config);

  return response.data;
};

const marcaService = {
  getMarcas,
  createMarca,
  getMarca,
  updateMarca,
  deleteMarca,
};

export default marcaService;
