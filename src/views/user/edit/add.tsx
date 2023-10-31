import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { postAdminAdd } from "@/service/api";
import { Icon } from "@iconify/react";

const AddAdmin: FC = () => {
  const navigate = useNavigate();
  // 新增管理员
  const onFinish = (value: {
    adminName: string;
    mobileNumber: string;
    realName: string;
  }) => {
    postAdminAdd(value)
      .then((res) => {
        if (res.data.code === 200) {
          void message.success("新增管理员成功");
        } else {
          void message.error("新增管理员失败");
        }
      })
      .catch((err) => {
        void message.error(err.data.msg);
      });
  };
  return (
    <>
      <div className="p-[20px]">
        {/* 新增管理 */}
        <div className="px-[24px] flex items-center py-[16px] text-[20px] text-[#333] font-semibold leading-[32px]">
          <Icon
            icon="ph:arrow-left"
            className="my-[8px] mr-[16px] cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          />
          <div>新增管理员</div>
        </div>
        {/* 表单 */}
        <div className="w-[600px] px-[50px] text-[14px] text-[#333]">
          <Form layout="vertical" onFinish={onFinish} name="basic">
            <Form.Item
              name="adminName"
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
export default AddAdmin;
