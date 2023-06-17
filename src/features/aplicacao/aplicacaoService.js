import axios from "axios";
import { base_url } from "../../utils/base_url";

const getAplicacao = async () => {
  const response = await axios.get(`${base_url}aplicacao/`);
  return response.data;
};

const aplicacaoService = {
    getAplicacao,
};

export default aplicacaoService;
