import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders, updateAOrder } from "../features/auth/authSlice";
const columns = [
  {
    title: "Nº",
    dataIndex: "key",
  },
  {
    title: "Nome",
    dataIndex: "name",
  },
  {
    title: "Produto",
    dataIndex: "product",
  },
  {
    title: "Quantidade",
    dataIndex: "amount",
  },
  {
    title: "Data",
    dataIndex: "date",
  },

  {
    title: "Ação",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state?.auth?.orders.orders);

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i]?.user?.firstname,

      // product: orderState[i].products.map((i, j) => {
      //   return (
      //     <>
      //       <ul>
      //         <li>{i.product.title}</li>
      //       </ul>
      //     </>
      //   );
      // }),
      product: (
        <Link to={`/admin/order/${orderState[i]?._id}`}>Ver pedidos</Link>
      ),
      amount: orderState[i]?.totalPrice,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      action: (
        <>
          <select
            name=""
            defaultValue={orderState[i]?.orderStatus}
            onChange={(e) =>
              updateOrderStatus(orderState[i]?._id, e.target.value)
            }
            className="form-control form-select"
            id=""
          >
            <option value="Ordered" disabled selected>
            Encomendado
            </option>

            <option value="Processed">Processado</option>
            <option value="Shipped">Enviado</option>
            <option value="Out for Delivery">Saiu para entrega</option>
            <option value="Delivered">Entregue</option>
          </select>
        </>
      ),
    });
  }

  const updateOrderStatus = (a, b) => {
    dispatch(updateAOrder({ id: a, status: b }));
  };
  return (
    <div>
      <h3 className="mb-4 title">Pedidos</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;
