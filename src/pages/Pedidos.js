import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { getOrders } from "../features/auth/authSlice";

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
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth.orders);
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1, // Use o identificador único do pedido como chave
      nome: orderState[i].orderby.primeironome,
      produto: (
        <Link to={`/admin/pedido/${orderState[i].orderby._id}`}>
          Ver pedidos
        </Link>
      ),
      valor: orderState[i].acompPagemento.valor,
      date: new Date(orderState[i].createdAt).toLocaleString(),
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
      <h3 className="mb-4 title">Pedido</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Pedidos;
