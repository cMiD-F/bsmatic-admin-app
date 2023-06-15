import React from "react";
import { Table } from "antd";

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
    title: "Status",
    dataIndex: "status",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    nome: `BSMatic ${i}`,
    produto: 32,
    status: `Confirmado. ${i}`,
  });
}

const MarcaLista = () => {
  return (
    <div>
      <h3 className="mb-4">Marcas</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default MarcaLista ;