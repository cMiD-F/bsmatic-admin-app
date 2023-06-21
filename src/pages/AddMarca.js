import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createMarca, getAmarca, updateAmarca, resetState } from "../features/marca/marcaSlice";

let schema = yup.object().shape({
  title: yup.string().required("Digitar o nome da marca é obrigatório"),
});

const AddMarca = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getMarcaId = location.pathname.split("/")[3];
  const newMarca = useSelector((state) => state.marca);
  const {
    isSuccess,
    isError,
    isLoading,
    createdMarca,
    marcaNome,
    updatedMarca,
  } = newMarca;
  useEffect(() => {
    if (getMarcaId !== undefined) {
      dispatch(getAmarca(getMarcaId));
    } else {
      dispatch(resetState());
    }
  }, [getMarcaId]);

  useEffect(() => {
    if (isSuccess && createdMarca) {
      toast.success("Marca adicionada com sucesso!");
    }
    if (isSuccess && updatedMarca) {
      toast.success("Marca atualizada com sucesso!");
      navigate("/admin/lista-marca");
    }

    if (isError) {
      toast.error("Algo deu errado!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: marcaNome || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getMarcaId !== undefined) {
        const data = { id: getMarcaId, marcaData: values };
        dispatch(updateAmarca(data));
        dispatch(resetState());
      } else {
        dispatch(createMarca(values));
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
        {getMarcaId !== undefined ? "Edit" : "Adicionar"} Marca
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Insira a marca"
            id="marca"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getMarcaId !== undefined ? "Edit" : "Adicionar"} Marca
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMarca;
