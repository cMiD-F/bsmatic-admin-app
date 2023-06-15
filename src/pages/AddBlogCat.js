import React from "react";
import CustomInput from "../components/CustomInput";

const AddBlogCat = () => {
  return (
    <div>
      <h3 className="mb-4">Add Categoria do Blog</h3>
      <div>
        <form action="">
            <CustomInput type="text" label="Insira a categoria do blog"/>
            <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Adicionar Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCat;
