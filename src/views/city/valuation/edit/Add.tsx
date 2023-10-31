import { Icon } from "@iconify/react";
import { Button, Input, Form, InputNumber, TimePicker } from "antd";
import dayjs from "dayjs";
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
          <p>
            <span className="text-[red] mr-[5px]">*</span>规则名称：
          </p>
          <Input
            placeholder="请输入规则名称"
            className="w-[500px] h-[40px] px-[11px] py-[4px]"
          />
        </div>
        <div className="mb-[30px]">
          <p>
            <span className="text-[red] mr-[5px]">*</span>距离规则：
          </p>
          <Form name="dynamic_form_item">
            <Form.List name="names">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Form.Item required={false} key={field.key}>
                      <div className="flex">
                        <div>
                          <div>范围(km):</div>
                          <div className="flex items-center">
                            <InputNumber
                              min={0}
                              defaultValue={1}
                              className="h-[38px] w-[88px] leading-[38px]"
                            />
                            ~
                            <InputNumber
                              min={0}
                              defaultValue={3}
                              className="h-[38px] w-[88px] leading-[38px]"
                            />
                          </div>
                        </div>
                        <div className="mx-[15px]">
                          <div>距离单位(km):</div>
                          <InputNumber
                            min={0}
                            defaultValue={1}
                            className="h-[38px] w-[110px] leading-[38px]"
                          />
                        </div>
                        <div>
                          <div>价格(元):</div>
                          <InputNumber
                            min={0}
                            defaultValue={1}
                            className="h-[38px] w-[110px] leading-[38px]"
                          />
                        </div>
                        <Button
                          onClick={() => {
                            remove(field.name);
                          }}
                          icon={<Icon icon="ant-design:delete-outlined" />}
                          className="w-[32px] h-[32px] mt-[25px] ml-[16px] bg-[red] text-white text-[24px] rounded-[50%] leading-[30px]"
                        />
                      </div>
                      <div className="text-[#999999]">
                        距离在(1km~3km)范围内，每1km加价1元
                      </div>
                    </Form.Item>
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
                </>
              )}
            </Form.List>
          </Form>
        </div>
        <div className="mb-[30px]">
          <p>
            <span className="text-[red] mr-[5px]">*</span>重量规则：
          </p>
          <Form name="dynamic_form_item">
            <Form.List name="names">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Form.Item required={false} key={field.key}>
                      <div className="flex">
                        <div>
                          <div>范围(km):</div>
                          <div className="flex items-center">
                            <InputNumber
                              min={0}
                              defaultValue={1}
                              className="h-[38px] w-[88px] leading-[38px]"
                            />
                            ~
                            <InputNumber
                              min={0}
                              defaultValue={3}
                              className="h-[38px] w-[88px] leading-[38px]"
                            />
                          </div>
                        </div>
                        <div className="mx-[15px]">
                          <div>重量单位(kg):</div>
                          <InputNumber
                            min={0}
                            defaultValue={1}
                            className="h-[38px] w-[110px] leading-[38px]"
                          />
                        </div>
                        <div>
                          <div>价格(元):</div>
                          <InputNumber
                            min={0}
                            defaultValue={1}
                            className="h-[38px] w-[110px] leading-[38px]"
                          />
                        </div>
                        <Button
                          onClick={() => {
                            remove(field.name);
                          }}
                          icon={<Icon icon="ant-design:delete-outlined" />}
                          className="w-[32px] h-[32px] mt-[25px] ml-[16px] bg-[red] text-white text-[24px] rounded-[50%] leading-[30px]"
                        />
                      </div>
                      <div className="text-[#999999]">
                        重量在(1kg~3kg)范围内，每1kg加价1元
                      </div>
                    </Form.Item>
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
                </>
              )}
            </Form.List>
          </Form>
        </div>
        <div className="mb-[30px]">
          <p>
            <span className="text-[red] mr-[5px]">*</span>时段规则：
          </p>
          <Form name="dynamic_form_item">
            <Form.List name="names">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Form.Item required={false} key={field.key}>
                      <div className="flex">
                        <div>
                          <div>范围(km):</div>
                          <div className="flex items-center">
                            <TimePicker
                              format="HH:mm"
                              defaultValue={dayjs("00:00", "HH:mm")}
                              className="h-[38px] w-[88px] leading-[38px]"
                            />
                            ~
                            <TimePicker
                              format="HH:mm"
                              defaultValue={dayjs("07:00", "HH:mm")}
                              className="h-[38px] w-[88px] leading-[38px]"
                            />
                          </div>
                        </div>
                        <div className="ml-[15px]">
                          <div>价格(元):</div>
                          <InputNumber
                            min={0}
                            defaultValue={1}
                            className="h-[38px] w-[110px] leading-[38px]"
                          />
                        </div>
                        <Button
                          onClick={() => {
                            remove(field.name);
                          }}
                          icon={<Icon icon="ant-design:delete-outlined" />}
                          className="w-[32px] h-[32px] mt-[25px] ml-[16px] bg-[red] text-white text-[24px] rounded-[50%] leading-[30px]"
                        />
                      </div>
                    </Form.Item>
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
                </>
              )}
            </Form.List>
          </Form>
        </div>
        <Button type="primary" className="w-[85px] h-[40px] ml-[5px]">
          提交保存
        </Button>
      </div>
    </div>
  );
};

export default Add;
