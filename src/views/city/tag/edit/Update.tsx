import { Icon } from "@iconify/react";
import { Button, Form, Input } from "antd";
import { type FC } from "react";
import { NavLink } from "react-router-dom";

const Update: FC = () => {
  return (
    <div className="h-[100%] overflow-y-auto">
      <div className="px-[24px] flex items-center">
        <NavLink to={"/city/tag/tag"}>
          <Icon
            icon="mdi:arrow-left"
            className="text-black text-[22px] mr-[15px]"
          />
        </NavLink>
        <h3 className="text-[22px]">新增计价规则</h3>
      </div>
      <div className="mt-[20px] px-[50px]">
        <Form layout="vertical">
          <div className="mb-[30px]">
            <Form.Item name="groupName" label="物品标签组名称：">
              <Input
                placeholder="请输入物品标签组名称"
                className="w-[500px] h-[40px] px-[11px] py-[4px]"
              />
            </Form.Item>
          </div>
          <div className="mb-[30px]">
            <Form.Item name="tags" label="标签" rules={[{ required: true }]}>
              <Input className="w-[500px] h-[40px] px-[11px] py-[4px]" />
            </Form.Item>
          </div>
          <Button type="primary" className="w-[85px] h-[40px] ml-[5px]">
            提交保存
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Update;
