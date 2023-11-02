/* eslint-disable no-console */
import { type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useRequest } from "ahooks";
import { Input, Form, InputNumber, Select, Radio, Button, message } from "antd";
import { updateCoupon } from "@/service/api";

const UpdateCoupons: FC = () => {
  const { id } = useParams();
  const valuedata = new URLSearchParams(id);
  const CouponData = Object.fromEntries(valuedata.entries());
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const UpdateCouponsSuccess = (res: { data: { code: number } }) => {
    if (res.data.code === 200) {
      void message.success("修改优惠券成功");
    }
    navigate("/coupon/coupons");
  };
  const { run: updateCoupons } = useRequest(
    async (values) => await updateCoupon({ ...values }),
    {
      manual: true,
      onSuccess: UpdateCouponsSuccess
    }
  );

  return (
    <>
      <div
        className=" flex items-center"
        onClick={() => {
          navigate(-1);
        }}
      >
        <Icon
          icon="mingcute:arrow-left-line"
          className="font-bold text-[25px]"
        />
        <div className=" text-[20px] text-[#333] ml-[10px] font-bold">
          修改优惠券
        </div>
      </div>
      <Form
        className="ml-[20px] w-[500px]"
        form={form}
        onFinish={updateCoupons}
        initialValues={{
          couponName: CouponData.couponName,
          discountAmount: CouponData.discountAmount,
          conditionsAmount: CouponData.conditionsAmount,
          conditionService: CouponData.conditionService,
          limitNumber: CouponData.limitNumber,
          deadlineDays: CouponData.deadlineDays,
          status: Number(CouponData.status),
          couponNo: CouponData.couponNo
        }}
      >
        {/* 优惠券名称 */}
        <div className=" flex items-center mt-[20px]">
          <Icon icon="gg:asterisk" className=" text-[red]" />
          <div>优惠券名称 :</div>
        </div>
        <Form.Item name="couponName">
          <Input className=" w-[500px] h-[40px] mt-[10px]" />
        </Form.Item>

        <div className="flex justify-between">
          {/* 优惠券金额 */}
          <div>
            <div>优惠券金额</div>
            <Form.Item name="discountAmount">
              <InputNumber className="w-[238.4px] h-[38px] mt-[10px]" />
            </Form.Item>
          </div>
          {/* 满足条件金额 */}
          <div>
            <div>满足条件金额</div>
            <Form.Item name="conditionsAmount">
              <InputNumber className="w-[238.4px] h-[38px] mt-[10px]" />
            </Form.Item>
          </div>
        </div>

        {/* 优惠券类型 */}
        <div>
          <div className=" flex items-center mt-[20px]">
            <Icon icon="gg:asterisk" className=" text-[red]" />
            <div>优惠券类型 :</div>
          </div>
          <Form.Item name="conditionService">
            <Select
              style={{ width: 500, marginRight: 8, height: 40 }}
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
            />
          </Form.Item>
        </div>

        {/* 有效天数 */}
        <div className="mb-[24px]">
          <div className=" flex items-center mt-[20px]">
            <div>有效天数 :</div>
          </div>
          <Form.Item name="deadlineDays" className="m-0">
            <Input className=" w-[500px] h-[40px] my-[10px]" />
          </Form.Item>
          <div className="text-[#999] text-[14px]">
            领取后开始计算到期时间, -1为不限
          </div>
        </div>

        {/* 限制数量 */}
        <div className="mb-[24px]">
          <div>限制领取数量：</div>
          <Form.Item name="limitNumber" className="m-0">
            <InputNumber className="w-[238.4px] h-[38px] my-[10px]" />
          </Form.Item>
          <div className="text-[#999] text-[14px]">
            限制领取数量，-1为不限制
          </div>
        </div>

        {/* 状态 */}
        <Form.Item name="status">
          <Radio.Group>
            <Radio value={1}>启用</Radio>
            <Radio value={0}>禁用</Radio>
          </Radio.Group>
        </Form.Item>

        {/* couponNo */}
        <Form.Item name="couponNo" style={{ display: "none" }}>
          <input type="text" />
        </Form.Item>

        {/* 提交保存 */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-[87px] h-[40px] mt-[20px] "
          >
            提交保存
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateCoupons;
