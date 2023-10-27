import { useEffect, useState } from "react";
import { type FC } from "react";
import type { RadioChangeEvent } from "antd";
import { Form, Button, Radio, message } from "antd";
import { useRequest } from "ahooks";
import { cashIs, postCashIs } from "@/service/api";

const Cash: FC = () => {
  const [value1, setValue1] = useState(true);
  const [value2, setValue2] = useState(true);

  const onChange1 = (e: RadioChangeEvent) => {
    setValue1(e.target.value);
  };
  const onChange2 = (e: RadioChangeEvent) => {
    setValue2(e.target.value);
  };

  useEffect(() => {
    cashIs()
      .then((res) => {
        setValue1(res.data.data.newUserOpen);
        setValue2(res.data.data.shareOpen);
      })
      .catch((error) => error);
  }, []);

  const { run: renAdminLogin } = useRequest(
    async () =>
      await postCashIs({
        newUserOpen: value1,
        shareOpen: value2,
        newUserRules: [{ couponNo: "", probability: 1 }],
        shareUserRules: [{ couponNo: "", probability: 1 }]
      }),
    {
      manual: true
    }
  );

  const success = () => {
    void message.success("更新配置成功");
  };
  return (
    <>
      <div className=" px-[24px] py-[16px] box-border">
        <span className=" h-[32px] text-[20px] font-bold">提现设置</span>
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={renAdminLogin}
        autoComplete="off"
        className=" px-[50px] box-border"
      >
        <Form.Item>
          <div className=" h-[40px] flex items-center text-[14px]">
            是否开启此项功能
          </div>
          <Radio.Group
            onChange={onChange1}
            value={value1}
            className=" h-[40px] flex items-center"
          >
            <Radio value={true}>开启</Radio>
            <Radio value={false}>关闭</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <div className=" h-[40px] flex items-center text-[14px]">
            是否开启此项功能
          </div>
          <Radio.Group
            onChange={onChange2}
            value={value2}
            className=" h-[40px] flex items-center"
          >
            <Radio value={true}>开启</Radio>
            <Radio value={false}>关闭</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 16 }}>
          <Button
            onClick={success}
            type="primary"
            htmlType="submit"
            className=" h-[40px] rounded-[4px]"
          >
            提交保存
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Cash;
