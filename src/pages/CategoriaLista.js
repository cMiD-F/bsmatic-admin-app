import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { getCategorias, deleteAProdutoCategoria, resetState } from "../features/pcategoria/pcategoriaSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Nome",
    dataIndex: "title",
    sorter: (a,b) => a.title.length - b.title.length,
  },
  {
    title: "Ação",
    dataIndex: "acao",
  },
];

const CategoriaLista = () => {
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategorias());
  }, []);
  const pCatStat = useSelector((state) => state.pCategoria.pCategorias);
  const data1 = [];
  for (let i = 0; i < pCatStat.length; i++) {
    data1.push({
      key: i + 1,
      title: pCatStat[i].title,
      acao: (
        <>
          <Link
            to={`/admin/categoria/${pCatStat[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(pCatStat[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteCategory = (e) => {
    dispatch(deleteAProdutoCategoria(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategorias());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Categoria dos produtos</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCategory(pCatId);
        }}
        title="Tem certeza de que deseja excluir esta categoria de produto?"
      />
    </div>
  );
};

export default CategoriaLista;
