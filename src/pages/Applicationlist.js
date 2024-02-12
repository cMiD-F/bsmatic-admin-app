import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteAApplication, getApplications } from "../features/application/applicationSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "Nº",
    dataIndex: "key",
  },
  {
    title: "Nome",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Ação",
    dataIndex: "action",
  },
];

const Applicationlist = () => {
  const [open, setOpen] = useState(false);
  const [applicationId, setapplicationId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setapplicationId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getApplications());
  }, []);

  const applicationState = useSelector((state) => state.application.applications);
  const data1 = [];
  for (let i = 0; i < applicationState.length; i++) {
    data1.push({
      key: i + 1,
      title: applicationState[i].title,
      action: (
        <>
          <Link
            to={`/admin/application/${applicationState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(applicationState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteApplicationLocal = (e) => {
    dispatch(deleteAApplication(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getApplications());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Aplicação</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteApplicationLocal(applicationId);
        }}
        title="Tem certeza de que deseja excluir esta aplicação?"
      />
    </div>
  );
};

export default Applicationlist;
