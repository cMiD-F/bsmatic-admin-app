import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/usuario/usuarioSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Nome",
    dataIndex: "nome",
    defaultSortOrder: "descend",
    sorter: (a,b) => a.nome.length - b.nome.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Telefone",
    dataIndex: "telefone",
  },
];

const Usuarios = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const usuariostate = useSelector((state) => state.usuarios.usuario);
  const data1 = [];
  for (let i = 0; i < usuariostate.length; i++){
  if(usuariostate[i].role !== "Admin"){
    data1.push({
        key: i + 1,
        nome:usuariostate[i].primeironome + " " + usuariostate[i].ultimonome,
        email:usuariostate[i].email,
        telefone:usuariostate[i].telefone,
    });
  }
}

  return (
    <div>
      <h3 className="mb-4 title">Usuários</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Usuarios;
