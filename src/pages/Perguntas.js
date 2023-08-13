import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Table } from "antd";
import { Link } from "react-router-dom";
import {getPerguntas, deleteAPergunta, resetState, updateAPergunta} from "../features/perguntas/perguntasSlice";
import CustomModal from "../components/CustomModal";

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
  const [open, setOpen] = useState(false);
  const [enqId, setenqId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setenqId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getPerguntas());
  }, []);
  const enqState = useSelector((state) => state.pergunta.perguntas);
  const data1 = [];
  for (let i = 0; i < enqState.length; i++) {
    data1.push({
      key: i + 1,
      nome: enqState[i].nome,
      email: enqState[i].email,
      telefone: enqState[i].telefone,
      status: (
        <>
          <select
            name=""
            defaultValue={enqState[i].status ? enqState[i].status : "Submetido"}
            className="form-control form-select"
            id=""
            onChange={(e) => setEnquiryStatus(e.target.value, enqState[i]._id)}
          >
            <option value="Submetido">Submetido</option>
            <option value="Contatado">Contatado</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Resolvido">Resolvido</option>
          </select>
        </>
      ),

      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/perguntas/${enqState[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(enqState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const setEnquiryStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, enqData: e };
    dispatch(updateAPergunta(data));
  };
  const deleteEnq = (e) => {
    dispatch(deleteAPergunta(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getPerguntas());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Perguntas</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteEnq(enqId);
        }}
        title="Tem certeza de que deseja excluir esta consulta?"
      />
    </div>
  );
};

export default Perguntas;
