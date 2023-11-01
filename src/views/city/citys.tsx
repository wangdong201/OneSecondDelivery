/* eslint-disable no-console */
import { type FC } from "react";
import { Button, Form, Input, Select, Space, Tag, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { cityManagementList } from "../../service/api";
import { useRequest } from "ahooks";

interface DataType {
  key: number;
  number: React.ReactElement;
  city: string;
  price: string;
  platform: string;
  agency: string;
  agencyP: React.ReactElement;
  tags: string[];
  time: React.ReactElement;
  controls: React.ReactElement;
}

const columns: ColumnsType<DataType> = [
  {
    title: "编号",
    dataIndex: "number",
    key: "number"
  },
  {
    title: "城市",
    dataIndex: "city",
    key: "city"
  },
  {
    title: "起步价",
    dataIndex: "price",
    key: "price"
  },
  {
    title: "平台抽成",
    dataIndex: "platform",
    key: "platform"
  },
  {
    title: "代理抽成",
    dataIndex: "agency",
    key: "agency"
  },
  {
    title: "代理人",
    dataIndex: "agencyP",
    key: "aagencyP"
  },
  {
    title: "状态",
    key: "status",
    dataIndex: "status",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "禁用") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    )
  },
  {
    title: "时间",
    dataIndex: "time",
    key: "time"
  },
  {
    title: "操作",
    dataIndex: "controls",
    key: "controls"
  }
];

const rowSelection = {
  getCheckboxProps: (record: DataType) => ({
    disabled: record.city === "Disabled User", // Column configuration not to be checked
    name: record.city
  })
};
const { Option } = Select;
const Citys: FC = () => {
  const Navigate = useNavigate();
  // 城市列表数据
  const { data: cityList } = useRequest(
    async () => await cityManagementList({ current: 1, pageSize: 20 })
  );
  console.log(cityList?.data.data.data);

  const data = cityList?.data.data.data.map((res) => {
    return {
      key: res.id,
      number: (
        <div>
          <div>{res.cityNo}</div>
          <a className="text-[rgb(149,92,230)]">【计价规则】</a>
        </div>
      ),
      city: `${res.province}-${res.cityName}`,
      price: `${res.startPrice}元`,
      platform: `送${(res.extractHelpDeliver * 100).toFixed(0)}%|取${(
        res.extractHelpGet * 100
      ).toFixed(0)}%|买${(res.extractHelpBuy * 100).toFixed(0)}%`,
      agency: `送${(res.extractHelpDeliverForAgent * 100).toFixed(0)}%|取${(
        res.extractHelpGetForAgent * 100
      ).toFixed(0)}%|买${(res.extractHelpBuyForAgent * 100).toFixed(0)}%`,
      agencyP: (
        <Icon icon="ion:people-sharp" color="rgb(149,92,230)" width={20} />
      ),
      tags: ["禁用"],
      time: (
        <div>
          <p>
            创建: <span>{new Date(res.createTime).toLocaleString()}</span>
          </p>
          <p>
            更新: <span>{new Date(res.updateTime).toLocaleString()}</span>
          </p>
        </div>
      ),
      controls: (
        <div>
          <Icon icon="fa6-solid:user-gear" color="rgb(149,92,230)" />
          <Select placeholder="状态：全部" className="w-[100px]">
            <Option value="10">修改</Option>
            <Option value="1">启用</Option>
            <Option value="0">禁用</Option>
          </Select>
        </div>
      )
    };
  });
  return (
    <div className="text-[#333] h-[100%] lastBox overflow-y-auto overflow-x-hidden">
      <h1 className="text-[24px] font-[500] mb-[25px]">运营城市列表</h1>
      {/* 搜索 */}
      <Form name="basic" style={{ maxWidth: 600 }} autoComplete="off">
        <Space>
          <Form.Item name="username">
            <Input
              placeholder="城市编号"
              style={{ width: "200px", height: "40px", borderRadius: "4px" }}
            />
          </Form.Item>
          <Form.Item name="password">
            <Input
              placeholder="省/直辖市/自治区"
              style={{ width: "200px", height: "40px", borderRadius: "4px" }}
            />
          </Form.Item>
          <Form.Item name="password">
            <Input
              placeholder="城市名称"
              style={{ width: "200px", height: "40px", borderRadius: "4px" }}
            />
          </Form.Item>
          <Form.Item name="remember">
            <Select
              placeholder="状态"
              style={{ width: 200, height: "40px", borderRadius: "4px" }}
              options={[
                { value: "全部", label: "状态: 全部" },
                { value: "启用", label: "状态: 启用" },
                { value: "禁用", label: "状态: 禁用" }
              ]}
            />
          </Form.Item>
        </Space>
        <Space className="mt-[-6px]">
          <Form.Item>
            <Button
              htmlType="reset"
              style={{ width: 120, height: 40, borderRadius: "4px" }}
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
            Navigate("/city/edit/add");
          }}
        >
          添加运营城市
        </Button>
        <Table
          rowSelection={{
            ...rowSelection
          }}
          columns={columns}
          dataSource={data}
          bordered
          className="text-[#333]"
        />
      </div>
    </div>
  );
};

export default Citys;
