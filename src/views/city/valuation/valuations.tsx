import { type FC, useState, useEffect, useRef } from "react";

import { Icon } from "@iconify/react";
import {
  Button,
  Input,
  Divider,
  Table,
  Tooltip,
  Dropdown,
  Form,
  message
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { getValuation, deleteAdminCitysValuationDel } from "@/service/api";
import { useRequest } from "ahooks";
import { NavLink } from "react-router-dom";

const Valuations: FC = () => {
  const [seek, setSeek] = useState({});
  const { data: ValuationData, refresh } = useRequest(
    async () =>
      await getValuation({
        current: 1,
        pageSize: 20,
        ...seek
      })
  );
  useEffect(() => {
    refresh();
  }, [refresh, seek]);

  const inputRef = useRef(null);
  const onFinish = (values: { ruleName?: string }) => {
    setSeek(values);
  };

  const valuation = ValuationData?.data.data.data;
  // console.log(valuation);
  interface DataType {
    key: number;
    id: number;
    ruleName: string;
    distance: string;
    weight: string;
    timea: string;
    updateTime: React.ReactElement;
    operate: React.ReactElement;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "规则名称",
      dataIndex: "ruleName"
    },
    {
      title: "距离规则",
      dataIndex: "distance"
    },
    {
      title: "重量规则",
      dataIndex: "weight"
    },
    {
      title: "时间规则",
      dataIndex: "timea"
    },
    {
      title: "时间",
      dataIndex: "updateTime"
    },
    {
      title: "操作",
      dataIndex: "operate",
      render: (record: DataType) => (
        <div className="flex items-center">
          <Tooltip placement="top" title={"操作人"}>
            <NavLink to={"/user/admins"}>
              <Icon
                icon="clarity:administrator-solid"
                className="text-[20px] text-[#955ce6]"
              />
            </NavLink>
          </Tooltip>
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: <div>修改</div>
                },
                {
                  key: "2",
                  label: (
                    <div
                      onClick={() => {
                        deleteAdmin(record.id);
                      }}
                    >
                      删除
                    </div>
                  )
                }
              ]
            }}
            className="w-[30px] h-[25px]"
          >
            <Button>
              <Icon icon="ri:more-fill" className="ml-[-7px]" />
            </Button>
          </Dropdown>
        </div>
      )
    }
  ];

  const deleteAdmin = (id: number) => {
    deleteAdminCitysValuationDel({ id })
      .then(() => {
        void message.success("删除成功");
      })
      .catch(() => {
        void message.error("删除失败");
      });
  };

  const data: DataType[] = [];
  valuation?.map((value, index) => {
    return data.push({
      key: index,
      id: value.id,
      ruleName: value.ruleName,
      distance: "在1~10公里范围内,每一公里加价1元",
      weight: "在1~10公里范围内,每一公里加价1元",
      timea: "在1~10公里范围内,每一公里加价1元",
      updateTime: (
        <div>
          <div>创建:{value.createTime}</div>
          <div>更新:{value.updateTime}</div>
        </div>
      ),
      operate: <div></div>
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
    <div className="h-[100%] overflow-y-scroll">
      <Form onFinish={onFinish}>
        <div className="text-[24px]">计价规则列表</div>
        <div className="mt-[20px]">
          <Form.Item name="ruleName">
            <Input
              placeholder="规则名称"
              className="w-[200px] h-[40px] px-[11px] py-[4px]"
              ref={inputRef}
            />
          </Form.Item>
          <div className="flex items-center mt-[22px]">
            <Button className="w-[120px] h-[40px]">取消</Button>
            <Form.Item className="m-0">
              <Button
                type="primary"
                htmlType="submit"
                className="w-[120px] h-[40px] ml-[5px]"
              >
                搜索
              </Button>
            </Form.Item>
          </div>
        </div>
        <Divider />
        <div className="mb-[24px] flex justify-between">
          <Button type="primary" className="w-[120px] h-[40px]">
            添加计价规则
          </Button>
          <Button
            icon={<Icon icon="clarity:refresh-line" rotate={1} />}
            style={{ width: "40px", height: "40px", fontSize: "18px" }}
          />
        </div>
        <div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            bordered={true}
          />
        </div>
      </Form>
    </div>
  );
};

export default Valuations;
