import { Icon } from "@iconify/react";
import {
  Button,
  Input,
  Form,
  InputNumber,
  Radio,
  type RadioChangeEvent
} from "antd";
import { useState, type FC } from "react";
import { NavLink } from "react-router-dom";

const Add: FC = () => {
  const [value, setValue] = useState(2);
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <div className="h-[100%] overflow-y-auto">
      <div className="px-[24px] flex items-center">
        <NavLink to={""}>
          <Icon
            icon="mdi:arrow-left"
            className="text-black text-[22px] mr-[15px]"
          />
        </NavLink>
        <h3 className="text-[22px]">新增重量标签</h3>
      </div>
      <div className="px-[50px]">
        <div className="mb-[30px]">
          <p>
            <span className="text-[red] mr-[5px]">*</span>标签名称：
          </p>
          <Input
            placeholder="请输入标签名称"
            className="w-[500px] h-[40px] px-[11px] py-[4px]"
          />
        </div>
        <div className="mb-[30px]">
          <p>
            <span className="text-[red] mr-[5px]">*</span>重量规则：
          </p>

          <Form name="dynamic_form_item">
            <Form.List name="names">
              {(fields, { add, remove }) => (
                <>
                  <Form.Item>
                    <Button
                      onClick={() => {
                        add();
                      }}
                      icon={<Icon icon="ic:baseline-plus" />}
                    >
                      添加一项
                    </Button>
                  </Form.Item>
                  {fields.map((field) => (
                    <Form.Item required={false} key={field.key}>
                      <div className="flex">
                        <div>
                          <div>标签名称:</div>
                          <div className="flex items-center">
                            <Input
                              placeholder="请输入标签"
                              className="h-[38px] w-[160px] leading-[38px]"
                            />
                          </div>
                        </div>
                        <div className="mx-[15px]">
                          <div>
                            取值：
                            <Radio.Group onChange={onChange} value={value}>
                              <Radio value={1}>值</Radio>
                              <Radio value={2}>范围</Radio>
                            </Radio.Group>
                          </div>
                          <InputNumber
                            min={0}
                            defaultValue={1}
                            className="h-[38px] w-[88px] leading-[38px]"
                          />
                          ~
                          <InputNumber
                            min={0}
                            defaultValue={1}
                            className="h-[38px] w-[88px] leading-[38px]"
                          />
                        </div>
                        {/* <div>
                            <InputNumber
                              min={0}
                              defaultValue={1}
                              className="h-[38px] w-[88px] leading-[38px]"
                            />
                          </div> */}
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
