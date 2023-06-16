import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Table } from "antd";
import { getProdutos } from "../features/produto/produtoSlice";
import Link from "antd/es/typography/Link";

const columns = [
  // {
  //   title: "SNo",
  //   dataIndex: "key",
  // },
  {
    title: "Item",
    dataIndex: "item",
  },
  {
    title: "Marca",
    dataIndex: "marca",
  },
  {
    title: "Código da transmissão",
    dataIndex: "codigoTransmissao",
  },
  {
    title: "Categoria",
    dataIndex: "categoria",
  },
  // {
  //   title: "Aplicação",
  //   dataIndex: "aplicacao",
  // },
  {
    title: "Tags",
    dataIndex: "tags",
  },
  {
    title: "Itens Inclusos",
    dataIndex: "itensInclusos",
  },
  {
    title: "Valor",
    dataIndex: "valor",
  },
  {
    title: "Garantia",
    dataIndex: "garantia",
  },
  {
    title: "Quantidade",
    dataIndex: "quantidade",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProdutosLista = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProdutos());
  }, []);

  const produtoState = useSelector((state) => state.produto.produtos);
  const data1 = [];
  for (let i = 0; i < produtoState.length; i++) {
    data1.push({
      key: i,
      item: produtoState[i].item,
      marca: produtoState[i].marca,
      codigoTransmissao: produtoState[i].codigoTransmissao,
      categoria: produtoState[i].categoria,
      //aplicacao: produtoState[i].aplicacao,
      tags: produtoState[i].tags,
      itensInclusos: produtoState[i].itensInclusos,
      valor: `${produtoState[i].valor}`,
      garantia: produtoState[i].garantia,
      quantidade: produtoState[i].quantidade,
      action: (
        <>
          <Link to="/" className="fs-3 text-danger">
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
      <h3 className="mb-4 title">Lista de Produtos</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ProdutosLista;
