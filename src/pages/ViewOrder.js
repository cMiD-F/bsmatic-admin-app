import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getaOrder } from "../features/auth/authSlice";
const columns = [
  {
    title: "Nº",
    dataIndex: "key",
  },
  {
    title: "Nome do Produto",
    dataIndex: "name",
  },
  {
    title: "Marca",
    dataIndex: "brand",
  },
  {
    title: "Contar",
    dataIndex: "count",
  },
  {
    title: "Quantidade",
    dataIndex: "amount",
  },
  {
    title:"Aplicação",
    dataIndex: "application",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getaOrder(orderId));
  }, []);
  const orderState = useSelector((state) => state?.auth?.singleorder?.orders);
  console.log(orderState);
  const data1 = [];
  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState?.orderItems[i]?.product?.title,
      brand: orderState?.orderItems[i]?.product?.brand,
      count: orderState?.orderItems[i]?.quantity,
      amount: orderState?.orderItems[i]?.price,
      application: orderState?.orderItems[i]?.application,
      // color: (
      //   <div className="col-3">
      //     <ul
      //       className="colors ps-0"
      //       style={{
      //         width: "30px",
      //         height: "30px",
      //         borderRadius: "50%",
      //         marginBottom: "10px",

      //         backgroundColor: orderState?.orderItems[i]?.color?.title,
      //       }}
      //     ></ul>
      //   </div>
      // ),
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

export default ViewOrder;
