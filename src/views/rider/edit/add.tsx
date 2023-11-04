import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Input, Form, Button, Radio, Upload } from "antd";
import styled from "styled-components";

const Wrappers = styled.div`
  .ant-input {
    width: 500px !important;
  }

  .ant-btn-primary {
    height: 40px !important;
    background-color: #955ce6;
    border-color: #955ce6;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
    color: #fff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  }
  .inpt .ant-input {
    width: 436px !important;
    height: 40px !important;
  }
`;
const Add: FC = () => {
  const navigate = useNavigate();
  const { Search } = Input;
  const [form] = Form.useForm();
  const onFinish = (values: any) => {};
  return (
    <Wrappers className="overflow-y-auto h-[540px] lastBox">
      <div className="p-[20px]">
        {/* 新增骑手 */}
        <div className="px-[24px] flex items-center py-[16px] text-[20px] text-[#333] font-semibold leading-[32px]">
          <Icon
            icon="ph:arrow-left"
            className="my-[8px] mr-[16px] cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          />
          <div>新增骑手</div>
        </div>
        {/* 表单 */}
        <div className="w-[600px] px-[50px]">
          <Form
            name="control-ref"
            onFinish={onFinish}
            form={form}
            layout="vertical"
          >
            <Form.Item
              name="adminName"
              label="用户"
              required={true}
              rules={[
                { required: true, message: "请输入用户名" },
                {
                  pattern: /(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}/,
                  message: "电话号码不合法"
                }
              ]}
            >
              <Search
                placeholder="输入用户手机号查询"
                enterButton="查询"
                style={{ width: "180px" }}
                className="inpt mb-[40px]"
              />
            </Form.Item>
            <Form.Item name="realName" label="真实姓名" required={true}>
              <Input
                placeholder="请输入真实姓名"
                className="w-[500px] h-[40px]"
              />
            </Form.Item>
            <Form.Item
              name="mobileNumber"
              label="身份证号码"
              required={true}
              rules={[
                {
                  required: true,
                  message: "请输入身份证号码"
                },
                { pattern: /\d{17}[0-9Xx]|\d{15}/, message: "身份证不合法" }
              ]}
            >
              <Input placeholder="身份证号码" className="w-[500px] h-[40px]" />
            </Form.Item>
            <Form.Item
              label="上传身份头像面照片"
              required={true}
              rules={[{ required: true, message: "请上传身份头像面照片" }]}
              className="mt-[12px] mtx"
            >
              <Upload showUploadList={false}>
                <div className="w-[200px] h-[120px] transition-all flex justify-center items-center cursor-pointer hover:border hover:border-[#955ce6]  bg-[#f3f3f3]  border border-[#e1e1e1] ">
                  <Icon
                    icon="bi:image"
                    hFlip={true}
                    className="text-[25px] text-[#999] hover:text-[#955ce6]"
                  />
                </div>
              </Upload>
              <div className="text-[12px] text-[#999]">
                上传格式:jpg,jpeg,png,webp{" "}
              </div>
              <div className="text-[12px] text-[#999]">最大限制2MB</div>
            </Form.Item>
            <Form.Item
              label="上传身份国徽面照片"
              required={true}
              rules={[{ required: true, message: "请上传身份国徽面照片" }]}
              className="mt-[12px] mtx"
            >
              <Upload showUploadList={false}>
                <div className="w-[200px] h-[120px] transition-all flex justify-center items-center cursor-pointer hover:border hover:border-[#955ce6]  bg-[#f3f3f3]  border border-[#e1e1e1] ">
                  <Icon
                    icon="bi:image"
                    hFlip={true}
                    className="text-[25px] text-[#999] hover:text-[#955ce6]"
                  />
                </div>
              </Upload>
              <div className="text-[12px] text-[#999]">
                上传格式:jpg,jpeg,png,webp{" "}
              </div>
              <div className="text-[12px] text-[#999]">最大限制2MB</div>
            </Form.Item>
            <Form.Item label="状态" name="status">
              <Radio.Group>
                <Radio value={1}>通过审核</Radio>
                <Radio value={0}> 待审核 </Radio>
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
export default Add;
