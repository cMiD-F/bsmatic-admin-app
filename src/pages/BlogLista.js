import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getBlogs } from "../features/blogs/blogSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Titulo",
    dataIndex: "title",
  },
  {
    title: "Categoria",
    dataIndex: "categoria",
  },
  {
    title: "Ação",
    dataIndex: "acao",
  },
];

const BlogLista = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const getBlogState = useSelector((state) => state.blogs.blogs);
  const data1 = [];
  for (let i = 0; i < getBlogState.length; i++) {
    data1.push({
      key: i + 1,
      title: getBlogState[i].title,
      categoria: getBlogState[i].categoria,
      acao: (
        <>
          <Link to="/" className="fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link to="/" className="fs-3 text-danger">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Lista Blogs</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default BlogLista;
