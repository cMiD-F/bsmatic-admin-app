import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { getAplicacao } from "../features/aplicacao/aplicacaoSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Nome",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Ação",
    dataIndex: "acao",
  },
];

const AplicacaoLista = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAplicacao());
  }, []);
  const aplicState = useSelector((state) => state.aplicacao.aplicacoes);
  const data1 = [];
  for (let i = 0; i < aplicState.length; i++) {
    data1.push({
      key: i + 1,
      title: aplicState[i].title,
      acao: (
        <>
          <Link to="/" className="fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link to="/" className="fs-3 text-danger">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Lista de aplicação</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default AplicacaoLista;
