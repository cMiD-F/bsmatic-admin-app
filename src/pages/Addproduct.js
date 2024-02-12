import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getApplications } from "../features/application/applicationSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import {
  createProducts,
  getAProduct,
  resetState,
  updateAProduct,
} from "../features/product/productSlice";
let schema = yup.object().shape({
  title: yup.string().required("O título é obrigatório"),
  description: yup.string().required("A descrição é obrigatória"),
  price: yup.number().required("O preço é obrigatório"),
  brand: yup.string().required("A marca é obrigatória"),
  category: yup.string().required("A categoria é obrigatória"),
  tags: yup.string().required("A etiqueta é obrigatória"),
  application: yup.string().required("Selecionar a aplicação é obrigatória"),
  quantity: yup.number().required("A quantidade é necessária"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const [application, setApplication] = useState([]);
  const [images, setImages] = useState([]);
  console.log(application);
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getApplications());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const applicationState = useSelector((state) => state.application.applications);
  const imgState = useSelector((state) => state?.upload?.images);
  const newProduct = useSelector((state) => state.product);
  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    updatedProduct,
    productName,
    productDesc,
    productPrice,
    productBrand,
    productCategory,
    productTag,
    productApplications,
    productQuantity,
    productImages,
    productGarantia,
    productCodigoTransmissao,
  } = newProduct;

  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getAProduct(getProductId));
    } else {
      dispatch(resetState());
    }
  }, [getProductId]);
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Produto adicionado com sucesso!");
    }
    if (isSuccess && updatedProduct) {
      toast.success("Produto atualizado com sucesso!");
      navigate("/admin/list-product");
    }
    if (isError) {
      toast.error("Algo deu errado!");
    }
  }, [isSuccess, isError, isLoading]);

   const applicationopt = [];
   applicationState.forEach((i) => {
     applicationopt.push({
       label: (
         <div className="col-3">
           <ul
             className="applications ps-0"
             style={{
               width: "20px",
               height: "20px",
               marginBottom: "10px",
               backgroundapplication: i.title,
               borderRadius: "50%",
               listStyle: "none",
              border: "2px solid transparent",
             }}
           ></ul>
         </div>
       ),
       value: i._id,
     });
   });

   const productapplication = [];
   productApplications?.forEach((i) => {
     productapplication.push({
       label: (
         <div className="col-3">
           <ul
             className="applications ps-0"
             style={{
               width: "20px",
               height: "20px",
               marginBottom: "10px",
               backgroundApplication: i.title,
               borderRadius: "50%",
               listStyle: "none",
               border: "2px solid transparent",
             }}
           ></ul>
         </div>
       ),
       value: i._id,
     });
   });

  const img = [];
  imgState?.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  const imgshow = [];
  productImages?.forEach((i) => {
    imgshow.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  //  useEffect(() => {
  //    formik.values.application = application ? application.join(',') : "";
  //    formik.values.images = img;
  //  }, [application, img]);;

  const formik = useFormik({
    initialValues: {
      title: productName || "",
      description: productDesc || "",
      price: productPrice || "",
      brand: productBrand || "",
      category: productCategory || "",
      tags: productTag || "",
      application: productApplications || "",
      quantity: productQuantity || "",
      images: productImages || "",
      garantia: productGarantia || "",
      codigoTransmissao: productCodigoTransmissao || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      if (getProductId !== undefined) {
        const data = { id: getProductId, productData: values };
        dispatch(updateAProduct(data));
      } else {
        dispatch(createProducts(values));
        formik.resetForm();
        setApplication(null);
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });
  const handleApplications = (e) => {
    setApplication(e);
    console.log(application);
  };

  return (
    <div>
      <h3 className="mb-4 title">
        {getProductId !== undefined ? "Edit" : "Add"} Produto
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Insira o título do produto"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            label="Insira o preço do produto"
            name="price"
            onChng={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Selecione a marca</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <CustomInput
            type="text"
            label="Insira o tempo de garantia"
            name="garantia"
            onChng={formik.handleChange("garantia")}
            onBlr={formik.handleBlur("garantia")}
            val={formik.values.garantia}
          />
          <div className="error">
            {formik.touched.garantia && formik.errors.garantia}
          </div>
          <CustomInput
            type="text"
            label="Digite o código da transmissão"
            name="codigoTransmissao"
            onChng={formik.handleChange("codigoTransmissao")}
            onBlr={formik.handleBlur("codigoTransmissao")}
            val={formik.values.codigoTransmissao}
          />
          <div className="error">
            {formik.touched.codigoTransmissao && formik.errors.codigoTransmissao}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Selecione a Categoria</option>
            {catState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
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
              Selecione a Categoria
            </option>
            <option value="featured">featured</option>
            <option value="popular">popular</option>
            <option value="special">special</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>

          <select
            name="application"
            onChange={formik.handleChange("application")}
            onBlur={formik.handleBlur("application")}
            value={formik.values.application}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Selecione a aplicação</option>
            {applicationState.map((i, j) => {
               return (
                 <option key={j} value={i.title}>
                   {i.title}
                 </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.application && formik.errors.application}
          </div>

          <CustomInput
            type="number"
            label="Insira a quantidade do produto"
            name="quantity"
            onChng={formik.handleChange("quantity")}
            onBlr={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
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
                      selecionar os arquivos.
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgshow?.map((i, j) => {
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
            {getProductId !== undefined ? "Edit" : "Add"} Produto
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
