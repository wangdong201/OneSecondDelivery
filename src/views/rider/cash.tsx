import { type FC, useState, useEffect } from "react";
import type { PaginationProps } from "antd";
import { Input, Select, Button, Table, Pagination } from "antd";
import { Icon } from "@iconify/react";
import type { ColumnsType } from "antd/es/table";
import { cashData } from "@/service/api";

const columns: ColumnsType<Res.CashData> = [
  {
    title: "编号",
    dataIndex: "number",
    key: "number"
  },
  {
    title: "提现用户",
    dataIndex: "withdrawalUsers",
    key: "withdrawalUsers"
  },
  {
    title: "用户",
    dataIndex: "userName",
    key: "userName"
  },
  {
    title: "提现金额",
    dataIndex: "withdrawalAmount",
    key: "withdrawalAmount"
  },
  {
    title: "提现账户",
    dataIndex: "withdrawalAccount",
    key: "withdrawalAccount"
  },
  {
    title: "状态",
    dataIndex: "state",
    key: "state"
  },
  {
    title: "时间",
    dataIndex: "timer",
    key: "timer"
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate"
  }
];

const showTotal: PaginationProps["showTotal"] = (total) => `共 ${total} 条数据`;

const Cash: FC = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<Res.CashData>({
    code: 1,
    msg: "",
    data: { pageSize: 1, current: 1, count: 1, totalPages: 1, data: [] }
  });
  useEffect(() => {
    cashData({ current: 1, pageSize: 20 })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => error);
  }, [count]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  return (
    <>
      <div className=" h-[36px] text-[24px]">提现列表</div>

      <div>
        <div className=" mt-[20px]">
          <Input
            className=" w-[200px] h-[40px] mr-[8px] mb-[8px]"
            placeholder="开户行"
          />
          <Input
            className=" w-[200px] h-[40px] mr-[8px] mb-[8px]"
            placeholder="银行卡号"
          />
          <Input
            className=" w-[200px] h-[40px] mr-[8px] mb-[8px]"
            placeholder="真实姓名"
          />
          <Input
            className=" w-[200px] h-[40px] mr-[8px] mb-[8px]"
            placeholder="提现编号"
          />
          <Select
            defaultValue="状态：全部"
            style={{ width: "200px", height: "40px", borderRadius: "4px" }}
            options={[
              { value: "全部", label: "状态：全部" },
              { value: "成功", label: "状态：成功" },
              { value: "待提现", label: "状态：待提现" },
              { value: "失败", label: "状态：失败" }
            ]}
          />
        </div>
        <div className=" mt-[12px]">
          <Button
            onClick={() => {
              setCount((e) => e + 1);
            }}
            className=" w-[120px] h-[40px] mr-[4px] rounded-[4px]"
          >
            取消
          </Button>
          <Button
            onClick={() => {
              setCount((e) => e + 1);
            }}
            className=" w-[120px] h-[40px] mr-[4px] rounded-[4px]"
            type="primary"
          >
            搜索
          </Button>
          <div className=" h-[1px] bg-[#e8e8e8] my-[24px]" />
        </div>
      </div>

      <div className=" h-[40px] flex justify-end">
        <Button
          onClick={() => {
            setCount((e) => e + 1);
          }}
          className=" w-[40px] h-[40px] rounded-[4px] text-[16px] flex justify-center items-center"
        >
          <Icon
            className=" flex-shrink-0"
            icon="clarity:refresh-line"
            rotate={1}
          />
        </Button>
      </div>

      <div className=" mt-[20px]">
        <Table
          bordered
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data.data.data}
          pagination={false}
        />
      </div>

      <div className=" mt-[20px] flex justify-end">
        {data.data.data.length === 0 ? (
          <Pagination
            size="small"
            total={data.data.data.length}
            showTotal={showTotal}
            disabled
          />
        ) : (
          <Pagination
            size="small"
            total={data.data.data.length}
            showTotal={showTotal}
          />
        )}
      </div>
    </>
  );
};

export default Cash;
