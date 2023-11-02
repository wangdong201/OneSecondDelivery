/* eslint-disable no-console */
import { useState, type FC } from "react";
import { Input, Button, Table } from "antd";
import { Icon } from "@iconify/react";
import type { ColumnsType } from "antd/es/table";
import { useRequest } from "ahooks";
import { orderCapitaltrend } from "@/service/api";

const Capitaltrend: FC = () => {
  const Id = ["订单编号", "代理编号", "城市编号", "描述"];
  const { data } = useRequest(
    async () =>
      await orderCapitaltrend({
        current: 1,
        pageSize: 20
      })
  );
  const deta = data?.data.data.data;
  interface DataType {
    key: React.Key;
    id: React.ReactElement;
    income?: React.ReactElement;
    agency?: React.ReactElement;
    rider?: React.ReactElement;
    description?: React.ReactElement;
    timer?: React.ReactElement;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "订单编号",
      dataIndex: "id"
    },
    {
      title: "平台收入",
      dataIndex: "income"
    },
    {
      title: "代理收入",
      dataIndex: "agency"
    },
    {
      title: "骑手收入",
      dataIndex: "Rider"
    },
    {
      title: "状态",
      dataIndex: "description"
    },
    {
      title: "时间",
      dataIndex: "timer"
    }
  ];
  const dataer: DataType[] = [];
  deta?.map((value, index) => {
    return dataer.push({
      key: index,
      id: (
        <div className="w-[100px] h-auto text-[12px] text-[#333333] m-0 flex items-center justify-center">
          <div className="w-[100px] h-[54px]"></div>
        </div>
      ),
      income: undefined,
      agency: undefined,
      rider: undefined,
      description: undefined,
      timer: undefined
    });
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  return (
    <div className="w-[100%] h-[100%] overflow-auto" id="div">
      <div className="w-[100%] h-[36px] text-[#333333] text-[24px]">
        资金走向列表
      </div>
      <div className="w-[100%] h-auto mt-[20px]">
        <div className="w-[100%] h-auto flex">
          {Id.map((value, index) => {
            return (
              <div className="pb-[8px] pr-[8px]" key={index}>
                <Input
                  placeholder={value}
                  className="w-[200px] h-[40px] py-[4px] px-[11px]"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-[100%] h-[40px] mt-[12px] text-[#333333] text-[14px]">
        <Button className="w-[120px] h-[40px] px-[15px] py-0 mr-[4px] rounded-[5px]">
          取消
        </Button>
        <Button
          type="primary"
          className="w-[120px] h-[40px] px-[15px] py-0 rounded-[5px]"
        >
          搜索
        </Button>
      </div>
      <div className="w-[100%] h-[1px] my-[24px] bg-[#E8E8E8]"></div>
      <div className="w-[100%] h-[40px] text-[14px] text-[#333333] flex items-center justify-end mb-[20px]">
        <Button className="w-[40px] h-[40px] flex justify-center items-center p-0 ">
          <Icon icon="mdi-light:refresh" rotate={2} className="text-[25px]" />
        </Button>
      </div>
      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataer}
          pagination={{
            total: data?.data.data.pageSize,
            showQuickJumper: true,
            showSizeChanger: false,
            pageSize: 20,
            defaultPageSize: 20,
            showTotal: () => "共0条数据"
          }}
        ></Table>
      </div>
    </div>
  );
};

export default Capitaltrend;
