import React from "react";
import CustomInput from "../components/CustomInput";

const EsqueceuSenha = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Esqueceu sua senha?</h3>
        <p className="text-center">
        Digite seu e-mail de registro para redefinir a senha.
        </p>
        <form action="">
          <CustomInput type="password" label="Endereço de email..." id="email" />
          
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="Enviar"
          >
            Enviar link
          </button>
        </form>
      </div>
    </div>
  );
};

export default EsqueceuSenha;
