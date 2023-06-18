import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createMarca } from "../features/marca/marcaSlice";

let schema = yup.object().shape({
  title: yup.string().required("Digitar o nome da marca é obrigatório"),
});

const AddMarca = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newMarca = useSelector((state) => state.marca);
  const { isSuccess, isError, isLoading, createdMarca } = newMarca;
  useEffect(() => {
    if (isSuccess && createdMarca) {
      toast.success("Marca adicionada com sucesso!");
    }
    if (isError) {
      toast.error("Algo de errado aconteceu!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createMarca(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/lista-marca");
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Adiciona Marca</h3>
      <div>
      <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Digite aqui a marca"
            id="marca"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Adicionar Marca
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMarca;
