import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getAplicacoes= async () => {
  const response = await axios.get(`${base_url}aplicacao/`);
  return response.data;
};

const createAplicacao = async (aplicacao) => {
  const response = await axios.post(`${base_url}aplicacao/`, aplicacao, config);

  return response.data;
};



const getAplicacao = async (id) => {
  const response = await axios.get(`${base_url}aplicacao/${id}`, config);

  return response.data;
};

const deleteAplicacao = async (id) => {
  const response = await axios.delete(`${base_url}aplicacao/${id}`, config);

  return response.data;
};

const updateAplicacao = async (aplicacao) => {
  console.log(aplicacao);
  const response = await axios.put(
    `${base_url}aplicacao/${aplicacao.id}`,
    { title: aplicacao.aplicacaoData.title },
    config
  );
  
  return response.data;
};

const aplicacaoService = {
    getAplicacoes,
    createAplicacao,
    updateAplicacao,
    getAplicacao,
    deleteAplicacao,
};

export default aplicacaoService;