import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAMarca,
  getMarcas,
  resetState,
} from "../features/marca/marcaSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Marca",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Ação",
    dataIndex: "acao",
  },
];

const MarcasLista = () => {
  const [open, setOpen] = useState(false);
  const [marcaId, setmarcaId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setmarcaId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getMarcas());
  }, []);
  const marcaState = useSelector((state) => state.marca.marcas);
  const data1 = [];
  for (let i = 0; i < marcaState.length; i++) {
    data1.push({
      key: i + 1,
      title: marcaState[i].title,
      acao: (
        <>
          <Link
            to={`/admin/marca/${marcaState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(marcaState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteMarca = (e) => {
    dispatch(deleteAMarca(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getMarcas());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Brands</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteMarca(marcaId);
        }}
        title="Tem certeza de que deseja excluir esta marca?"
      />
    </div>
  );
};

export default MarcasLista;
