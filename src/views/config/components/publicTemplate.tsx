import { type FC, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

const PublicTemplate: FC = () => {
  const [selectionType] = useState<"checkbox" | "radio">("checkbox");
  interface DataType {
    key: React.Key;
    ID: string;
    title: string;
    operation: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "ID"
    },
    {
      title: "标题",
      dataIndex: "title"
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
          rowSelection={{
            type: selectionType
          }}
          columns={columns}
          dataSource={data}
          bordered
        />
      </div>
    </>
  );
};
export default PublicTemplate;
