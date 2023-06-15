import React from "react";
import CustomInput from "../components/CustomInput";

const AddCategoria = () => {
  return (
    <div>
      <h3 className="mb-4">Adicionar Categoria</h3>
      <div>
        <form action="">
            <CustomInput type="text" label="Insira a categoria"/>
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