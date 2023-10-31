/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { useEffect, type FC } from "react";
import { Icon } from "@iconify/react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import ReactECharts from "echarts-for-react";
import {
  getAdminAnalysisNewOrder,
  getOverviewData,
  getPlateOneData
} from "../../service/api";
import { useRequest } from "ahooks";
import styled from "styled-components";
// import PolylineTable from "./components/PolylineTable";

const Div = styled.div`
  .page {
    /* overflow-y: auto; */
    &::-webkit-scrollbar-button {
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      background: #dddddd;
      border-radius: 3px;
    }
    &::-webkit-scrollbar-track {
      display: none;
    }
  }
`;

const currentDate = dayjs();

const Home: FC = () => {
  const { RangePicker } = DatePicker;
  // // 订单数据曲线数据
  const { data: AdminAnalysisNewOrderData } = useRequest(
    async () =>
      await getAdminAnalysisNewOrder({ beginDate: 20231001, endDate: 20231030 })
  );
  useEffect(() => {
    console.log(AdminAnalysisNewOrderData);
    console.log(getUserData);
  }, []);
  // 用户数据曲线数据
  const { data: getUserData } = useRequest(
    async () =>
      await getPlateOneData({ beginDate: 20231024, endDate: 20231030 })
  );
  // 板块一数据
  const { data: getOverviewdata } = useRequest(
    async () => await getOverviewData()
  );

  // 版块一数据
  const renderBolck = [
    {
      bg: "linear-gradient(to bottom right, rgb(243,171,27), rgb(234,103,55))",
      newText: "昨日新增",
      newAmount: `${getOverviewdata?.data.data.yesterdayUserTotal}人`,
      text: "总用户数",
      totality: getOverviewdata?.data.data.userTotal,
      textTo: "人",
      icon: <Icon icon="el:user" color="white" width={24} />
    },
    {
      bg: "linear-gradient(to bottom right, rgb(69,166,244), rgb(57,96,244))",
      newText: "昨日新增",
      newAmount: `${getOverviewdata?.data.data.yesterdayIncomeTotal}元`,
      text: "总盈利",
      totality: getOverviewdata?.data.data.incomeTotal,
      textTo: "元",
      icon: <Icon icon="healthicons:money-bag" color="white" width={32} />
    },
    {
      bg: "linear-gradient(to bottom right, rgb(87,209,223), rgb(37,156,211))",
      newText: "昨日新增",
      newAmount: `${getOverviewdata?.data.data.yesterdayTradeTotal}元`,
      text: "总交易额",
      totality: getOverviewdata?.data.data.tradeTotal,
      textTo: "元",
      icon: (
        <Icon icon="icon-park-solid:notebook-one" color="white" width={28} />
      )
    },
    {
      bg: "linear-gradient(to bottom right, rgb(77,215,87), rgb(63,195,146))",
      newText: "昨日新增",
      newAmount: `${getOverviewdata?.data.data.yesterdayOrderCompleteTotal}个`,
      text: "订单完成量",
      totality: getOverviewdata?.data.data.orderCompleteTotal,
      textTo: "个",
      icon: <Icon icon="fluent:notepad-28-filled" color="white" width={32} />
    }
  ];

  // 用户曲线折线图
  const option = {
    title: {
      text: ""
    },
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: ["wx", "user"]
    },
    grid: {
      left: "2%",
      right: "7%",
      bottom: "0%",
      top: "10%",
      containLabel: true
    },
    toolbox: {
      feature: {}
    },
    xAxis: {
      type: "category",
      boundaryGap: true,
      data: getUserData?.data.data.map((res) => {
        return res.date;
      })
    },
    yAxis: {
      type: "value",
      interval: 25,
      min: 0,
      max: 100
    },
    series: [
      {
        name: "wx",
        type: "line",
        stack: "Total",
        color: "rgb(47,194,91)",
        data: getUserData?.data.data.map((res) => {
          return res.wx;
        })
      },
      {
        name: "user",
        type: "line",
        stack: "Total",
        color: "rgb(24,144,255)",
        data: getUserData?.data.data.map((res) => {
          return res.user;
        })
      }
    ]
  };
  // 订单折线表
  const option2 = {
    // 标题
    title: {
      text: ""
    },
    // 提示框
    tooltip: {
      trigger: "axis"
    },
    // 图例属性
    legend: {
      data: [
        "cancel",
        "close",
        "complete",
        "sending",
        "waitConfirm",
        "waitPay",
        "waitReceive"
      ],
      orient: "horizontal", // 设置图例为水平方向
      left: "center" // 设置图例居左对齐
      // bottom: "20px" // 设置图例距离底部的距离
    },
    // 图标网格大小
    grid: {
      left: "2%",
      right: "4%",
      bottom: "0%",
      top: "10%",
      containLabel: true
    },
    // 图表工具箱的属性
    toolbox: {
      feature: {}
    },
    // x轴
    xAxis: {
      type: "category",
      boundaryGap: true,
      data: AdminAnalysisNewOrderData?.data.data.map((res) => {
        return res.date;
      }),
      axisLine: {
        lineStyle: {
          color: "rgb(154,154,154)" // 这里是你想要的轴线颜色
        }
      },
      axisLabel: {
        color: "rgb(154,154,154)" // 这里是你想要的轴标签颜色
      }
    },
    // y轴
    yAxis: {
      type: "value",
      interval: 25,
      min: 0,
      max: 100,
      show: false
    },
    // 设置图表系列的属性
    series: [
      {
        name: "cancel",
        // line表示绘制的是线图
        type: "line",
        // 此处data代表每月的数据
        data: AdminAnalysisNewOrderData?.data.data.map((res) => {
          return res.cancel;
        })
      },
      {
        name: "close",
        type: "line",
        data: AdminAnalysisNewOrderData?.data.data.map((res) => {
          return res.close;
        })
      },
      {
        name: "complete",
        type: "line",
        data: AdminAnalysisNewOrderData?.data.data.map((res) => {
          return res.complete;
        })
      },
      {
        name: "sending",
        type: "line",
        data: AdminAnalysisNewOrderData?.data.data.map((res) => {
          return res.sending;
        })
      },
      {
        name: "waitConfirm",
        type: "line",
        data: AdminAnalysisNewOrderData?.data.data.map((res) => {
          return res.waitConfirm;
        })
      },
      {
        name: "waitPay",
        type: "line",
        data: AdminAnalysisNewOrderData?.data.data.map((res) => {
          return res.waitPay;
        })
      },
      {
        name: "waitReceive",
        type: "line",
        data: AdminAnalysisNewOrderData?.data.data.map((res) => {
          return res.waitReceive;
        })
      }
    ]
  };

  return (
    <Div className="page h-[100%] overflow-y-auto overflow-x-hidden lastBox text-[#333]">
      {/* 板块一 */}
      <div
        className="blockOne pb-[20px] box-border mb-[20px]"
        style={{ borderBottom: "1px solid #e8e8e8" }}
      >
        <h1 className="font-[500] mb-[60px]">数据总览</h1>
        <div className="flex justify-between items-center">
          {renderBolck.map((res, index) => {
            return (
              <div
                key={index}
                className="rounded-[4px] h-[100px] w-[100%] flex shadow-[0_0_5px_2px_rgba(0,0,0,0.05)] mx-[10px]"
              >
                <div className="w-[80px] relative text-[12px] text-center flex justify-end">
                  <div
                    className="flex items-center justify-center h-[60px] w-[60px] rounded-[4px] absolute right-0 top-[-20px]"
                    style={{ background: `${res.bg}` }}
                  >
                    {res.icon}
                  </div>
                  <div className="w-[60px] mt-[46px]">
                    <p className="text-[#999] leading-[18px]">{res.newText}</p>
                    <p className="text-[#666] leading-[18px]">
                      {res.newAmount}
                    </p>
                  </div>
                </div>
                <div className="w-[100px] flex flex-col justify-center items-end">
                  <div className="">
                    <p className="text-[14px]">{res.text}</p>
                    <p className="text-[20px] h-[36px] leading-[36px]">
                      {res.totality}
                      <span className="text-[12px] ml-[6px]">{res.textTo}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* 板块二 */}
      <div className="blockTwo flex items-center justify-between h-[622px] mb-[20px]">
        <div className="w-[100%] h-[100%] shadow-[0_0_5px_2px_rgb(0,0,0,0.05)] mx-[10px] p-[20px] box-border">
          <h1 className="text-[20px] leading-[30px] text-[#999] mb-[12px] font-[500]">
            用户数据曲线
          </h1>
          <div>
            <div className="flex items-center">
              <p>按时间查询：</p>
              <RangePicker
                defaultValue={[
                  dayjs("2015-01-01", "YYYY-MM-DD"),
                  dayjs("2015-01-01", "YYYY-MM-DD")
                ]}
                className="h-[40px] w-[358px] rounded-[2px] ml-[2px]"
              />
            </div>
          </div>
          <ReactECharts option={option} className="!w-[100%] mt-5 !h-[450px]" />
        </div>
        <div className="w-[100%] h-[100%] shadow-[0_0_5px_2px_rgb(0,0,0,0.05)] mx-[10px] p-[20px] box-border">
          <h1 className="text-[20px] leading-[30px] text-[#999] mb-[12px] font-[500]">
            订单数据
          </h1>
          <div>
            <div className="flex items-center">
              <p>按时间查询：</p>
              <RangePicker
                defaultValue={[
                  dayjs("2015-01-01", "YYYY-MM-DD"),
                  dayjs("2015-01-01", "YYYY-MM-DD")
                ]}
                className="h-[40px] w-[358px] rounded-[2px] ml-[2px]"
              />
            </div>
          </div>
          <div className="mt-[10px]">
            <div className="flex items-center justify-between">
              <div className="w-[50%] h-[125px] flex justify-center items-center">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-[30px] h-[30px] bg-[rgb(0,204,102)] rounded-tr-[10px] rounded-bl-[10px]">
                    <Icon icon="bxs:notepad" color="white" width={18} />
                  </div>
                  <p className="text-[12px] text-[#999] mt-[8px] leading-[18px]">
                    已完成
                  </p>
                  <p className="text-[18px] leading-[27px]">
                    <span>0</span>个
                  </p>
                </div>
              </div>
              <div className="w-[50%] h-[125px] flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-[30px] h-[30px] bg-[rgb(255,51,0)] rounded-tr-[10px] rounded-bl-[10px]">
                    <Icon
                      icon="fluent:notepad-edit-20-filled"
                      color="white"
                      width={18}
                    />
                  </div>
                  <p className="text-[12px] text-[#999] mt-[8px] leading-[18px]">
                    待确认
                  </p>
                  <p className="text-[18px] leading-[27px]">
                    <span>0</span>个
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="w-[50%] h-[125px] flex justify-center items-center">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-[30px] h-[30px] bg-[rgb(255,102,102)] rounded-tr-[10px] rounded-bl-[10px]">
                    <Icon
                      icon="ant-design:message-filled"
                      color="white"
                      width={16}
                    />
                  </div>
                  <p className="text-[12px] text-[#999] mt-[8px] leading-[18px]">
                    配送中
                  </p>
                  <p className="text-[18px] leading-[27px]">
                    <span>0</span>个
                  </p>
                </div>
              </div>
              <div className="w-[50%] h-[125px] flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-[30px] h-[30px] bg-[rgb(255,102,51)] rounded-tr-[10px] rounded-bl-[10px]">
                    <Icon
                      icon="fluent:notepad-28-filled"
                      color="white"
                      width={18}
                    />
                  </div>
                  <p className="text-[12px] text-[#999] mt-[8px] leading-[18px]">
                    待接单
                  </p>
                  <p className="text-[18px] leading-[27px]">
                    <span>0</span>个
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="w-[50%] h-[125px] flex justify-center items-center">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-[30px] h-[30px] bg-[rgb(0,153,255)] rounded-tr-[10px] rounded-bl-[10px]">
                    <Icon icon="ph:handbag-fill" color="white" width={18} />
                  </div>
                  <p className="text-[12px] text-[#999] mt-[8px] leading-[18px]">
                    待支付
                  </p>
                  <p className="text-[18px] leading-[27px]">
                    <span>0</span>个
                  </p>
                </div>
              </div>
              <div className="w-[50%] h-[125px] flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-[30px] h-[30px] bg-[rgb(170,170,170)] rounded-tr-[10px] rounded-bl-[10px]">
                    <Icon
                      icon="fluent:calendar-cancel-24-filled"
                      color="white"
                      width={18}
                    />
                  </div>
                  <p className="text-[12px] text-[#999] mt-[8px] leading-[18px]">
                    已取消
                  </p>
                  <p className="text-[18px] leading-[27px]">
                    <span>0</span>个
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="w-[50%] h-[125px] flex justify-center items-center">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-[30px] h-[30px] bg-[rgb(51,51,51)] rounded-tr-[10px] rounded-bl-[10px]">
                    <Icon icon="mdi:book-cancel" color="white" width={18} />
                  </div>
                  <p className="text-[12px] text-[#999] mt-[8px] leading-[18px]">
                    已关闭
                  </p>
                  <p className="text-[18px] leading-[27px]">
                    <span>0</span>个
                  </p>
                </div>
              </div>
              <div className="w-[50%] h-[125px] flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-[30px] h-[30px] bg-[rgb(255,102,153)] rounded-tr-[10px] rounded-bl-[10px]">
                    <Icon
                      icon="heroicons:receipt-refund-20-solid"
                      color="white"
                      width={16}
                    />
                  </div>
                  <p className="text-[12px] text-[#999] mt-[8px] leading-[18px]">
                    已退款
                  </p>
                  <p className="text-[18px] leading-[27px]">
                    <span>0</span>个
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 板块三 */}
      <div className="blockThree w-[calc(100%-20px)] h-[622px] shadow-[0_0_5px_2px_rgb(0,0,0,0.05)] mx-[10px] mb-[4px] p-[20px] box-border">
        <h1 className="text-[20px] leading-[30px] text-[#999] mb-[12px] font-[500]">
          订单曲线查询
        </h1>
        <div>
          <div className="flex items-center">
            <p>按时间查询：</p>
            <RangePicker
              defaultValue={[
                dayjs("2011-10-20", "YYYY-MM-DD"),
                dayjs("2011-10-20", "YYYY-MM-DD")
              ]}
              className="h-[40px] w-[358px] rounded-[2px] ml-[2px]"
            />
          </div>
        </div>
        <ReactECharts
          option={option2}
          className="!w-[100%]  !h-[calc(100%-82px)]"
        />
      </div>
    </Div>
  );
};

export default Home;
