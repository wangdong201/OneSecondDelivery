import { type FC, useState, useEffect } from "react";
import { Form, InputNumber, Button } from "antd";
import { configIntegral, postConfigIntegral } from "@/service/api";
import { useRequest } from "ahooks";

const Integral: FC = () => {
  const [inte, setInte] = useState<Res.configIntegral>();
  const [form] = Form.useForm();
  useEffect(() => {
    configIntegral()
      .then((res) => {
        setInte(res.data);
      })
      .catch((error) => error);
  }, []);
  useEffect(() => {
    form.setFieldsValue({ withIntegral: inte?.data.withIntegral });
  }, [inte]);

  const { run: ConfigInte } = useRequest(
    async (values) => await postConfigIntegral(values),
    {
      manual: true
    }
  );

  return (
    <>
      <div className=" text-[20px] py-[16px] px-[24px] font-bold">积分设置</div>
      <Form
        form={form}
        className=" px-[50px]"
        name="appcorwx"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={ConfigInte}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label={
            <div className=" h-[40px] flex items-center">积分抵扣比例：</div>
          }
          labelCol={{
            style: {
              padding: "0px"
            }
          }}
          name="withIntegral"
        >
          <InputNumber
            className=" w-[500px] h-[40px] rounded-[4px] leading-[40px]"
            min={1}
          />
        </Form.Item>

        <div className=" h-[40px] text-[12px] leading-[40px] text-[#999] mt-[-24px] mb-[24px]">
          输入1000 则表示1000积分可抵扣1元，输入100表示100积分可抵扣1元
        </div>

        <Form.Item wrapperCol={{ span: 16 }}>
          <Button
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

export default Integral;
