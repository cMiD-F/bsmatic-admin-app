import React from "react";
import CustomInput from "../components/CustomInput";

const RedefinirSenha = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Redefinir senha</h3>
        <p className="text-center">
        Por favor digite sua nova senha.
        </p>
        <form action="">
          <CustomInput type="text" label="Nova Senha" id="senha" />
          <CustomInput
            type="text"
            label="Confirmar Senha"
            id="confirmarsenha"
          />

          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="Enviar"
          >
            Redefinir senha
          </button>
        </form>
      </div>
    </div>
  );
};


export default RedefinirSenha;
