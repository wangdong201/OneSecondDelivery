import { type FC } from "react";
import { Tabs, type TabsProps } from "antd";
import styled from "styled-components";
import MyTemplates from "./components/myTemplates";
import PublicTemplate from "./components/publicTemplate";
import MessageSettings from "./components/messageSettings";

const Wrapper = styled.div`
  .ant-tabs-tab {
    padding: 12px 16px !important;
  }
  .ant-input {
    height: 40px !important;
  }
  a {
    color: #955ce6 !important;
  }
  .ant-btn {
    height: 40px !important;
  }
`;
const Wxsubscribe: FC = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "我的模板",
      children: <MyTemplates />
    },
    {
      key: "2",
      label: "公共模板",
      children: <PublicTemplate />
    },
    {
      key: "3",
      label: "消息设置",
      children: <MessageSettings />
    }
  ];
  return (
    <Wrapper className="overflow-y-auto h-[540px] lastBox">
      <h1 className="text-[24px]">订阅消息设置</h1>
      <Tabs animated defaultActiveKey="1" items={items} />
    </Wrapper>
  );
};

export default Wxsubscribe;
