import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("O e-mail deve ser válido")
    .required("Email é obrigatório"),
  senha: yup.string().required("Senha requerida"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      senha: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isLoading, isError, isSuccess, message]);

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Entre na sua conta para continuar.</p>
        <div className="error text-center">
          {message.message === "Negado" ? "Você não é um Administrador" : ""}
        </div>

        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Email"
            id="email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className="error mt-2">
            {formik.touched.email && formik.errors.email}
          </div>

          <CustomInput
            type="password"
            name="senha"
            label="Senha"
            id="senha"
            onChng={formik.handleChange("senha")}
            onBlr={formik.handleBlur("senha")}
            val={formik.values.senha}
          />
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>

          <div className="mb-3 text-end">
            <Link to="/esqueceu-senha">Esqueceu sua senha ?</Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "#ffd333" }}
            type="Enviar"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
