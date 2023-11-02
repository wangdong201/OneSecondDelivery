/* eslint-disable no-console */
import { adminCoupon, configCoupon, postConfigCoupon } from "@/service/api";
import { Icon } from "@iconify/react";
import { useRequest } from "ahooks";
import {
  Button,
  Form,
  InputNumber,
  Radio,
  type RadioChangeEvent,
  Select,
  Space,
  message
} from "antd";
import { useState, type FC, useEffect } from "react";

const Setting: FC = () => {
  const [newUserValue, setNewUserValue] = useState(true);
  const [shareValue, setShareValue] = useState(false);
  const [couponData, setCouponData] = useState<Res.Coupon>();
  const [adminCouponData, setadminCouponData] = useState<any[]>([]);
  const [form] = Form.useForm();
  // 是否开启功能
  const onChange = (e: RadioChangeEvent) => {
    setNewUserValue(e.target.value);
  };
  const shareOnChange = (e: RadioChangeEvent) => {
    setShareValue(e.target.value);
  };

  // 优惠券设置接口
  useEffect(() => {
    configCoupon()
      .then((res) => {
        setNewUserValue(res.data.data.newUserOpen);
        setShareValue(res.data.data.shareOpen);
        setCouponData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 渲染规则
  useEffect(() => {
    form.setFieldsValue({
      newUserRules: couponData?.data.newUserRules,
      shareUserRules: couponData?.data.shareUserRules
    });
  }, [couponData]);
  // console.log(couponData);

  const ConfigCoupon = {
    newUserOpen: newUserValue,
    shareOpen: shareValue
  };
  // 提交保存成功的回调函数
  const success = () => {
    void message.success("更新配置成功", 5);
  };
  const { run: runConfigCoupon } = useRequest(
    async (values: Req.ConfigCoupon) =>
      await postConfigCoupon({ ...values, ...ConfigCoupon }),
    {
      manual: true
    }
  );

  // 选择优惠券
  useEffect(() => {
    adminCoupon()
      .then((res) => {
        setadminCouponData(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 选择优惠券数据
  const data: any[] = [];
  adminCouponData.forEach((item, index) => {
    data.push({
      key: index,
      value: item.couponNo,
      label: item.couponName
    });
  });

  return (
    <div className=" h-[100%] overflow-y-scroll">
      <p className=" text-[24px] text-[#333333] px-[24px]">优惠券设置</p>
      <div className=" w-[600px] px-[50px]">
        <Form
          name="dynamic_form_nest_item"
          onFinish={runConfigCoupon}
          style={{ maxWidth: 600 }}
          autoComplete="off"
          form={form}
        >
          <div>
            {/* 新用户获得优惠券 */}
            <div className=" w-[100%] flex items-center my-[16px]">
              <div
                className="w-[170px] h-[1px]"
                style={{ borderTop: "1px solid #e8e8e8" }}
              ></div>
              <span className=" inline-block px-[24px] whitespace-nowrap">
                新用户获得优惠券
              </span>
              <div
                className="w-[170px] h-[1px]"
                style={{ borderTop: "1px solid #e8e8e8" }}
              ></div>
            </div>

            <div className=" h-[80px] mb-[24px] flex flex-col justify-evenly">
              <span>是否开启此项功能：</span>
              <Form.Item name="newUserOpen">
                <div>
                  <Radio.Group onChange={onChange} value={newUserValue}>
                    <Radio value={true}>开启</Radio>
                    <Radio value={false}>关闭</Radio>
                  </Radio.Group>
                </div>
              </Form.Item>
            </div>

            <div className=" flex flex-col justify-evenly">
              <p>获得优惠券规则：</p>
            </div>
            <Form.List name="newUserRules">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: "flex" }}>
                      <div className=" pr-[10px]">
                        <p>选择一张优惠券</p>
                        <Form.Item {...restField} name={[name, "couponNo"]}>
                          <Select
                            placeholder=""
                            style={{ width: 195, height: 38 }}
                            options={data}
                          />
                        </Form.Item>
                      </div>
                      <div className=" px-[10px]">
                        <p>概率(填100表示100%获得)</p>
                        <Form.Item {...restField} name={[name, "probability"]}>
                          <InputNumber
                            size="large"
                            defaultValue={0}
                            max={100}
                            style={{ width: 195, height: 38 }}
                          />
                        </Form.Item>
                      </div>
                      <div>
                        <Button
                          type="primary"
                          danger
                          className=" w-[32px] h-[32px] flex items-center justify-center rounded-[100px] p-0 mt-[25px]"
                          onClick={() => {
                            remove(name);
                          }}
                        >
                          <Icon
                            icon="ant-design:delete-outlined"
                            color="white"
                            fontSize="21px"
                          />
                        </Button>
                      </div>
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      className=" w-[130px] h-[40px]"
                      onClick={() => {
                        add();
                      }}
                    >
                      +添加一项规则
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>

          {/* 转发获得优惠券 */}
          <div>
            <div className=" w-[100%] flex items-center my-[16px]">
              <div
                className="w-[170px] h-[1px]"
                style={{ borderTop: "1px solid #e8e8e8" }}
              ></div>
              <span className=" inline-block px-[24px] whitespace-nowrap">
                转发获得优惠券
              </span>
              <div
                className="w-[170px] h-[1px]"
                style={{ borderTop: "1px solid #e8e8e8" }}
              ></div>
            </div>

            <div className=" h-[80px] mb-[24px] flex flex-col justify-evenly">
              <span>是否开启此项功能：</span>
              <Form.Item name="shareOpen">
                <div>
                  <Radio.Group onChange={shareOnChange} value={shareValue}>
                    <Radio value={true}>开启</Radio>
                    <Radio value={false}>关闭</Radio>
                  </Radio.Group>
                </div>
              </Form.Item>
            </div>

            <div className=" flex flex-col justify-evenly">
              <p>获得优惠券规则：</p>
            </div>
            <Form.List name="shareUserRules">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: "flex" }}>
                      <div className=" pr-[10px]">
                        <p>选择一张优惠券</p>
                        <Form.Item {...restField} name={[name, "couponNo"]}>
                          <Select
                            placeholder=""
                            style={{ width: 195, height: 38 }}
                            options={data}
                          />
                        </Form.Item>
                      </div>
                      <div className=" px-[10px]">
                        <p>概率(填100表示100%获得)</p>
                        <Form.Item {...restField} name={[name, "probability"]}>
                          <InputNumber
                            size="large"
                            defaultValue={0}
                            max={100}
                            style={{ width: 195, height: 38 }}
                          />
                        </Form.Item>
                      </div>
                      <div>
                        <Button
                          type="primary"
                          danger
                          className=" w-[32px] h-[32px] flex items-center justify-center rounded-[100px] p-0 mt-[25px]"
                          onClick={() => {
                            remove(name);
                          }}
                        >
                          <Icon
                            icon="ant-design:delete-outlined"
                            color="white"
                            fontSize="21px"
                          />
                        </Button>
                      </div>
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      className=" w-[130px] h-[40px]"
                      onClick={() => {
                        add();
                      }}
                    >
                      +添加一项规则
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className=" w-[88px] h-[40px]"
              onClick={success}
            >
              提交保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Setting;
