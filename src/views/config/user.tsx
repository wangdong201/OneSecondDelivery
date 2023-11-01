/* eslint-disable no-console */
import { useEffect, type FC, useState } from "react";
import TextEditor from "./components/textEditor";
import {
  getAdminConfigGuideUser,
  postAdminConfigGuideUser
} from "@/service/api";
import { useRequest } from "ahooks";
import { Button } from "antd";

const User: FC = () => {
  // 请求数据
  const { data: ConfigGuideUserData } = useRequest(
    async () => await getAdminConfigGuideUser()
  );
  // 初始化 content 状态变量
  const [content, setContent] = useState<string | undefined>(
    ConfigGuideUserData?.data.data.content
  );
  useEffect(() => {
    if (ConfigGuideUserData !== null) {
      setContent(ConfigGuideUserData?.data.data.content);
    }
  }, [ConfigGuideUserData]);

  // 修改用户指南数据
  const { run: runUserGuide } = useRequest(
    async (con) => await postAdminConfigGuideUser(con),
    { manual: true }
  );

  const handleSubmit = () => {
    runUserGuide({ content });
  };
  return (
    <>
      <div className="overflow-y-auto h-[540px] lastBox">
        <div className="text-[24px] font-[500]">用户指南</div>
        <div className="mt-[20px] w-[600px]">
          <TextEditor
            // 传递 参数
            content={content!}
            // 传递 修改参数的函数
            onModifyTextContent={setContent}
          />
        </div>
        <div>
          <Button
            type="primary"
            htmlType="submit"
            className="w-[120px] h-[40px] mt-[10px]"
            onClick={handleSubmit}
          >
            提交保存
          </Button>
        </div>
      </div>
    </>
  );
};

export default User;
