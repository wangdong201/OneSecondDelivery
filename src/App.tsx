import { type FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import RouteConfig from "@/router/index";

const App: FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: "#955ce6" // 修改主题颜色
        }
      }}
    >
      <BrowserRouter>
        <RouteConfig />
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
