import React from "react";
import CustomInput from "../components/CustomInput";

const AddAplicacao = () => {
  return (
    <div>
      <h3 className="mb-4 title">Add Aplicação</h3>
      <div>
        <form action="">
            <CustomInput type="text" label="Insira a aplicação"/>
            <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Adicionar Aplicação
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAplicacao;