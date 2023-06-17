import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { getCategorias } from "../features/bcategoria/bcategoriaSlice";

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
const BlogCatLista = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategorias());
  }, []);
  const bCatStat = useSelector((state) => state.bCategoria.bCategorias);
  const data1 = [];
  for (let i = 0; i < bCatStat.length; i++) {
    data1.push({
      key: i + 1,
      title: bCatStat[i].title,
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
      <h3 className="mb-4 title">Categoria do blog</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default BlogCatLista;