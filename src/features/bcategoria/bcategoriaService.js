import axios from "axios";
import { base_url } from "../../utils/base_url";

const getCategoriaBlog = async () => {
  const response = await axios.get(`${base_url}blogcategoria`);
  return response.data;
};

const bCategoriaService = {
    getCategoriaBlog,
};

export default bCategoriaService;
