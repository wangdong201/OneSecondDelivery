/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-console */
import { useEffect, type FC, useState } from "react";
import { Form, Button, Space, InputNumber } from "antd";
import { Icon } from "@iconify/react";
import { configOrderfee, postConfigOrderfee } from "@/service/api";
import { useRequest } from "ahooks";

const Feeset: FC = () => {
  const [list, setlist] = useState<Res.ResPonseData>();
  const [form] = Form.useForm();
  useEffect(() => {
    configOrderfee()
      .then((res) => {
        console.log(res.data.data);
        setlist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { run } = useRequest(
    async (values: Req.ResponseData) => await postConfigOrderfee(values),
    {
      manual: true
    }
  );
  useEffect(() => {
    form.setFieldsValue({
      feeTips: list?.data.feeTips,
      platformExtract: list?.data.platformExtract,
      agentExtract: list?.data.agentExtract
    });
  }, [list]);
  return (
    <div className="w-[100%] h-[100%] overflow-auto" id="div">
      <div className="w-[100%] h-[36px] text-[#333333] text-[24px]">
        小费配置
      </div>
      <div className="w-[600px] h-auto px-[50px] mt-[20px]">
        <Form className="w-[500px] h-auto mb-[24px]" onFinish={run} form={form}>
          <div className="w-auto h-[39.9px] text-[14px] flex items-center text-[#333333]">
            小程序端展示的小费选项:
          </div>
          <Form.List name="feeTips">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    align="baseline"
                    className="w-[100%] h-[50px] flex"
                  >
                    <Form.Item
                      {...restField}
                      name={[name]}
                      className="w-[457px] h-[40px] flex items-center"
                    >
                      <InputNumber
                        className="w-[457px] h-[40px] px-[11px] py-[4px] text-[#ffffff]"
                        defaultValue={0}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        className="bg-[#ff4D4F]  w-[32px] h-[32px] rounded-[50%] p-0 flex items-center justify-center"
                        onClick={() => {
                          remove(name);
                        }}
                      >
                        <Icon
                          icon="ant-design:delete-outlined"
                          className="text-[#ffffff] text-[20px]"
                        />
                      </Button>
                    </Form.Item>
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    onClick={() => {
                      add();
                    }}
                    className="w-[101.01px] h-[40px] px-[15px] py-[0px] mt-[15px]"
                  >
                    +添加一项
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <div className="w-[69px] h-[40px] text-[14px] text-[#333333] flex items-center">
            平台抽成
          </div>
          <Form.Item name="platformExtract">
            <InputNumber
              className="w-[498.4px] h-[38px] flex items-center"
              defaultValue={0}
            />
          </Form.Item>
          <div className="w-[69px] h-[40px] text-[14px] text-[#333333] flex items-center">
            代理抽成
          </div>
          <Form.Item name="agentExtract">
            <InputNumber
              className="w-[498.4px] h-[38px] flex items-center"
              defaultValue={0}
            />
          </Form.Item>
          <Form.Item>
            <div className="w-[500px] h-[40px]">
              <Button
                className="w-[87.6px] h-[100%] rounded-[5px]"
                type="primary"
                htmlType="submit"
              >
                提交保存
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Feeset;
