import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { getPedidos } from "../features/auth/authSlice";

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
    title: "Produto",
    dataIndex: "produto",
  },
  {
    title: "Valor",
    dataIndex: "valor",
  },
  {
    title: "Data",
    dataIndex: "date",
  },
  {
    title: "Ação",
    dataIndex: "acao",
  },
];

const Pedidos = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPedidos());
  }, []);
  const pedidoState = useSelector((state) => state.auth.pedidos);
  console.log(pedidoState);
  const data1 = [];
  for (let i = 0; i < pedidoState.length; i++) {
    data1.push({
      key: i + 1, // Use o identificador único do pedido como chave
      nome: pedidoState[i].orderby.primeiroNome,
      produto: (
        <Link to={`/admin/pedidos/${pedidoState[i].orderby._id}`}>
          Ver pedidos
        </Link>
      ),
      valor: pedidoState[i].acompPagemento.valor,
      date: new Date(pedidoState[i].createdAt).toLocaleString(),
      acao: (
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

  return (
    <div>
      <h3 className="mb-4 title">Pedidos</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Pedidos;
