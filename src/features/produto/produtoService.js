import axios from "axios";
import {base_url} from "../../utils/base_url";

const getProduto = async () => {
    const response = await axios.get(`${base_url}produtos/`);
    return response.data;
};

const produtoService = {
  getProduto,
};

export default produtoService;