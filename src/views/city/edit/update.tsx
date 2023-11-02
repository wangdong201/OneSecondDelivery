/* eslint-disable no-console */
import { useEffect, type FC, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import cascaderOptions, { DivisionUtil } from "@pansy/china-division";
import {
  adminAgent,
  getValuation,
  getWeight,
  getTag,
  putAdminCitysUpDate
} from "@/service/api";
import {
  AutoComplete,
  Button,
  Cascader,
  Form,
  InputNumber,
  Radio,
  Select
} from "antd";

const Wrapper = styled.div`
  .ant-select-selector {
    height: 40px !important;
    padding-top: 4px !important;
  }

  .ant-select-selection-search {
    padding-top: 4px !important;
  }

  .ant-input-number {
    height: 40px;
    padding-top: 4px;
    width: 148px;
  }

  .ant-btn {
    width: 88px;
    height: 40px;
  }
`;

const Update: FC = () => {
  const navigate = useNavigate();
  const params = useParams(); // 获取路由参数
  const searchParams = new URLSearchParams(params.id); // 使用路由参数中的 id 创建 URLSearchParams 对象,用URLSearchParams来获取路由url中的参数
  const UrlObj = Object.fromEntries(searchParams.entries()); // 将 URLSearchParams 对象转换为普通对象
  const [form] = Form.useForm(); // 创建一个表单实例
  const divisionUtil = new DivisionUtil(cascaderOptions); // 实例化地区
  const [weight, setWeight] = useState([]);
  const [tag, setTag] = useState([]);
  const [valuationData, setValuationData] = useState([]);
  const [searchData, setSearchData] = useState<any>([]);

  // 数据请求
  useEffect(() => {
    adminAgent({ agentNo: UrlObj.agentNo })
      .then((res: any) => {
        form.setFieldsValue({
          cityName: `${UrlObj.province}/${UrlObj.cityName}`,
          agentNo: UrlObj.agentNo,
          cityNo: UrlObj.cityNo,
          citysTagGroupId: UrlObj.citysTagGroupId,
          citysValuationId: UrlObj.citysValuationId,
          citysWeightTagId: UrlObj.citysWeightTagId,
          createTime: UrlObj.createTime,
          extractHelpBuy: UrlObj.extractHelpBuy,
          extractHelpBuyForAgent: UrlObj.extractHelpBuyForAgent,
          extractHelpDeliver: UrlObj.extractHelpDeliver,
          extractHelpDeliverForAgent: UrlObj.extractHelpDeliverForAgent,
          extractHelpGet: UrlObj.extractHelpGet,
          extractHelpGetForAgent: UrlObj.extractHelpGetForAgent,
          id: UrlObj.id,
          startPrice: UrlObj.startPrice,
          status: Number(UrlObj.status),
          updateTime: UrlObj.updateTime,
          updatedBy: UrlObj.updatedBy
        });
      })
      .catch(() => {});
    getWeight({ current: 1, pageSize: 20 })
      .then((res: any) => {
        // 将服务器返回的数据进行处理，将每个项转换为 { value: id, label: tagName } 的形式
        const dataItem1 = res.data.data.data.map((item: any) => {
          return { value: item.id, label: item.tagName as string };
        });
        setWeight(dataItem1);
      })
      .catch(() => {});
    getTag({ current: 1, pageSize: 20 })
      .then((res: any) => {
        const dataItem2 = res.data.data.data.map((item: any) => {
          return { value: item.id, label: item.groupName as string };
        });
        setTag(dataItem2);
      })
      .catch(() => {});
    getValuation({ current: 1, pageSize: 20 })
      .then((res: any) => {
        const dataItem3 = res.data.data.data.map((item: any) => {
          return { value: item.id, label: item.ruleName as string };
        });
        setValuationData(dataItem3);
      })
      .catch(() => {});
  }, []);

  // 搜索函数
  const searchFn = (text: string) => {
    adminAgent({ realName: text })
      .then((res) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (res) {
          const dataItem4 = res.data.data.data.map((item) => ({
            value: `${item.realName}-${item.agentAccount}`,
            label: `${item.realName}-${item.agentAccount}`,
            agentNo: item.agentNo
          }));
          setSearchData(dataItem4);
        }
      })
      .catch(() => {});
  };

  // 修改城市功能
  const onFinish = (value: Req.CitysUpDate) => {
    const { cityName } = value;
    // 判断选择的是省份还是城市
    // 如果 cityName 的长度不等于 3，表示选择的是省份
    // 否则选择的是城市
    const isProvinceSelected = cityName.length !== 3;
    // 根据选择的是省份还是城市，设置对应的城市和省份名称
    value.cityName = isProvinceSelected
      ? UrlObj.cityName
      : divisionUtil.getNameByCode(cityName[1]);
    value.province = isProvinceSelected
      ? UrlObj.province
      : divisionUtil.getNameByCode(cityName[0]);

    value.agentNo = UrlObj.agentNo;
    value.cityNo = UrlObj.cityNo;

    // 提交更新数据
    putAdminCitysUpDate(value).catch(() => {});
  };

  return (
    <Wrapper className="overflow-y-auto h-[540px] lastBox">
      <h1 className="text-[20px] h-[64px] py-[16px] px-[24px] font-[800] flex items-center">
        <span
          onClick={() => {
            navigate(-1);
          }}
          className="mr-[15px]"
        >
          <Icon icon="iconoir:arrow-left" />
        </span>
        修改城市
      </h1>
      <div className="w-[600px] px-[50px]">
        <Form
          autoComplete="off"
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="运营城市:"
            name="cityName"
            rules={[{ required: true, message: "城市必填" }]}
          >
            <Cascader
              options={divisionUtil.getSourceData()}
              placeholder="Please select"
            />
          </Form.Item>
          <Form.Item label="平台抽点:">
            <div className="flex flex-wrap justify-between">
              <Form.Item label="帮我送" name="extractHelpDeliver">
                <InputNumber step="0.01" />
              </Form.Item>
              <Form.Item label="帮我取" name="extractHelpGet">
                <InputNumber step="0.01" />
              </Form.Item>
              <Form.Item label="帮我买" name="extractHelpBuy">
                <InputNumber step="0.01" />
              </Form.Item>
              <div className="w-[100%] text-[#999] text-[14px] mt-[-18px]">
                输入小于1的数值
              </div>
            </div>
          </Form.Item>
          <Form.Item label="代理抽点:">
            <div className="flex flex-wrap justify-between">
              <Form.Item label="帮我送" name="extractHelpDeliverForAgent">
                <InputNumber step="0.01" />
              </Form.Item>
              <Form.Item label="帮我取" name="extractHelpGetForAgent">
                <InputNumber step="0.01" />
              </Form.Item>
              <Form.Item label="帮我买" name="extractHelpBuyForAgent">
                <InputNumber step="0.01" />
              </Form.Item>
              <div className="w-[100%] text-[#999] text-[14px] mt-[-18px]">
                输入小于1的数值
              </div>
            </div>
          </Form.Item>
          <Form.Item label="起步价:" name="startPrice">
            <InputNumber />
          </Form.Item>
          <Form.Item label="计价规则:" name="citysValuationId">
            <Select options={valuationData} />
          </Form.Item>
          <Form.Item label="重量标签:" name="citysWeightTagId">
            <Select options={weight} />
          </Form.Item>
          <Form.Item label="物品标签组:" name="citysTagGroupId">
            <Select options={tag} />
          </Form.Item>
          <Form.Item
            label="代理人:"
            name="agentNo"
            rules={[{ required: true, message: "代理人必填" }]}
          >
            <AutoComplete onSearch={searchFn} options={searchData} />
          </Form.Item>
          <div className="w-[100%] text-[#999] text-[14px] mt-[-18px] mb-[20px]">
            输入姓名搜索并选择
          </div>
          <Form.Item label="运营状态:" name="status">
            <Radio.Group>
              <Radio value={1}>运营</Radio>
              <Radio value={0}>关闭</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Wrapper>
  );
};
export default Update;
