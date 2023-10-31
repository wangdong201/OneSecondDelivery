/* eslint-disable no-console */
import { type FC } from "react";
import { Button, Form, Input, Space, message } from "antd";
import { ChangePassword } from "../../service/api";

const Pwd: FC = () => {
  const onFinish = (value: {
    adminPwd: string;
    confirmPwd: string;
    oldpwd: string;
  }) => {
    ChangePassword(value)
      .then((res) => {
        if (res.data.code === 200) {
          void message.success("修改密码成功");
        }
      })
      .catch(() => {
        void message.success("报错");
      });
  };
  return (
    <>
      <h1 className="text-[20px] px-[24px] py-[16px]">修改密码</h1>
      <Form
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        className="mx-[50px] mt-[10px]"
        onFinish={onFinish}
      >
        <Form.Item name="oldpwd" label="旧密码" rules={[{ required: true }]}>
          <Input
            className="w-[500px] h-[40px] rounded-[4px]"
            placeholder="请输入旧密码"
          />
        </Form.Item>
        <Form.Item
          name="adminPwd"
          label="新密码"
          rules={[{ required: true }]}
          className="mt-[20px]"
        >
          <Input
            className="w-[500px] h-[40px] rounded-[4px]"
            placeholder="请输入新密码"
          />
        </Form.Item>
        <Form.Item
          name="confirmPwd"
          label="确认密码"
          rules={[{ required: true }]}
          className="mt-[20px]"
        >
          <Input
            className="w-[500px] h-[40px] rounded-[4px]"
            placeholder="请确认密码"
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              className="h-[40px] px-[15px] rounded-[4px]"
            >
              提交保存
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default Pwd;
