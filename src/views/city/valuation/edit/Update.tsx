import { Icon } from "@iconify/react";
import { Button, Input, Form, Space, InputNumber, TimePicker } from "antd";
import dayjs from "dayjs";
import { type FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Add: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[100%] overflow-y-auto">
      <div className="px-[24px] flex items-center">
        <NavLink to={"/city/valuation/valuations"}>
          <Icon
            icon="mdi:arrow-left"
            className="text-black text-[22px] mr-[15px]"
            onClick={() => {
              navigate(-1);
            }}
          />
        </NavLink>
        <h3 className="text-[22px]">新增计价规则</h3>
      </div>
      <div className="mt-[30px] px-[50px] w-[500px]">
        <Form layout="vertical">
          <Form.Item
            name="ruleName"
            label="规则名称："
            rules={[{ required: true, message: "请输入规则名称" }]}
          >
            <Input
              placeholder="请输入规则名称"
              className="w-[500px] h-[40px] px-[11px] py-[4px]"
            />
          </Form.Item>
          <Form.List name="distance">
            {(fields, { add, remove }) => (
              <>
                <div>
                  <span className="text-[red]">*</span>距离规则:
                </div>
                <div>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key}>
                      <Space
                        key={key}
                        align="baseline"
                        className="my-[-18px] items-start"
                      >
                        <div>
                          <div>范围(km):</div>
                          <div className="flex">
                            <Form.Item {...restField} name={[name, "gt"]}>
                              <InputNumber
                                min={0}
                                defaultValue={1}
                                className="h-[38px] w-[88px] leading-[38px]"
                              />
                            </Form.Item>
                            ~
                            <Form.Item {...restField} name={[name, "lte"]}>
                              <InputNumber
                                min={0}
                                defaultValue={3}
                                className="h-[38px] w-[88px] leading-[38px]"
                              />
                            </Form.Item>
                          </div>
                        </div>
                        <div>
                          <div>距离单位(km):</div>
                          <Form.Item
                            {...restField}
                            name={[name, "unitDistance"]}
                          >
                            <InputNumber
                              min={0}
                              defaultValue={1}
                              className="h-[38px] w-[110px] leading-[38px]"
                            />
                          </Form.Item>
                        </div>
                        <div>
                          <div>价格(元):</div>
                          <Form.Item {...restField} name={[name, "price"]}>
                            <InputNumber
                              min={0}
                              defaultValue={1}
                              className="h-[38px] w-[110px] leading-[38px]"
                            />
                          </Form.Item>
                        </div>
                        <Button
                          onClick={() => {
                            remove(name);
                          }}
                          icon={<Icon icon="ant-design:delete-outlined" />}
                          className="w-[32px] h-[32px] ml-[5px] mt-[24px] bg-[red] text-white text-[24px] rounded-[50%] leading-[30px]"
                        />
                      </Space>
                      <div className="text-[#999999] mb-[15px]">
                        距离在(1km~3km)范围内，每1km加价1元
                      </div>
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      onClick={() => {
                        add();
                      }}
                      icon={<Icon icon="ic:baseline-plus" />}
                    >
                      添加距离规则
                    </Button>
                  </Form.Item>
                </div>
              </>
            )}
          </Form.List>
          <Form.List name="weight">
            {(fields, { add, remove }) => (
              <>
                <div>
                  <span className="text-[red]">*</span>重量规则：
                </div>
                <div>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key}>
                      <Space
                        key={key}
                        align="baseline"
                        className="my-[-18px] items-start"
                      >
                        <div>
                          <div>范围(km):</div>
                          <div className="flex">
                            <Form.Item {...restField} name={[name, "gt"]}>
                              <InputNumber
                                min={0}
                                defaultValue={1}
                                className="h-[38px] w-[88px] leading-[38px]"
                              />
                            </Form.Item>
                            ~
                            <Form.Item {...restField} name={[name, "lte"]}>
                              <InputNumber
                                min={0}
                                defaultValue={3}
                                className="h-[38px] w-[88px] leading-[38px]"
                              />
                            </Form.Item>
                          </div>
                        </div>
                        <div>
                          <div>重量单位(kg):</div>
                          <Form.Item {...restField} name={[name, "unitWeight"]}>
                            <InputNumber
                              min={0}
                              defaultValue={1}
                              className="h-[38px] w-[110px] leading-[38px]"
                            />
                          </Form.Item>
                        </div>
                        <div>
                          <div>价格(元):</div>
                          <Form.Item {...restField} name={[name, "price"]}>
                            <InputNumber
                              min={0}
                              defaultValue={1}
                              className="h-[38px] w-[110px] leading-[38px]"
                            />
                          </Form.Item>
                        </div>
                        <Button
                          onClick={() => {
                            remove(name);
                          }}
                          icon={<Icon icon="ant-design:delete-outlined" />}
                          className="w-[32px] h-[32px] ml-[5px] mt-[24px] bg-[red] text-white text-[24px] rounded-[50%] leading-[30px]"
                        />
                      </Space>
                      <div className="text-[#999999] mb-[15px]">
                        重量在(1kg~3kg)范围内，每1kg加价1元
                      </div>
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      onClick={() => {
                        add();
                      }}
                      icon={<Icon icon="ic:baseline-plus" />}
                    >
                      添加重量规则
                    </Button>
                  </Form.Item>
                </div>
              </>
            )}
          </Form.List>
          <Form.List name="time">
            {(fields, { add, remove }) => (
              <>
                <div>
                  <span className="text-[red]">*</span>时段规则：
                </div>
                <div>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key}>
                      <Space
                        key={key}
                        align="baseline"
                        className="my-[-18px] items-start"
                      >
                        <div>
                          <div>范围:</div>
                          <div className="flex">
                            <Form.Item {...restField} name={[name, "gt"]}>
                              <TimePicker
                                format="HH:mm"
                                defaultValue={dayjs("00:00", "HH:mm")}
                                className="h-[38px] w-[88px] leading-[38px]"
                              />
                            </Form.Item>
                            ~
                            <Form.Item {...restField} name={[name, "lte"]}>
                              <TimePicker
                                format="HH:mm"
                                defaultValue={dayjs("00:00", "HH:mm")}
                                className="h-[38px] w-[88px] leading-[38px]"
                              />
                            </Form.Item>
                          </div>
                        </div>
                        <div>
                          <div>价格(元):</div>
                          <Form.Item {...restField} name={[name, "price"]}>
                            <InputNumber
                              min={0}
                              defaultValue={1}
                              className="h-[38px] w-[110px] leading-[38px]"
                            />
                          </Form.Item>
                        </div>
                        <Button
                          onClick={() => {
                            remove(name);
                          }}
                          icon={<Icon icon="ant-design:delete-outlined" />}
                          className="w-[32px] h-[32px] ml-[5px] mt-[24px] bg-[red] text-white text-[24px] rounded-[50%] leading-[30px]"
                        />
                      </Space>
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      onClick={() => {
                        add();
                      }}
                      icon={<Icon icon="ic:baseline-plus" />}
                    >
                      添加时间段
                    </Button>
                  </Form.Item>
                </div>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-[85px] h-[40px] ml-[5px]"
            >
              提交保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Add;
