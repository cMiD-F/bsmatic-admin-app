import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getApplications = async () => {
  const response = await axios.get(`${base_url}application/`);
  return response.data;
};

const createApplication = async (application) => {
  const response = await axios.post(
    `${base_url}application/`,
    application,
    config
  );
  return response.data;
};

const updateApplication = async (application) => {
  const response = await axios.put(
    `${base_url}application/${application.id}`,
    { title: application.applicationData.title },
    config
  );
  return response.data;
};

const getApplication = async (id) => {
  const response = await axios.get(`${base_url}application/${id}`, config);
  return response.data;
};

const deleteApplication = async (id) => {
  const response = await axios.delete(`${base_url}application/${id}`, config);
  return response.data;
};

const applicationService = {
  getApplications,
  createApplication,
  updateApplication,
  getApplication,
  deleteApplication,
};

export default applicationService;
