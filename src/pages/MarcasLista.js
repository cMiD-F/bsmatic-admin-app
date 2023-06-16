import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getMarcas } from "../features/marca/marcaSlice";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Marca",
    dataIndex: "title",
  },
  {
    title: "Ação",
    dataIndex: "acao",
  },
];

const MarcaLista = () => {
  const dispatch = useDispatch();
  useEffect(() => {
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
      <h3 className="mb-4 title">Marcas</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default MarcaLista;
