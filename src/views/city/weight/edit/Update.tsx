import { Icon } from "@iconify/react";
import {
  Button,
  Input,
  Form,
  Radio,
  type RadioChangeEvent,
  Space,
  InputNumber
} from "antd";
import { useState, type FC } from "react";
import { NavLink } from "react-router-dom";

const Update: FC = () => {
  const [value, setValue] = useState(2);
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <div className="h-[100%] overflow-y-auto">
      <div className="px-[24px] flex items-center">
        <NavLink to={"/city/weight/weight"}>
          <Icon
            icon="mdi:arrow-left"
            className="text-black text-[22px] mr-[15px]"
          />
        </NavLink>
        <h3 className="text-[22px]">新增重量标签</h3>
      </div>
      <div className="px-[50px]">
        <Form layout="vertical">
          <Form.Item
            name="tagName"
            label="标签名称："
            rules={[{ required: true }]}
          >
            <Input
              placeholder="请输入标签名称"
              className="w-[500px] h-[40px] px-[11px] py-[4px]"
            />
          </Form.Item>
          <Form.List name="tags">
            {(fields, { add, remove }) => (
              <Form.Item
                name="tags"
                label="重量标签："
                rules={[{ required: true }]}
              >
                <div>
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
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key}>
                      <Space
                        key={key}
                        align="baseline"
                        className="my-[-18px] items-start"
                      >
                        <div>
                          <div>标签名称</div>
                          <Form.Item {...restField} name={[name, "label"]}>
                            <Input
                              placeholder="请输入标签名称"
                              className="h-[40px] w-[160px] leading-[38px]"
                            />
                          </Form.Item>
                        </div>
                        <div className="mx-[15px]">
                          <div>
                            取值：
                            <Radio.Group onChange={onChange} value={value}>
                              <Radio value={1}>值</Radio>
                              <Radio value={2}>范围</Radio>
                            </Radio.Group>
                          </div>
                          <div className="flex">
                            <Form.Item {...restField} name={[name, "value"]}>
                              <InputNumber
                                min={0}
                                defaultValue={0}
                                className="h-[38px] w-[88px] leading-[38px]"
                              />
                            </Form.Item>
                            ~
                            <Form.Item {...restField} name={[name, "value"]}>
                              <InputNumber
                                min={0}
                                defaultValue={1}
                                className="h-[38px] w-[88px] leading-[38px]"
                              />
                            </Form.Item>
                          </div>
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
                </div>
              </Form.Item>
            )}
          </Form.List>
          <Button type="primary" className="w-[85px] h-[40px] ml-[5px]">
            提交保存
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Update;
