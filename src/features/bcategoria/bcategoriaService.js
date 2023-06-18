import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getCategoriaBlog = async () => {
  const response = await axios.get(`${base_url}blogcategoria`);
  return response.data;
};

const createBlogCategoria = async (bcat) => {
  const response = await axios.post(`${base_url}blogcategoria`, bcat, config);

  return response.data;
};

const updateBlogCategoria = async (blogCat) => {
  const response = await axios.put(
    `${base_url}blogcategoria/${blogCat.id}`,
    { title: blogCat.blogCatData.title },
    config
  );

  return response.data;
};
const getBlogCategoria = async (id) => {
  const response = await axios.get(`${base_url}blogcategoria/${id}`, config);

  return response.data;
};

const deleteBlogCategoria = async (id) => {
  const response = await axios.delete(`${base_url}blogcategoria/${id}`, config);

  return response.data;
};
const bCategoriaService = {
  getCategoriaBlog,
  createBlogCategoria,
  deleteBlogCategoria,
  getBlogCategoria,
  updateBlogCategoria,
};


export default bCategoriaService;
