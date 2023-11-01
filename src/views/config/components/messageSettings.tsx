import { type FC } from "react";
import { Button, Form, Select } from "antd";
import Sort from "./sort";

const MessageSettings: FC = () => {
  const orderForm = [
    {
      key: "1",
      name: "状态"
    },
    {
      key: "2",
      name: "订单号"
    },
    {
      key: "3",
      name: "服务类型(帮我送/帮我取/帮我买)"
    },
    {
      key: "4",
      name: "物品描述"
    },
    {
      key: "5",
      name: "创建时间"
    },
    {
      key: "6",
      name: "下单时间"
    }
  ];

  const auditing = [
    {
      key: "1",
      name: "审核时间"
    },
    {
      key: "2",
      name: "审核结果"
    },
    {
      key: "3",
      name: "拒绝理由"
    }
  ];
  return (
    <div>
      <div className="w-[500px] mx-auto pt-[80px]">
        <Form
          layout="vertical"
          style={{ maxWidth: 500 }}
          autoComplete="off"
          size="large"
        >
          {/* 用户订单通知 */}
          <Form.Item
            label="用户订单通知"
            name="userOrderNotification:"
            rules={[{ required: true }]}
          >
            <Select optionFilterProp="children" options={[]} />
          </Form.Item>
          <div className="mb-[30px]">
            <div className="text-[#999] text-[12px] mb-[8px]">
              请排列以下参数
            </div>
            <Sort data={orderForm}></Sort>
          </div>

          {/* 跑男审核通知 */}
          <Form.Item
            label="跑男审核通知"
            name="userOrderNotification:"
            rules={[{ required: true }]}
          >
            <Select optionFilterProp="children" options={[]} />
          </Form.Item>
          <div className="mb-[30px]">
            <div className="text-[#999] text-[12px] mb-[8px]">
              请排列以下参数
            </div>
            <Sort data={auditing}></Sort>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default MessageSettings;
