import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteABlogCat,
  getCategorias,
  resetState,
} from "../features/bcategoria/bcategoriaSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Nome",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },

  {
    title: "Ação",
    dataIndex: "acao",
  },
];

const Blogcatlist = () => {
  const [open, setOpen] = useState(false);
  const [blogCatId, setblogCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setblogCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategorias());
  }, []);
  const bCatState = useSelector((state) => state.bCategoria.bCategorias);
  console.log(bCatState);
  const data1 = [];
  for (let i = 0; i < bCatState.length; i++) {
    data1.push({
      key: i + 1,
      title: bCatState[i].title,
      acao: (
        <>
          <Link
            to={`/admin/blog-categoria/${bCatState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(bCatState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBlogCategory = (e) => {
    dispatch(deleteABlogCat(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategorias());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Blog Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlogCategory(blogCatId);
        }}
        title="Tem certeza de que deseja excluir esta categoria de blog?"
      />
    </div>
  );
};

export default Blogcatlist;
