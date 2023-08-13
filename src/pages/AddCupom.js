import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createCoupon,
  getACoupon,
  resetState,
  updateACoupon,
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
  const getCouponId = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.cupom);

  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    cupomNome,
    cupomDesconto,
    cupomExpiracao,
    updatedCoupon,
  } = newCoupon;
  const changeDateFormet = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [year, month, day].join("-");
  };

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Added Successfullly!");
    }
    if (isSuccess && updatedCoupon) {
      toast.success("Coupon Updated Successfullly!");
      navigate("/admin/coupon-list");
    }
    if (isError && cupomNome && cupomDesconto && cupomExpiracao) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nome: cupomNome || "",
      expiracao: changeDateFormet(cupomExpiracao) || "",
      desconto: cupomDesconto || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateACoupon(data));
        dispatch(resetState());
      } else {
        dispatch(createCoupon(values));
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
        {getCouponId !== undefined ? "Edit" : "Adicionar"} Cupom
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
            {getCouponId !== undefined ? "Edit" : "Adicionar"} Cupom
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCupom;
