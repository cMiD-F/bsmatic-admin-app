import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createAplicacao, getAplicacao, resetState, updateAplicacao } from "../features/aplicacao/aplicacaoSlice";

let schema = yup.object().shape({
  title: yup.string().required("O nome da aplicação é obrigatório"),
});
const AddAplicacao = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getAplicacaoId = location.pathname.split("/")[3];
  const newAplication = useSelector((state) => state.aplicacao);
  const {
    isSuccess,
    isError,
    isLoading,
    createdAplicacao,
    updatedAplicacao,
    aplicacaoNome,
  } = newAplication;

  useEffect(() => {
    if (getAplicacaoId !== undefined) {
      dispatch(getAplicacao(getAplicacaoId));
    } else {
      dispatch(resetState());
    }
  }, [getAplicacaoId]);
  useEffect(() => {
    if (isSuccess && createdAplicacao) {
      toast.success("Aplicação adicionada com sucesso!");
    }
    if (isSuccess && updatedAplicacao) {
      toast.success("Aplicação atualizada com sucesso!");
      navigate("/admin/lista-aplicacao");
    }
    if (isError) {
      toast.error("Algo deu errado!");
    }
  }, [isSuccess, isError, isLoading, createdAplicacao]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: aplicacaoNome || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getAplicacaoId !== undefined) {
        const data = { id: getAplicacaoId, aplicacaoData: values };
        dispatch(updateAplicacao(data));
        dispatch(resetState());
      } else {
        dispatch(createAplicacao(values));
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
        {getAplicacaoId !== undefined ? "Edit" : "Adicionar"} Aplicação
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Digite aqui a aplicação"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="aplicacao"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getAplicacaoId !== undefined ? "Edit" : "Adicionar"} Aplicação
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAplicacao;
