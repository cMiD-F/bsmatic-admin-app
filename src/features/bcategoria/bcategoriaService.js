import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}blogcategoria/`);

  return response.data;
};
const createBlogCategory = async (bcat) => {
  const response = await axios.post(`${base_url}blogcategoria/`, bcat, config);

  return response.data;
};
const updateBlogCategory = async (blogCat) => {
  const response = await axios.put(
    `${base_url}blogcategoria/${blogCat.id}`,
    { title: blogCat.blogCatData.title },
    config
  );

  return response.data;
};
const getBlogCategory = async (id) => {
  const response = await axios.get(`${base_url}blogcategoria/${id}`, config);

  return response.data;
};

const deleteBlogCategory = async (id) => {
  const response = await axios.delete(`${base_url}blogcategoria/${id}`, config);

  return response.data;
};
const bCategoryService = {
  getBlogCategories,
  createBlogCategory,
  deleteBlogCategory,
  getBlogCategory,
  updateBlogCategory,
};

export default bCategoryService;
