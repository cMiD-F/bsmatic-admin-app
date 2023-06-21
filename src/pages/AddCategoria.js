import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createCategoria, getAProdutoCategoria, updateAProdutoCategoria ,resetState } from "../features/pcategoria/pcategoriaSlice";

let schema = yup.object().shape({
  title: yup.string().required("O nome da categoria é obrigatório"),
});

const AddCategoria = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getPCatId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const newCategoria = useSelector((state) => state.pCategoria);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategoria,
    categoriaNome,
    updatedCategoria,
  } = newCategoria;
  useEffect(() => {
    if (getPCatId !== undefined) {
      dispatch(getAProdutoCategoria(getPCatId));
    } else {
      dispatch(resetState());
    }
  }, [getPCatId]);
  useEffect(() => {
    if (isSuccess && createdCategoria) {
      toast.success("Categoria adicionada com sucesso!");
    }
    if (isSuccess && updatedCategoria) {
      toast.success("Categoria atualizada com sucesso!");
      navigate("/admin/lista-categoria");
    }
    if (isError) {
      toast.error("Algo deu errado!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoriaNome || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getPCatId !== undefined) {
        const data = { id: getPCatId, pCatData: values };
        dispatch(updateAProdutoCategoria(data));
        dispatch(resetState());
      } else {
        dispatch(createCategoria(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4  title">
        {getPCatId !== undefined ? "Edit" : "Adicionar"} Categoria
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Digite aqui a categoria"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="categoria"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getPCatId !== undefined ? "Edit" : "Adicionar"} Categoria
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoria;
