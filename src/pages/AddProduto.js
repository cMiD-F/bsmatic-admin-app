import {React, useState} from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;
const props = {
    name:"file", 
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
        const {status} = info.file;
        if (status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (status === "done") {
            message.success(`${info.arquivo.name} Arquivo upado com sucesso.`);
        } else if (status === "error")
        {
            message.error(`${info.arquivo.name} Arquivo upload failed`);
        }
    }, 
    onDrop (e) {
        console.log("Dropped files", e.dataTransfer.files);
    },
};

const AddProduto = () => {
    const [desc, setDesc] = useState();
  const handleDesc = (e) => {
    setDesc(e);
  };
  return (
    <div>
      <h3 className="mb-4">Adicionar Produto</h3>
      <div>
        <form>
            <CustomInput type="text" label="Digite o nome do produto" />
            <div className="mb-3">
                <ReactQuill
            theme="snow"
            value={desc}
            onChange={(evt) => {
              handleDesc(evt);
            }}
          />
          </div>
          <CustomInput type="number" label="Digite o preço do produto" />
          <select name="" className="form-control py-3 mb-3" id="">
            <option value="">Selecione a marca</option>
          </select>
          <select name="" className="form-control py-3 mb-3" id="">
            <option value="">Selecione a categoria</option>
          </select><select name="" className="form-control py-3 mb-3" id="">
            <option value="">Selecione a aplicação</option>
          </select>
          <CustomInput type="text" label="Digite o preço do produto" />
          <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                </p>
                <p className="ant-upload-text">
                Clique ou arraste o arquivo para esta área para carregar
                </p>
                <p className="ant-upload-hint">
                Suporte para um upload único ou em massa. Proibir estritamente o upload de dados da empresa ou outros arquivos da banda.
                </p>
            </Dragger>
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