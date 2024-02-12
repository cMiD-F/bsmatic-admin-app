import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createApplication,
  getAApplication,
  resetState,
  updateAApplication,
} from "../features/application/applicationSlice";
let schema = yup.object().shape({
  title: yup.string().required("A aplicação é obrigatória"),
});
const Addapplication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getApplicationId = location.pathname.split("/")[3];
  const newApplication = useSelector((state) => state.application);
  const {
    isSuccess,
    isError,
    isLoading,
    createdApplication,
    updatedApplication,
    applicationName,
  } = newApplication;
  useEffect(() => {
    if (getApplicationId !== undefined) {
      dispatch(getAApplication(getApplicationId));
    } else {
      dispatch(resetState());
    }
  }, [getApplicationId]);
  useEffect(() => {
    if (isSuccess && createdApplication) {
      toast.success("Aplicação adicionada com sucesso!");
    }
    if (isSuccess && updatedApplication) {
      toast.success("Aplicação atualizada com sucesso!");
      navigate("/admin/list-application");
    }
    if (isError) {
      toast.error("Algo deu errado!");
    }
  }, [isSuccess, isError, isLoading, createdApplication]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: applicationName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getApplicationId !== undefined) {
        const data = { id: getApplicationId, applicationData: values };
        dispatch(updateAApplication(data));
        dispatch(resetState());
      } else {
        dispatch(createApplication(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getApplicationId !== undefined ? "Edit" : "Add"} Aplicação
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Digite aqui a aplicação"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="application"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getApplicationId !== undefined ? "Edit" : "Add"} Aplicação
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addapplication;
