/* eslint-disable no-console */
import { type FC, useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { Button, Input, Divider, Table, Tooltip, Dropdown, Form } from "antd";
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

  // 搜索
  const inputRef = useRef(null);
  const onFinish = (values: string | number) => {
    setSeek(values);
    // console.log(values);
  };

  const valuation = ValuationData?.data.data.data;
  // console.log(valuation);
  interface DataType {
    key: number;
    id: number;
    ruleName: string;
    distance: React.ReactElement;
    weight: React.ReactElement;
    timea: React.ReactElement;
    updateTime: React.ReactNode;
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
      render: (text: string, record: DataType) => (
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
                  label: (
                    <div>
                      <NavLink to={"/city/valuation/edit/update"}>修改</NavLink>
                    </div>
                  )
                },
                {
                  key: "2",
                  label: (
                    <div
                      onClick={() => {
                        deleteAdmin(record.id);
                        refresh();
                      }}
                    >
                      删除
                    </div>
                  )
                }
              ]
            }}
            className="w-[30px] h-[25px] ml-1"
          >
            <Button>
              <Icon icon="ri:more-fill" className="ml-[-7px]" />
            </Button>
          </Dropdown>
        </div>
      )
    }
  ];

  // 删除
  const deleteAdmin = (id: number) => {
    deleteAdminCitysValuationDel({ id })
      .then(() => {
        console.log("删除成功");
      })
      .catch(() => {
        console.log("删除失败");
      });
  };

  const data: DataType[] = [];
  valuation?.map((value, index) => {
    const distance = value.ruleContext.distance[0];
    const weight = value.ruleContext.weight[0];
    return data.push({
      key: index,
      id: value.id,
      ruleName: value.ruleName,
      distance: (
        <div>
          {distance === undefined
            ? null
            : `在${distance.gt}~${distance.lte}公里范围内,每${distance.unitDistance}公里加价${distance.price}元`}
        </div>
      ),
      weight: (
        <div>
          {weight === undefined
            ? null
            : `在${weight.gt}~${weight.lte}公里范围内,每${weight.unitWeight}公里加价${weight.price}元`}
        </div>
      ),
      timea: (
        <div>
          {weight === undefined
            ? null
            : `在${weight.gt}~${weight.lte}时间段内,加价${weight.unitWeight}元`}
        </div>
      ),
      updateTime: (
        <div>
          <div>创建:{new Date(value.createTime).toLocaleString()}</div>
          <div>更新:{new Date(value.updateTime).toLocaleString()}</div>
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
            <Button
              className="w-[120px] h-[40px]"
              onClick={() => {
                onFinish("");
                refresh();
              }}
            >
              取消
            </Button>
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
            <NavLink to={"/city/valuation/edit/add"}>添加计价规则</NavLink>
          </Button>
          <Button
            icon={<Icon icon="clarity:refresh-line" rotate={1} />}
            style={{ width: "40px", height: "40px", fontSize: "18px" }}
            onClick={() => {
              refresh();
            }}
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
