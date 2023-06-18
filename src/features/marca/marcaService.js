import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getMarcas = async () => {
  const response = await axios.get(`${base_url}marca/`);
  return response.data;
};

const createMarca = async (marca) => {
  const response = await axios.post(`${base_url}marca/`, marca, config);

  return response.data;
};

const marcaService = {
  getMarcas,
  createMarca
};

export default marcaService;
