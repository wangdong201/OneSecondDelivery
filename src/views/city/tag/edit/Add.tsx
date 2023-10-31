import { Icon } from "@iconify/react";
import { Button, Input } from "antd";
import { type FC } from "react";
import { NavLink } from "react-router-dom";

const Add: FC = () => {
  return (
    <div className="h-[100%] overflow-y-auto">
      <div className="px-[24px] flex items-center">
        <NavLink to={""}>
          <Icon
            icon="mdi:arrow-left"
            className="text-black text-[22px] mr-[15px]"
          />
        </NavLink>
        <h3 className="text-[22px]">新增计价规则</h3>
      </div>
      <div className="px-[50px]">
        <div className="mb-[30px]">
          <p>物品标签组名称：</p>
          <Input
            placeholder="请输入物品标签组名称"
            className="w-[500px] h-[40px] px-[11px] py-[4px]"
          />
        </div>
        <div className="mb-[30px]">
          <p>
            <span className="text-[red] mr-[5px]">*</span>标签：
          </p>
          <Input className="w-[500px] h-[40px] px-[11px] py-[4px]" />
        </div>
        <Button type="primary" className="w-[85px] h-[40px] ml-[5px]">
          提交保存
        </Button>
      </div>
    </div>
  );
};

export default Add;
