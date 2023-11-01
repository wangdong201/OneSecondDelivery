import { type FC, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { Table } from "antd";
const MyTemplates: FC = () => {
  const [selectionType] = useState<"checkbox" | "radio">("checkbox");
  interface DataType {
    key: React.Key;
    tmpID: string;
    title: string;
    explain: string;
    example: string;
    operation: string;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "tmpID",
      dataIndex: "tmpID"
    },
    {
      title: "标题",
      dataIndex: "title"
    },
    {
      title: "说明",
      dataIndex: "explain"
    },
    {
      title: "示例",
      dataIndex: "example"
    },
    {
      title: "操作",
      dataIndex: "operation"
    }
  ];
  const data: DataType[] = [];
  return (
    <>
      <div>
        <Table
          rowSelection={{ type: selectionType }}
          columns={columns}
          dataSource={data}
          bordered
        />
      </div>
    </>
  );
};
export default MyTemplates;
