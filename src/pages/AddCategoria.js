import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createCategoria, resetState } from "../features/pcategoria/pcategoriaSlice";

let schema = yup.object().shape({
  title: yup.string().required("O nome da categoria é obrigatório"),
});

const AddCategoria = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newCategoria = useSelector((state) => state.pCategoria);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategoria,    
  } = newCategoria;
  useEffect(() => {
    if (isSuccess && createdCategoria) {
      toast.success("Categoria adicionada com sucesso!");
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
      dispatch(createCategoria(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Adiciona Categoria</h3>
      <div>
      <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Digite aqui a categoria"
            id="categoria"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Adicionar Categoria
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoria;
