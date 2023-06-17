import axios from "axios";
import { base_url } from "../../utils/base_url";

const getPerguntas = async () => {
  const response = await axios.get(`${base_url}pergunta/`);
  return response.data;
};

const perguntaService = {
    getPerguntas,
};

export default perguntaService;
