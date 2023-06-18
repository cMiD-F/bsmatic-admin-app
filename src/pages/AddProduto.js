import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getMarcas } from "../features/marca/marcaSlice";
import { getCategorias } from "../features/pcategoria/pcategoriaSlice";
import { getAplicacao } from "../features/aplicacao/aplicacaoSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProduto, resetState } from "../features/produto/produtoSlice";

let schema = yup.object().shape({
  item: yup.string().required("Nome do produto é obrigatório"),
  itensInclusos: yup
    .string()
    .required("Descrição dos itens inclusos é obrigatório"),
  valorBS: yup.number().required("Declarar um valor é obrigatório"),
  marca: yup.string().required("Selecionar uma marca é obrigatório"),
  categoria: yup.string().required("Selecionar uma categoria é obrigatório"),
  aplicacao: yup.string().required("Selecionar a aplicação é obrigatório"),
  quantidade: yup.string().required("Declarar uma quantidade é obrigatório"),
  tags: yup.string().required("Tag é obrigatório"),
});

const AddProduto = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getMarcas());
    dispatch(getCategorias());
    dispatch(getAplicacao());
  }, []);

  const marcaState = useSelector((state) => state.marca.marcas);
  const pCatStat = useSelector((state) => state.pCategoria.pCategorias);
  const aplicState = useSelector((state) => state.aplicacao.aplicacoes);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.produto);
  const { isSuccess, isError, isLoading, createdProdutos } = newProduct;
  useEffect(() => {
    if (isSuccess && createdProdutos) {
      toast.success("Produto adicionado com sucesso!");
    }
    if (isError) {
      toast.error("Algo de errado aconteceu!");
    }
  }, [isSuccess, isError, isLoading]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [img]);

  const formik = useFormik({
    initialValues: {
      item: "",
      itensInclusos: "",
      valorBS: "",
      marca: "",
      categoria: "",
      tags: "",
      aplicacao: "",
      quantidade: "",
      images: "",
      garantia: "",
      codigoTransmissao: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProduto(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Adicionar Produto</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Digite o nome do produto"
            name="item"
            onChng={formik.handleChange("item")}
            onBlr={formik.handleBlur("item")}
            value={formik.values.item}
          />
          <div className="error">
            {formik.touched.item && formik.errors.item}
          </div>

          <CustomInput
            type="text"
            label="Digite o código da transmissão"
            name="codigoTransmissao"
            onChng={formik.handleChange("codigoTransmissao")}
            onBlr={formik.handleBlur("codigoTransmissao")}
            value={formik.values.codigoTransmissao}
          />
          <div className="error">
            {formik.touched.codigoTransmissao &&
              formik.errors.codigoTransmissao}
          </div>

          <CustomInput
            type="text"
            label="Digite o tempo de garantia"
            name="garantia"
            onChng={formik.handleChange("garantia")}
            onBlr={formik.handleBlur("garantiao")}
            value={formik.values.cgarantia}
          />
          <div className="error">
            {formik.touched.garantia && formik.errors.garantia}
          </div>

          <div className="mb-3">
            <ReactQuill
              theme="snow"
              name="itensInclusos"
              onChange={formik.handleChange("itensInclusos")}
              value={formik.values.itensInclusos}
            />
          </div>
          <div className="error">
            {formik.touched.itensInclusos && formik.errors.itensInclusos}
          </div>

          <CustomInput
            type="number"
            label="Digite o preço do produto"
            name="valorBS"
            onChng={formik.handleChange("valorBS")}
            onBlr={formik.handleBlur("valorBS")}
            val={formik.values.valorBS}
          />
          <div className="error">
            {formik.touched.valorBS && formik.errors.valorBS}
          </div>

          <select
            name="marca"
            onChange={formik.handleChange("marca")}
            onBlur={formik.handleBlur("marca")}
            value={formik.values.brand}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Selecione a Marca</option>
            {marcaState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.marca && formik.errors.marca}
          </div>

          <select
            name="categoria"
            onChange={formik.handleChange("categoria")}
            onBlur={formik.handleBlur("categoria")}
            value={formik.values.categoria}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Selecione Categoria</option>
            {pCatStat.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.categoria && formik.errors.categoria}
          </div>

          <select
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Selecione a categoria
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Especial</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>

          <select
            name="aplicacao"
            onChange={formik.handleChange("aplicacao")}
            onBlur={formik.handleBlur("aplicacao")}
            value={formik.values.aplicacao}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Selecione a aplicação</option>
            {aplicState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.aplicacao && formik.errors.aplicacao}
          </div>
          <CustomInput
            type="number"
            label="Digite a quantidade de produtos"
            name="quantidade"
            onChng={formik.handleChange("quantidade")}
            onBlr={formik.handleBlur("quantidade")}
            val={formik.values.quantidade}
          />
          <div className="error">
            {formik.touched.quantidade && formik.errors.quantidade}
          </div>

          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Arraste e solte alguns arquivos aqui ou clique para
                      selecionar os arquivos
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Adicionar Produto
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduto;
