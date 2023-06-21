import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getPedidoByUser, getPedidos } from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Nome do produto",
    dataIndex: "item",
  },
  {
    title: "Marca",
    dataIndex: "marca",
  },
  {
    title: "Descrição",
    dataIndex: "itensInclusos",
  },
  {
    title: "Preço",
    dataIndex: "valorBS",
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

const ViewPedidos = () => {
    const location = useLocation();
    const userId = location.pathname.split("/")[3];
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getPedidoByUser(userId));
    }, []);
    const orderState = useSelector((state) => state.auth.orderbyuser[0].produto);
    console.log(orderState);
    const data1 = [];
    for (let i = 0; i < orderState.length; i++) {
      data1.push({
        key: i + 1,
        item: orderState[i].produto.item,
        marca: orderState[i].produto.marca,
        itensInclusos: orderState[i].produto.itensInclusos,
        valorBS: orderState[i].produto.valorBS,
        date: orderState[i].produto.createdAt,
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
    return (
      <div>
        <h3 className="mb-4 title">Ver pedido</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    );
  };
  
  export default ViewPedidos;