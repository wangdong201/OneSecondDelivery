import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Radio, Button, message } from "antd";
import { Icon } from "@iconify/react";
import { postAdminAgentAdd } from "@/service/api";

const Add: FC = () => {
  const navigate = useNavigate();
  // 添加代理
  const AddAgent = (value: {
    agentAccount: string;
    mobileNumber: string;
    realName: string;
    status: number;
  }) => {
    void postAdminAgentAdd(value)
      .then((res) => {
        if (res.data?.code === 200) {
          void message.success("添加成功");
        }
      })
      .catch(() => {
        void message.error("添加失败");
      });
  };
  return (
    <>
      <div className="p-[20px]">
        {/* 添加代理 */}
        <div className="px-[24px] flex items-center py-[16px] text-[20px] text-[#333] font-semibold leading-[32px]">
          <Icon
            icon="ph:arrow-left"
            className="my-[8px] mr-[16px] cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          />
          <div>添加代理</div>
        </div>
        {/* 表单 */}
        <div className="w-[600px] px-[50px] text-[14px] text-[#333]">
          <Form layout="vertical" onFinish={AddAgent} name="basic">
            <Form.Item
              name="agentAccount"
              label="账户名称"
              required={true}
              rules={[{ required: true, message: "请输入登录账号" }]}
            >
              <Input
                placeholder="请输入账户名称"
                className="w-[500px] h-[40px]"
              />
            </Form.Item>
            <Form.Item
              name="realName"
              label="真实姓名"
              required={true}
              rules={[{ required: true, message: "请输入真实姓名" }]}
            >
              <Input
                placeholder="请输入真实姓名"
                className="w-[500px] h-[40px]"
              />
            </Form.Item>
            <Form.Item
              name="mobileNumber"
              label="手机号"
              required={true}
              rules={[{ required: true, message: "请输入手机号" }]}
            >
              <Input
                placeholder="请输入手机号"
                className="w-[500px] h-[40px]"
              />
            </Form.Item>
            <Form.Item label="是否启用" name="status">
              <Radio.Group defaultValue={0}>
                <Radio value={1}>启用</Radio>
                <Radio value={0}> 禁用 </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item className="mt-[12px] mtx">
              <Button
                type="primary"
                htmlType="submit"
                className="w-[87px] h-[40px]"
              >
                提交保存
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Add;
