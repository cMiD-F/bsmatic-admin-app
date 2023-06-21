import axios from "axios";
import { base_url } from "../../utils/base_url";

const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage.token}`,
    Accept: "application/json",
  }
};

const login = async (user) => {
  const response = await axios.post(`${base_url}user/login-admin`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getPedidos = async () => {
  const response = await axios.get(`${base_url}user/obtem-todos-pedidos`, config);
  return response.data;
};

const getPedido = async (id) => {
  const response = await axios.post(
    `${base_url}user/obtempedidoporusuario/${id}`,
    "",
    config
  );

  return response.data;
};

const authService = {
  login,
  getPedidos,
  getPedido,
};

export default authService;
