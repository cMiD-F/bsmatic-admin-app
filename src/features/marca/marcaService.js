import axios from "axios";
import { base_url } from "../../utils/base_url";

const getMarcas = async () => {
  const response = await axios.get(`${base_url}marca/`);
  return response.data;
};

const marcaService = {
  getMarcas,
};

export default marcaService;
