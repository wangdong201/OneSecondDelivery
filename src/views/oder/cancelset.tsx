/* eslint-disable no-console */
import { useEffect, type FC, useState } from "react";
import { Form, Button, InputNumber, Space, Input } from "antd";
import { Icon } from "@iconify/react";
import { configOrdercancel, postConfigOrdercancel } from "@/service/api";
import { useRequest } from "ahooks";
// import { configOrdercancel, postConfigOrdercancel } from "@/service/api";
// import { useRequest } from "ahooks";

const Cancelset: FC = () => {
  const [list, setList] = useState<Res.ResPonsedata>();
  const [form] = Form.useForm();
  useEffect(() => {
    configOrdercancel()
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { run } = useRequest(
    async (values: Req.ResPonsedata) => await postConfigOrdercancel(values),
    {
      manual: true
    }
  );
  useEffect(() => {
    form.setFieldsValue({
      userCancelRules: list?.data.userCancelRules,
      riderCancelRules: list?.data.riderCancelRules,
      userCancelTips: list?.data.userCancelTips,
      adminCancelTips: list?.data.adminCancelTips,
      agentCancelTips: list?.data.agentCancelTips,
      riderCancelTips: list?.data.riderCancelTips
    });
  }, [list]);
  return (
    <div className="w-[100%] h-[100%] overflow-auto" id="div">
      <div className="w-[100%] h-[36px] text-[#333333] text-[24px]">
        取消订单配置
      </div>
      <div className="w-[600px] h-auto mt-[20px] flex flex-col items-center">
        <Form className="w-[500px] h-auto mb-[24px]" onFinish={run} form={form}>
          <div className="w-[125.4px] h-[39.9px] text-[14px] flex items-center text-[#333333]">
            用户取消订单规则:
          </div>
          <div className="w-[100%] h-[40px] text-[12px] text-[#999999] flex items-center">
            用户在订单状态为【已接单、配送中】时取消订单会触发此规则
          </div>
          <Form.List name="userCancelRules">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    align="baseline"
                    className="w-[100%] h-[80.2px] flex items-center"
                  >
                    <div>
                      <div className="w-[285px] h-[40px] flex items-center">
                        时间范围(分钟)
                      </div>
                      <div className="w-[285px] h-[38px] flex">
                        <Form.Item {...restField} name={[name, "1"]}>
                          <InputNumber
                            defaultValue={3}
                            className="w-[128.4px] h-[100%] flex items-center"
                          />
                        </Form.Item>
                        <div className="h-[30px] mx-[5px]  flex justify-center items-center">
                          ~
                        </div>
                        <Form.Item {...restField} name={[name, "2"]}>
                          <InputNumber
                            defaultValue={3}
                            className="w-[128.4px] h-[100%] flex items-center"
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div>
                      <div className="w-[113px] h-[40px] flex items-center text-[14px] text-[#333333]">
                        超时费用比例:
                      </div>
                      <div className="w-[113px] h-[38px]">
                        <Form.Item {...restField} name={[name, "3"]}>
                          <InputNumber
                            defaultValue={0.1}
                            className="w-[88.4px] h-[100%] flex items-center"
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <Form.Item>
                      <div className="w-[54px] h-[80.2px] px-[8px] flex items-end">
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
                      </div>
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
          <div className="w-[125.4px] h-[39.9px] text-[14px] flex items-center text-[#333333]">
            骑手取消订单规则:
          </div>
          <div className="w-[100%] h-[40px] text-[12px] text-[#999999] flex items-center">
            骑手在订单状态为【已接单、配送中】时取消订单会触发此规则
          </div>
          <Form.List name="riderCancelRules">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    align="baseline"
                    className="w-[100%] h-[80.2px] flex items-center"
                  >
                    <div>
                      <div className="w-[285px] h-[40px] flex items-center">
                        时间范围(分钟)
                      </div>
                      <div className="w-[285px] h-[38px] flex">
                        <Form.Item {...restField} name={[name, "1"]}>
                          <InputNumber
                            defaultValue={3}
                            className="w-[128.4px] h-[100%] flex items-center"
                          />
                        </Form.Item>
                        <div className=" h-[30px] mx-[5px] flex justify-center items-center">
                          ~
                        </div>
                        <Form.Item {...restField} name={[name, "2"]}>
                          <InputNumber
                            defaultValue={6}
                            className="w-[128.4px] h-[100%] flex items-center"
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div>
                      <div className="w-[113px] h-[40px] flex items-center text-[14px] text-[#333333]">
                        超时费用比例:
                      </div>
                      <div className="w-[113px] h-[38px]">
                        <Form.Item {...restField} name={[name, "3"]}>
                          <InputNumber
                            defaultValue={0.1}
                            className="w-[88.4px] h-[100%] flex items-center"
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <Form.Item>
                      <div className="w-[54px] h-[80.2px] px-[8px] flex items-end">
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
                      </div>
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

          <div className="w-auto h-[39.9px] text-[14px] flex items-center text-[#333333]">
            用户取消订单选项配置:
          </div>
          <Form.List name="userCancelTips">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    align="baseline"
                    className="w-[100%] h-[45px] flex"
                  >
                    <Form.Item
                      {...restField}
                      name={[name]}
                      className="w-[475px] h-[40px] flex items-center"
                    >
                      <Input className="w-[457px] h-[40px] px-[11px] py-[4px]"></Input>
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
                          className=" text-[20px] text-[#ffffff]"
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
          <div className="w-auto h-[39.9px] text-[14px] flex items-center text-[#333333]">
            骑手取消订单选项配置:
          </div>
          <Form.List name="riderCancelTips">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    align="baseline"
                    className="w-[100%] h-[45px] flex"
                  >
                    <Form.Item
                      {...restField}
                      name={[name]}
                      className="w-[475px] h-[40px] flex items-center"
                    >
                      <Input className="w-[457px] h-[40px] px-[11px] py-[4px] "></Input>
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
          <div className="w-auto h-[39.9px] text-[14px] flex items-center text-[#333333]">
            管理员取消订单选项配置:
          </div>
          <Form.List name="adminCancelTips">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    align="baseline"
                    className="w-[100%] h-[45px] flex"
                  >
                    <Form.Item
                      {...restField}
                      name={[name]}
                      className="w-[475px] h-[40px] flex items-center"
                    >
                      <Input className="w-[457px] h-[40px] px-[11px] py-[4px] "></Input>
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
          <div className="w-auto h-[39.9px] text-[14px] flex items-center text-[#333333]">
            代理取消订单选项配置:
          </div>
          <Form.List name="agentCancelTips">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    align="baseline"
                    className="w-[100%] h-[45px] flex"
                  >
                    <Form.Item
                      {...restField}
                      name={[name]}
                      className="w-[475px] h-[40px] flex items-center"
                    >
                      <Input className="w-[457px] h-[40px] px-[11px] py-[4px] "></Input>
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
          <div className="w-[500px] h-[40px]">
            <Button
              className="w-[87.6px] h-[100%] rounded-[5px]"
              type="primary"
              htmlType="submit"
            >
              提交保存
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Cancelset;
