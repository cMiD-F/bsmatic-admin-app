import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getCupons = async () => {
  const response = await axios.get(`${base_url}cupom/`, config);

  return response.data;
};

const createCupons = async (cupom) => {
  const response = await axios.post(`${base_url}cupom/`, cupom, config);

  return response.data;
};
const updateCupom = async (cupom) => {
  const response = await axios.put(
    `${base_url}cupom/${cupom.id}`,
    {
      nome: cupom.cupomData.name,
      expiracao: cupom.cuponData.expiry,
      desconto: cupom.couponData.discount,
    },
    config
  );

  return response.data;
};
const getCupom = async (id) => {
  const response = await axios.get(`${base_url}cupom/${id}`, config);

  return response.data;
};

const deleteCupom = async (id) => {
  const response = await axios.delete(`${base_url}cupom/${id}`, config);

  return response.data;
};
const cupomService = {
  getCupons,
  createCupons,
  deleteCupom,
  getCupom,
  updateCupom,
};

export default cupomService;
