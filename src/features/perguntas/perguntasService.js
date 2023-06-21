import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getPerguntas = async () => {
  const response = await axios.get(`${base_url}pergunta/`);
  return response.data;
};

const deletePerguntas = async (id) => {
  const response = await axios.delete(`${base_url}pergunta/${id}`, config);
  return response.data;
};

const getPergunta = async (id) => {
  const response = await axios.get(`${base_url}pergunta/${id}`);
  return response.data;
};

const udpatePerguntas = async (enq) => {
  const response = await axios.put(
    `${base_url}pergunta/${enq.id}`,
    { status: enq.pergData },
    config
  );
  return response.data;
};

const perguntaService = {
    getPerguntas,
    deletePerguntas,
    getPergunta,
    udpatePerguntas,
};

export default perguntaService;
