import { type FC } from "react";
import { Icon } from "@iconify/react";
import { InputNumber, Form, Space, Cascader, Button, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
  .changeColor:hover {
    color: "rgb(149,92,230)";
  }
`;

const Add: FC = () => {
  const Navigate = useNavigate();
  // 运营城市数据
  const options = [
    {
      value: "zhejiang",
      label: "Zhejiang",
      children: [
        {
          value: "hangzhou",
          label: "Hangzhou",
          children: [
            {
              value: "xihu",
              label: "West Lake"
            }
          ]
        }
      ]
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      children: [
        {
          value: "nanjing",
          label: "Nanjing",
          children: [
            {
              value: "zhonghuamen",
              label: "Zhong Hua Men"
            }
          ]
        }
      ]
    }
  ];
  return (
    <Div className="h-[100%] lastBox overflow-y-auto overflow-x-hidden text-[#333]">
      <div
        className="flex items-center my-[16px] px-[24px] box-border"
        onClick={() => {
          Navigate("/city/citys");
        }}
      >
        <Icon icon="maki:arrow" rotate={2} width={16} className="changeColor" />
        <h1 className="ml-[16px] text-[20px]">新增城市</h1>
      </div>
      <Form
        name="control-hooks"
        layout="vertical"
        style={{ maxWidth: 600, padding: "0px 50px" }}
      >
        <Form.Item
          name="note"
          label="运营城市"
          rules={[{ required: true }]}
          className="mt-[26px]"
        >
          <Cascader
            options={options}
            className="w-[500px] h-[40px] rounded-[4px]"
          />
        </Form.Item>
        <div className="leading-[40px] text-[14px]">平台抽成：</div>
        <Space>
          <Form.Item name="gender1" label="帮我送" className="leading-[30px]">
            <InputNumber
              min={1}
              max={10}
              defaultValue={0.0}
              className="w-[150px] h-[38px]"
              style={{ borderRadius: "4px", marginRight: "12px" }}
            />
          </Form.Item>
          <Form.Item name="gender2" label="帮我取" className="leading-[30px]">
            <InputNumber
              min={1}
              max={10}
              defaultValue={0.0}
              className="w-[150px] h-[38px]"
              style={{ borderRadius: "4px", marginRight: "12px" }}
            />
          </Form.Item>
          <Form.Item name="gender3" label="帮我买" className="leading-[30px]">
            <InputNumber
              min={1}
              max={10}
              defaultValue={0.0}
              className="w-[150px] h-[38px]"
              style={{ borderRadius: "4px" }}
            />
          </Form.Item>
        </Space>
        <p className="text-[14px] text-[#999] mt-[-14px]">输入小于1的数值</p>
        <div className="leading-[40px] text-[14px] mt-[30px]">代理抽成：</div>
        <Space>
          <Form.Item name="gender1" label="帮我送" className="leading-[30px]">
            <InputNumber
              min={1}
              max={10}
              defaultValue={0.0}
              className="w-[150px] h-[38px]"
              style={{ borderRadius: "4px", marginRight: "12px" }}
            />
          </Form.Item>
          <Form.Item name="gender2" label="帮我取" className="leading-[30px]">
            <InputNumber
              min={1}
              max={10}
              defaultValue={0.0}
              className="w-[150px] h-[38px]"
              style={{ borderRadius: "4px", marginRight: "12px" }}
            />
          </Form.Item>
          <Form.Item name="gender3" label="帮我买" className="leading-[30px]">
            <InputNumber
              min={1}
              max={10}
              defaultValue={0.0}
              className="w-[150px] h-[38px]"
              style={{ borderRadius: "4px" }}
            />
          </Form.Item>
        </Space>
        <p className="text-[14px] text-[#999] mt-[-14px]">输入小于1的数值</p>
        <Form.Item
          name="gender1"
          label="起步价："
          className="leading-[30px] mt-[30px]"
        >
          <InputNumber
            min={1}
            max={10}
            defaultValue={0.0}
            className="w-[88.8px] h-[38px]"
            style={{ borderRadius: "4px" }}
          />
        </Form.Item>
        <Form.Item name="note" label="计价规则：" className="mt-[30px]">
          <Cascader
            options={options}
            className="w-[500px] h-[40px] rounded-[4px]"
          />
        </Form.Item>
        <Form.Item name="note" label="重量标签：" className="mt-[30px]">
          <Cascader
            options={options}
            className="w-[500px] h-[40px] rounded-[4px]"
          />
        </Form.Item>
        <Form.Item name="note" label="物理标签组：" className="mt-[30px]">
          <Cascader
            options={options}
            className="w-[500px] h-[40px] rounded-[4px]"
          />
        </Form.Item>
        <Form.Item name="note" label="代理人：" className="mt-[30px]">
          <Cascader
            options={options}
            className="w-[500px] h-[40px] rounded-[4px]"
          />
          <p className="text-[#999] text-[14px] leading-[40px]">
            输入姓名搜索并选择
          </p>
        </Form.Item>
        <Form.Item>
          <div className=" h-[40px] flex items-center text-[14px]">
            运营状态
          </div>
          <Radio.Group className=" h-[40px] flex items-center">
            <Radio value={true}>开启</Radio>
            <Radio value={false}>关闭</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="note" className="mt-[30px]">
          <Button type="primary" className="w-[88px] h-[40px] rounded-[4px]">
            提交保存
          </Button>
        </Form.Item>
      </Form>
    </Div>
  );
};

export default Add;
