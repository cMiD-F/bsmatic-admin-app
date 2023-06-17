import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { getPerguntas } from "../features/perguntas/perguntasSlice";

const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Nome",
      dataIndex: "nome",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Telefone",
      dataIndex: "telefone",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Ação",
      dataIndex: "acao",
    },
  ];

  
const Perguntas = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPerguntas());
  }, []);
  const pergState = useSelector((state) => state.pergunta.perguntas);
  const data1 = [];
  for (let i = 0; i < pergState.length; i++) {
    data1.push({
      key: i + 1,
      nome: pergState[i].nome,
      email: pergState[i].email,
      telefone: pergState[i].telefone,
      status: 
        (
        <>
          <select name="" className="form-control form-select" id="">
            <option value="">Selecionar Status</option>
          </select>
        </>
      ),

      acao: (
        <>
          <Link to="/" className="fs-3 text-danger">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Perguntas</h3>
      <div>
      <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Perguntas;
