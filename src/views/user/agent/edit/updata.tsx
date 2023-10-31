/* eslint-disable no-console */
import { type FC } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Form, Button, Radio, message } from "antd";
import styled from "styled-components";
import { putAdminAgentUpdata } from "@/service/api";

const Wrappers = styled.div`
  .ant-input {
    width: 500px !important;
  }
  .ant-row {
    display: block;
  }
  .ant-form-item-label {
    display: block;
  }
  .ant-form-item-control {
    display: block;
  }
  .ant-btn-primary {
    height: 40px !important;
    background-color: #955ce6;
    border-color: #955ce6;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
    color: #fff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  }
  .ant-col {
    display: flex;
  }
`;

const UpData: FC = () => {
  const navigate = useNavigate();
  const params = useParams(); // 获取路由参数
  // const searchParams = new URLSearchParams(location.search); 还可以用location.search来获取
  const searchParams = new URLSearchParams(params.id); // 使用路由参数中的 id 创建 URLSearchParams 对象,用URLSearchParams来获取路由url中的参数
  const UrlObj = Object.fromEntries(searchParams.entries()); // 将 URLSearchParams 对象转换为普通对象

  const agentUpData = (values: {
    agentAccount: string;
    agentNo: string;
    mobileNumber: string;
    realName: string;
    status: number;
  }) => {
    values.agentNo = UrlObj.agentNo; // 从 UrlObj 对象中获取 agentNo，并赋值给 values.agentNo
    const FromDate = values;
    FromDate.status = FromDate.status ?? Number(values.status); // 如果 FromDate.status 为 undefined，则将 values.status 转换为数字并赋值给 FromDate.status
    putAdminAgentUpdata(FromDate) // 调用并传递 FromDate 对象作为参数
      .then((res: any) =>
        res.data.code === 200
          ? message.success(res.data.msg)
          : message.error(res.data.msg)
      )
      .catch((err) => {
        console.log(err);
      });
    navigate(-1);
  };
  return (
    <Wrappers>
      <div className="p-[20px]">
        {/* 修改代理 */}
        <div className="px-[24px] flex items-center py-[16px] text-[20px] text-[#333] font-semibold leading-[32px]">
          <Icon
            icon="ph:arrow-left"
            className="my-[8px] mr-[16px] cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          />
          <div>修改代理</div>
        </div>
        {/* 表单 */}
        <div className="w-[600px] px-[50px]">
          <Form
            name="control-ref"
            onFinish={agentUpData}
            initialValues={UrlObj}
          >
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
    </Wrappers>
  );
};
export default UpData;
