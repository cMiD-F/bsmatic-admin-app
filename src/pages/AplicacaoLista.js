import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteAplicacao, getAplicacoes } from "../features/aplicacao/aplicacaoSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

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
  const [open, setOpen] = useState(false);
  const [aplicacaoId, setaplicId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setaplicId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAplicacoes());
  }, []);
  const aplicacaoState = useSelector((state) => state.aplicacao.aplicacoes);
  const data1 = [];
  for (let i = 0; i < aplicacaoState.length; i++) {
    data1.push({
      key: i + 1,
      title: aplicacaoState[i].title,
      acao: (
        <>
          <Link
            to={`/admin/aplicacao/${aplicacaoState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(aplicacaoState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteAplicacaoLocal = (e) => {
    dispatch(deleteAplicacao(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAplicacoes());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Aplicação</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteAplicacaoLocal(aplicacaoId);
        }}
        title="Tem certeza de que deseja excluir esta aplicação?"
      />
    </div>
  );
};

export default AplicacaoLista;
