import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getAplicacao = async () => {
  const response = await axios.get(`${base_url}aplicacao/`);
  return response.data;
};

const createAplicacao = async (aplicacao) => {
  const response = await axios.post(`${base_url}aplicacao/`, aplicacao, config);

  return response.data;
};

const aplicacaoService = {
    getAplicacao,
    createAplicacao
};

export default aplicacaoService;
