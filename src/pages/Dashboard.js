import React, { useEffect, useState } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyData,
  getOrders,
  getYearlyData,
} from "../features/auth/authSlice";

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
    title: "Contagem de produtos",
    dataIndex: "product",
  },
  {
    title: "Valor Total",
    dataIndex: "price",
  },
  {
    title: "Preço total após desconto",
    dataIndex: "dprice",
  },
  {
    title: "Status",
    dataIndex: "staus",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();

  const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const orderState = useSelector((state) => state?.auth?.orders?.orders);
  console.log(orderState);

  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const [orderData, setOrderData] = useState([]);

  const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const config3 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    dispatch(getMonthlyData(config3));
    dispatch(getYearlyData(config3));
    dispatch(getOrders(config3));
  }, []);

  useEffect(() => {
    let monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    let data = [];

    let monthlyOrderCount = [];
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];
      data.push({
        type: monthNames[element?._id?.month],
        income: element?.amount,
      });
      monthlyOrderCount.push({
        type: monthNames[element?._id?.month],
        income: element?.count,
      });
    }

    setDataMonthly(data);
    setDataMonthlySales(monthlyOrderCount);

    const data1 = [];

    for (let i = 0; i < orderState?.length; i++) {
      data1.push({
        key: i,
        name: orderState[i].user.firstname + " " + orderState[i].user.lastname,
        product: orderState[i].orderItems?.length,
        price: orderState[i]?.totalPrice,
        dprice: orderState[i]?.totalPriceAfterDiscount,
        staus: orderState[i]?.orderStatus,
      });
    }
    setOrderData(data1);
  }, [monthlyDataState, yearlyDataState]);

  const config = {
    data: dataMonthly,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  const config2 = {
    data: dataMonthlySales,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Renda total</p>
            <h4 className="mb-0 sub-title">
              Rs.{yearlyDataState && yearlyDataState[0]?.amount}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0  desc">Renda no ano passado a partir de hoje</p>
          </div>
        </div>
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Vendas totais</p>
            <h4 className="mb-0 sub-title">
              {yearlyDataState && yearlyDataState[0]?.count}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0  desc">Vendas no ano passado a partir de hoje</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items gap-3">
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Renda no ano passado a partir de hoje</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4 flex-grow-1 ">
          <h3 className="mb-5 title">Vendas no ano passado a partir de hoje</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Pedidos recentes</h3>
        <div>
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
