import { useNavigate } from "react-router-dom";
import { type FC, useState, type SetStateAction } from "react";
import { Icon } from "@iconify/react";
import { useRequest } from "ahooks";
import { Input, Form, InputNumber, Select, Radio, Button, message } from "antd";
import { postadminAddCoupons } from "@/service/api";

const AddCoupon: FC = () => {
  const navigate = useNavigate();
  const [, setSelectedValue] = useState(null);
  const [form] = Form.useForm();
  const AddCouponsSuccess = (res: { data: { code: number } }) => {
    if (res.data.code === 200) {
      void message.success("添加优惠券成功");
    }
  };
  const { run: runAdminAddCoupons } = useRequest(
    async (values) => {
      values.conditionService = values.conditionService.value;
      return await postadminAddCoupons({ ...values });
    },
    {
      manual: true,
      onSuccess: AddCouponsSuccess
    }
  );
  const handleConditionServiceChange = (values: {
    conditionService: SetStateAction<null>;
  }) => {
    setSelectedValue(values.conditionService);
  };

  return (
    <>
      <div className=" flex items-center">
        <Icon
          icon="mingcute:arrow-left-line"
          className="font-bold text-[25px]"
          onClick={() => {
            navigate("/coupon/coupons");
          }}
        />
        <div className=" text-[20px] text-[#333] ml-[10px] font-bold">
          新增优惠券
        </div>
      </div>
      <Form
        className="ml-[20px] w-[500px]"
        form={form}
        initialValues={{
          discountAmount: 0,
          conditionsAmount: 0,
          conditionService: {
            label: "全部",
            value: "ALL",
            key: "ALL"
          },
          limitNumber: -1,
          deadlineDays: -1,
          status: 1
        }}
        onFinish={runAdminAddCoupons}
      >
        {/* 优惠券名称 */}
        <div className=" flex items-center mt-[20px]">
          <Icon icon="gg:asterisk" className=" text-[red]" />
          <div>优惠券名称 :</div>
        </div>
        <Form.Item
          name="couponName"
          rules={[{ required: true, message: "优惠券名称必填" }]}
        >
          <Input
            placeholder="请输入优惠券名称"
            className=" w-[500px] h-[40px] mt-[10px]"
          />
        </Form.Item>
        <div className=" flex justify-between ">
          {/* 优惠券金额 */}
          <div>
            <div>优惠金额</div>
            <Form.Item name="discountAmount">
              <InputNumber min={0} className="w-[238.4px] h-[38px] mt-[10px]" />
            </Form.Item>
          </div>
          {/* 满足条件金额 */}
          <div>
            <div>满足条件金额</div>
            <Form.Item name="conditionsAmount">
              <InputNumber min={0} className="w-[238.4px] h-[38px] mt-[10px]" />
            </Form.Item>
          </div>
        </div>

        {/* 优惠券类型 */}
        <div>
          <div className=" flex items-center mt-[20px]">
            <Icon icon="gg:asterisk" className=" text-[red]" />
            <div>优惠券类型 :</div>
          </div>
          <Form.Item name="conditionService" rules={[{ required: true }]}>
            <Select
              labelInValue
              style={{ width: 500, marginRight: 8, height: 40, marginTop: 10 }}
              options={[
                {
                  value: "ALL",
                  label: "全部"
                },
                {
                  value: "helpDeliver",
                  label: "帮我送"
                },
                {
                  value: "helpGet",
                  label: "帮我取"
                },
                {
                  value: "helpBuy",
                  label: "帮我买"
                }
              ]}
              onChange={handleConditionServiceChange}
            />
          </Form.Item>
        </div>

        {/* 有效天数 */}
        <div className="mb-[24px]">
          <div>有效天数 :</div>
          <Form.Item name="deadlineDays" className="m-0">
            <Input className=" w-[500px] h-[40px] mt-[10px]" />
          </Form.Item>
          <span className="text-[#999] text-[14px]">
            领取后开始计算到期时间, -1为不限
          </span>
        </div>

        {/* 限制数量 */}
        <div className="mb-[24px]">
          <div>限制领取数量</div>
          <Form.Item
            name="limitNumber"
            rules={[{ required: true }]}
            className=" m-0"
          >
            <InputNumber min={-1} className="w-[238.4px] h-[38px] mt-[10px]" />
          </Form.Item>
          <span className="text-[#999] text-[14px]">
            限制领取数量, -1为不限制
          </span>
        </div>

        {/* 状态 */}
        <Form.Item name="status">
          <Radio.Group>
            <Radio value={1}>启用</Radio>
            <Radio value={0}>禁用</Radio>
          </Radio.Group>
        </Form.Item>

        {/* 提交保存 */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-[87px] h-[40px] mt-[20px]"
          >
            提交保存
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddCoupon;
