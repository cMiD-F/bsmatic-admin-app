import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteACupom, getAllCupom } from "../features/cupom/cupomSlice";
import CustomModal from "../components/CustomModal";


const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Nome",
    dataIndex: "nome",
    sorter: (a, b) => a.nome.length - b.nome.length,
  },
  {
    title: "Desconto",
    dataIndex: "desconto",
    sorter: (a, b) => a.desconto - b.desconto,
  },
  {
    title: "Expiração",
    dataIndex: "expiracao",
    sorter: (a, b) => a.expiracao.length - b.expiracao.length,
  },
  {
    title: "Ação",
    dataIndex: "acao",
  },
];

const Couponlist = () => {
  const [open, setOpen] = useState(false);
  const [cupomId, setcupomId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcupomId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCupom());
  }, []);
  const cupomState = useSelector((state) => state.cupom.cupons);
  const data1 = [];
  for (let i = 0; i < cupomState.length; i++) {
    data1.push({
      key: i + 1,
      nome: cupomState[i].nome,
      desconto: cupomState[i].desconto,
      expiracao: new Date(cupomState[i].expiracao).toLocaleString(),
      acao: (
        <>
          <Link
            to={`/admin/cupom/${cupomState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(cupomState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteCoupon = (e) => {
    dispatch(deleteACupom(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getAllCupom());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Cupons</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCoupon(cupomId);
        }}
        title="Are you sure you want to delete this Coupon?"
      />
    </div>
  );
};

export default Couponlist;
