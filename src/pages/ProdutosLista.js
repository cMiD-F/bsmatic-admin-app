import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProduto } from "../features/produto/produtoSlice";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Item",
    dataIndex: "item",
    sorter: (a, b) => a.item.length - b.item.length,
  },
  {
    title: "Marca",
    dataIndex: "marca",
    sorter: (a, b) => a.marca.length - b.marca.length,
  },
  {
    title: "Itens Inclusos",
    dataIndex: "itensInclusos",
  },
  {
    title: "Valor",
    dataIndex: "valorBS",
    sorter: (a, b) => a.valorBS - b.valorBS,
  },
  {
    title: "Ação",
    dataIndex: "acao",
  },
];

const ProdutosLista = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduto());
  }, []);
  const produtoState = useSelector((state) => state.produto.produtos);
  const data1 = [];
  for (let i = 0; i < produtoState.length; i++) {
    data1.push({
      key: i + 1,
      item: produtoState[i].item,
      marca: produtoState[i].marca,
      itensInclusos: produtoState[i].itensInclusos,
      valorBS: `${produtoState[i].valorBS}`,
      acao: (
        <>
          <Link to="/" className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  console.log(data1);
  return (
    <div>
      <h3 className="mb-4 title">Produtos</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ProdutosLista;
