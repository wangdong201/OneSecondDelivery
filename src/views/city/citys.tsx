/* eslint-disable no-console */
import { type FC, useState, useEffect } from "react";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { cityManagementList, putAdminCitysStatus } from "../../service/api";
import { useRequest } from "ahooks";
import styled from "styled-components";
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  Dropdown
} from "antd";

const Wrapper = styled.div`
  /* .ant-select-selector,
  .ant-select-arrow {
    display: none !important;
  } */
`;

const Citys: FC = () => {
  // const { Option } = Select;
  const navigate = useNavigate();
  // 复选框
  const [selectionType] = useState<"checkbox" | "radio">("checkbox");
  const [currentPage, setCurrentPage] = useState(1);
  const [seachData, setSeachData] = useState({});

  // 城市列表数据
  const { data: cityList, refresh } = useRequest(
    async () =>
      await cityManagementList({
        current: currentPage,
        pageSize: 20,
        ...seachData
      })
  );
  // 页面刷新
  useEffect(() => {
    refresh();
  }, [currentPage, seachData]);

  // 数据类型
  interface DataType {
    id: number;
    createTime: string;
    updateTime: string;
    cityNo: string;
    cityName: string;
    province: string;
    agentNo: string;
    startPrice: number;
    extractHelpDeliver: number;
    extractHelpGet: number;
    extractHelpBuy: number;
    extractHelpDeliverForAgent: number;
    extractHelpGetForAgent: number;
    extractHelpBuyForAgent: number;
    citysValuationId: number;
    citysWeightTagId: number;
    citysTagGroupId: number;
    status: number;
    corwxChatid: object;
    updatedBy: string;
  }

  // 表格头部以及内容
  const columns: ColumnsType<DataType> = [
    {
      title: "编号",
      dataIndex: "cityNo",
      render: (_, { cityNo }) => (
        <>
          <span>{cityNo}</span>
          <br />
          <span className="text-[#955CE6]">【计价规则】</span>
        </>
      )
    },
    {
      title: "城市",
      dataIndex: ["province", "cityName"],
      render: (_, { province, cityName }) => (
        <>
          <span>{province}-</span>
          <span>{cityName}</span>
        </>
      )
    },
    {
      title: "起步价",
      dataIndex: "startPrice"
    },
    {
      title: "平台抽成",
      dataIndex: ["extractHelpDeliver", "extractHelpGet", "extractHelpBuy"],
      render: (_, record) => (
        <>
          <span>
            送{formatPercentage(record.extractHelpDeliver)}|取
            {formatPercentage(record.extractHelpGet)}|买
            {formatPercentage(record.extractHelpBuy)}
          </span>
        </>
      )
    },
    {
      title: "代理抽成",
      dataIndex: "agency",
      render: (_, record) => (
        <>
          <span>
            送{formatPercentage(record.extractHelpDeliverForAgent)}|取
            {formatPercentage(record.extractHelpGetForAgent)}|买
            {formatPercentage(record.extractHelpBuyForAgent)}
          </span>
        </>
      )
    },
    {
      title: "代理人",
      dataIndex: "agentNo",
      render: (_, record) => (
        <>
          <Tooltip>
            <Tooltip title="代理人">
              <Icon
                icon="ion:people-outline"
                className="text-[#955CE6]"
                onClick={() => {
                  navigate(`/user/agent/agents/${record.agentNo}`);
                }}
              />
            </Tooltip>
          </Tooltip>
        </>
      )
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (text: number) => (
        <Tag color={`${text === 0 ? "error" : text === 1 ? "success" : ""}`}>
          {text === 1 ? "启用" : "禁用"}
        </Tag>
      )
    },
    {
      title: "时间",
      dataIndex: ["createTime", "updateTime"],
      render: (text: string, { createTime, updateTime }) => (
        <>
          <span>创建:{time(createTime)}</span>
          <span>更新:{time(updateTime)}</span>
        </>
      )
    },
    {
      title: "操作",
      dataIndex: "status",
      render: (_, record) => (
        <div className="flex items-center">
          <Tooltip>
            <Tooltip title="操作人">
              <Icon icon="fa6-solid:user-gear" color="#955CE6" width="18" />
            </Tooltip>
          </Tooltip>
          <Dropdown
            menu={{
              items: [
                {
                  key: "",
                  label: (
                    <div
                      onClick={() => {
                        navigate("/city/edit/chat");
                      }}
                    >
                      创建群聊
                    </div>
                  )
                },
                {
                  key: "2",
                  label: (
                    <div
                      onClick={() => {
                        navigate(
                          `/city/edit/update/id=${record.id}&createTime=${record.createTime}&updateTime=${record.updateTime}&cityNo=${record.cityNo}&cityName=${record.cityName}&province=${record.province}&agentNo=${record.agentNo}&startPrice=${record.startPrice}&extractHelpDeliver=${record.extractHelpDeliver}&extractHelpGet=${record.extractHelpGet}&extractHelpBuy=${record.extractHelpBuy}&extractHelpDeliverForAgent=${record.extractHelpDeliverForAgent}&extractHelpGetForAgent=${record.extractHelpGetForAgent}&extractHelpBuyForAgent=${record.extractHelpBuyForAgent}&citysValuationId=${record.citysValuationId}&citysWeightTagId=${record.citysWeightTagId}&citysTagGroupId=${record.citysTagGroupId}&status=${record.status}&updatedBy=${record.updatedBy}`
                        );
                      }}
                    >
                      修改
                    </div>
                  )
                },
                {
                  key: "3",
                  label: (
                    <div
                      onClick={() => {
                        cityStatusFn(record.cityNo, "1");
                      }}
                    >
                      启用
                    </div>
                  ),
                  disabled: record.status === 1
                },
                {
                  key: "4",
                  label: (
                    <div
                      onClick={() => {
                        cityStatusFn(record.cityNo, "0");
                      }}
                    >
                      禁用
                    </div>
                  ),
                  disabled: record.status === 0
                }
              ]
            }}
            placement="bottom"
          >
            <Button className="h-[24px] w-[31.6px] px-[7px] border-[#955ce6] ml-[5px] flex items-center">
              <Icon icon="iconoir:more-horiz" color="#955CE6" width="30" />
            </Button>
          </Dropdown>
        </div>
      )
    }
  ];

  // 禁用启用
  const cityStatusFn = (cityNo: string, status: string) => {
    putAdminCitysStatus({ cityNo, status }).catch(() => {});
    refresh();
  };

  // 搜索
  const searchFn = (value: string) => {
    setSeachData(value);
  };

  // 百分比转换函数
  function formatPercentage(number: number): string {
    const percentage = (number * 100).toFixed(0);
    return `${percentage}%`;
  }
  // 时间转换函数
  function time(time: any) {
    const dateObj = new Date(time);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const hours = String(dateObj.getUTCHours() + 8).padStart(2, "0");
    const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");
    const TimeData = `${year}/${month}/${day} ${hours}:${minutes}`;
    return TimeData;
  }
  return (
    <Wrapper className="h-[100%] lastBox overflow-y-auto overflow-x-hidden">
      <div className="text-[#333]">
        <h1 className="text-[24px] font-[500] mb-[25px]">运营城市列表</h1>
        {/* 搜索 */}
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          autoComplete="off"
          onFinish={searchFn}
        >
          <Space>
            <Form.Item name="cityNo">
              <Input
                placeholder="城市编号"
                style={{ width: "200px", height: "40px", borderRadius: "4px" }}
              />
            </Form.Item>
            <Form.Item name="province">
              <Input
                placeholder="省/直辖市/自治区"
                style={{ width: "200px", height: "40px", borderRadius: "4px" }}
              />
            </Form.Item>
            <Form.Item name="cityName">
              <Input
                placeholder="城市名称"
                style={{ width: "200px", height: "40px", borderRadius: "4px" }}
              />
            </Form.Item>
            <Form.Item name="status">
              <Select
                placeholder="状态"
                style={{ width: 200, height: "40px", borderRadius: "4px" }}
                options={[
                  { value: null, label: "状态: 全部" },
                  { value: "1", label: "状态: 启用" },
                  { value: "0", label: "状态: 禁用" }
                ]}
              />
            </Form.Item>
          </Space>
          <Space className="mt-[-6px]">
            <Form.Item>
              <Button
                htmlType="reset"
                style={{ width: 120, height: 40, borderRadius: "4px" }}
                onClick={() => {
                  setSeachData("");
                }}
              >
                取消
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: 120, height: 40, borderRadius: "4px" }}
              >
                搜索
              </Button>
            </Form.Item>
          </Space>
        </Form>
        {/* 城市列表 */}
        <div className="w-[100%]" style={{ borderTop: "1px solid #e8e8e8" }}>
          <Button
            type="primary"
            htmlType="button"
            className="w-[120px] h-[40px] my-[24px]"
            style={{ borderRadius: "4px" }}
            onClick={() => {
              navigate("/city/edit/add");
            }}
          >
            添加运营城市
          </Button>
          <Table
            rowSelection={{
              type: selectionType
            }}
            columns={columns}
            dataSource={cityList?.data.data.data.map((item, index) => ({
              ...item,
              key: index // 使用数组索引作为key值
            }))}
            bordered={true}
            pagination={{
              pageSize: 20,
              showQuickJumper: true,
              showSizeChanger: true,
              total: cityList?.data.data.count,
              showTotal: (total) => `共 ${total} 条数据`,
              onChange: (page) => {
                setCurrentPage(page);
              }
            }}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Citys;
