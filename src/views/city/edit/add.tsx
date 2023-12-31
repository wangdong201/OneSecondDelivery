/* eslint-disable no-console */
import { type FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import cascaderOptions, { DivisionUtil } from "@pansy/china-division";
import {
  getValuation,
  getWeight,
  getTag,
  adminAgent,
  postAdminCityAdd
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

const Add: FC = () => {
  const navigate = useNavigate();
  const divisionUtil = new DivisionUtil(cascaderOptions); // 实例化地区
  const [weight, setWeight] = useState([]);
  const [tag, setTag] = useState([]);
  const [valuationData, setValuationData] = useState([]);
  const [searchData, setSearchData] = useState<any>([]);

  useEffect(() => {
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

  // 默认数据
  const initialValues = {
    extractHelpDeliver: 0.0,
    extractHelpGet: 0.0,
    extractHelpBuy: 0.0,
    extractHelpDeliverForAgent: 0.0,
    extractHelpGetForAgent: 0.0,
    extractHelpBuyForAgent: 0.0,
    startPrice: 0,
    citysValuationId: 0,
    citysWeightTagId: 0,
    citysTagGroupId: 0,
    status: 0
  };

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

  // 提交
  const onFinish = (value: Req.postCityAdd) => {
    // 根据输入的代理商编号查找对应的代理商编号，如果找不到则设置为空字符串
    value.agentNo =
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      searchData.find((item: any) => item.value === value.agentNo)?.agentNo ||
      "";
    // 根据选择的城市编码获取对应的省份名称
    value.province = divisionUtil.getNameByCode(value.cityName[0]);
    // 根据选择的城市编码获取对应的城市名称
    value.cityName =
      divisionUtil.getNameByCode(value.cityName[1]) === "市辖区"
        ? divisionUtil.getNameByCode(value.cityName[0])
        : divisionUtil.getNameByCode(value.cityName[1]);
    postAdminCityAdd(value).catch(() => {}); // 进行城市添加操作
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
        新增城市
      </h1>
      <div className="w-[600px] px-[50px]">
        <Form
          autoComplete="off"
          layout="vertical"
          initialValues={initialValues}
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

export default Add;
