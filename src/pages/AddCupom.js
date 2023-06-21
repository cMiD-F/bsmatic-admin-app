import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createCupom,
  getACupom,
  resetState,
  updateACupom,
} from "../features/cupom/cupomSlice";

let schema = yup.object().shape({
  nome: yup.string().required("O nome do cupom é obrigatório."),
  expiracao: yup.date().required("A data de validade é obrigatória."),
  desconto: yup.number().required("A porcentagem de desconto é obrigatória."),
});
const AddCupom = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCupomId = location.pathname.split("/")[3];
  const newCupom = useSelector((state) => state.cupom);

  const {
    isSuccess,
    isError,
    isLoading,
    createdCupom,
    cuponNome,
    cupomDesconto,
    cupomExpiracao,
    updatedCupom,
  } = newCupom;
  const changeDateFormet = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [year, month, day].join("-");
  };

  useEffect(() => {
    if (getCupomId !== undefined) {
      dispatch(getACupom(getCupomId));
    } else {
      dispatch(resetState());
    }
  }, [getCupomId]);

  useEffect(() => {
    if (isSuccess && createdCupom) {
      toast.success("Cupom adicionado com sucesso!");
    }
    if (isSuccess && updatedCupom) {
      toast.success("Cupom atualizado com sucesso!");
      navigate("/admin/lista-cupom");
    }
    if (isError && cuponNome && cupomDesconto && cupomExpiracao) {
      toast.error("Algo deu errado!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nome: cuponNome || "",
      expiracao: changeDateFormet(cupomExpiracao) || "",
      desconto: cupomDesconto || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCupomId !== undefined) {
        const data = { id: getCupomId, cupomData: values };
        dispatch(updateACupom(data));
        dispatch(resetState());
      } else {
        dispatch(createCupom(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState);
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getCupomId !== undefined ? "Edit" : "Adicionar"} Cupom
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="nome"
            onChng={formik.handleChange("nome")}
            onBlr={formik.handleBlur("nome")}
            val={formik.values.nome}
            label="Digite o nome do cupom"
            id="nome"
          />
          <div className="error">
            {formik.touched.nome && formik.errors.nome}
          </div>
          <CustomInput
            type="date"
            name="expiracao"
            onChng={formik.handleChange("expiracao")}
            onBlr={formik.handleBlur("expiracao")}
            val={formik.values.expiracao}
            label="Inserir dados de expiração"
            id="date"
          />
          <div className="error">
            {formik.touched.expiracao && formik.errors.expiracao}
          </div>
          <CustomInput
            type="number"
            name="desconto"
            onChng={formik.handleChange("desconto")}
            onBlr={formik.handleBlur("desconto")}
            val={formik.values.desconto}
            label="Insira o desconto"
            id="desconto"
          />
          <div className="error">
            {formik.touched.desconto && formik.errors.desconto}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getCupomId !== undefined ? "Edit" : "Adicionar"} Cupom
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCupom;
