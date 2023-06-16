import axios from "axios";
import {base_url} from "../../utils/base_url";

const getUsuarios = async () => {
    const response = await axios.get(`${base_url}user/todos-usuarios`);
    return response.data;
};

const usuarioService = {
    getUsuarios,
};

export default usuarioService;