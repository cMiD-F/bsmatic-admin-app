import React from "react";
import CustomInput from "../components/CustomInput";

const AddMarca = () => {
  return (
    <div>
      <h3 className="mb-4">Adiciona Marca</h3>
      <div>
        <form action="">
            <CustomInput type="text" label="Insira a Marca"/>
            <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Adicionar Marca
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMarca;