/* eslint-disable no-console */
import { type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { Icon } from "@iconify/react";

const Chat: FC = () => {
  const { id } = useParams();
  const name = id?.slice(16);
  const navigate = useNavigate();

  return (
    <>
      <div className="p-[20px]">
        {/* 标题 */}
        <div className="flex items-center px-[24px] py-[16px] font-[500]">
          <Icon
            onClick={() => {
              navigate(-1);
            }}
            icon="ep:back"
            className="mr-[16px] text-[16px] cursor-pointer"
          />
          <p>{name}生成群聊</p>
        </div>

        {/* 表单部分 */}
        <div className="w-[600px] px-[50px] mt-[25px]">
          <Form layout="vertical">
            <Form.Item
              label="群拥有者(userid):"
              required={true}
              rules={[{ required: true, message: "请输入群拥有者" }]}
            >
              <Input
                placeholder="群拥有者(userid)"
                className="w-[500px] h-[40px]"
              />
            </Form.Item>
            <Form.Item
              label="成员2(userid):"
              required={true}
              rules={[{ required: true, message: "请输入成员2" }]}
            >
              <Input
                placeholder="成员2(userid)"
                className="w-[500px] h-[40px]"
              />
            </Form.Item>
            <Form.Item
              label="成员3(userid):"
              required={true}
              rules={[{ required: true, message: "请输入成员3" }]}
            >
              <Input
                placeholder="成员3(userid)"
                className="w-[500px] h-[40px]"
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-[87px] h-[40px]"
            >
              提交保存
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Chat;
