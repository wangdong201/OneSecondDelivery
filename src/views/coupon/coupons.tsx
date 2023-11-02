/* eslint-disable no-console */
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Button, Dropdown, Input, Select, Table, Form, message } from "antd";
import { type ColumnsType } from "antd/es/table";
import { useState, type FC, useRef, useEffect } from "react";
import { adminCoupon, adminInfo, putCouponsState } from "@/service/api";
import { useRequest } from "ahooks";

interface DataType {
  key: React.Key;
  couponName: string;
  conditionService: React.ReactNode;
  discountAmount: string;
  conditionsAmount: string;
  deadlineDays: React.ReactNode;
  limitNumber: React.ReactNode;
  cumulativeUseNo: string;
  state: React.ReactNode;
  Time: React.ReactNode;
  operate: React.ReactNode;
}

const couponsTitle: ColumnsType<DataType> = [
  {
    title: "优惠券名称",
    dataIndex: "couponName"
  },
  {
    title: "适用范围",
    dataIndex: "conditionService"
  },
  {
    title: "优惠金额",
    dataIndex: "discountAmount"
  },
  {
    title: "满足条件",
    dataIndex: "conditionsAmount"
  },
  {
    title: "有效天数",
    dataIndex: "deadlineDays"
  },
  {
    title: "领取人数",
    dataIndex: "limitNumber"
  },
  {
    title: "使用人数",
    dataIndex: "cumulativeUseNo"
  },
  {
    title: "状态",
    dataIndex: "state"
  },
  {
    title: "时间",
    dataIndex: "Time"
  },
  {
    title: "操作",
    dataIndex: "operate"
  }
];

const Coupons: FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({});
  const [info, setInfo] = useState<Res.AdminInfo>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const inputRef = useRef(null);
  const [form] = Form.useForm();

  const { data: couponData, refresh } = useRequest(
    async () => await adminCoupon({ current: 1, pageSize: 300, ...search })
  );
  useEffect(() => {
    refresh();
  }, [refresh, search]);

  useEffect(() => {
    adminInfo()
      .then((res) => {
        // console.log(res);
        setInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 更改状态请求
  const onFinishStatus = (couponNo: string, status: string) => {
    void putCouponsState({ couponNo, status }).then((res) => {
      if (res.data.code === 200) {
        void message.success(res.data.msg);
        refresh();
      }
    });
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const onFinish = (values: string | number) => {
    setSearch(values);
  };
  // 取消搜索
  const CancelSearch = () => {
    form.resetFields();
    refresh();
    setSearch(() => null);
  };

  // 优惠券列表数据
  const data: DataType[] = [];
  couponData?.data.data.data.forEach((item: Res.couponData, index) => {
    data.push({
      key: index,
      // 优惠券名称
      couponName: `${item.couponName}`,
      // 适用范围
      conditionService:
        item?.conditionService === "helpDeliver" ? (
          <span
            className="text-[#13c2c2] bg-[#e6fffb] text-[12px] mr-[8px] rounded-[4px] px-[7px] whitespace-nowrap inline-block"
            style={{ border: "1px solid #13c2c2" }}
          >
            帮我送
          </span>
        ) : item.conditionService === "helpGet" ? (
          <span
            className="text-[#1890ff] bg-[#91d5ff] text-[12px] mr-[8px] rounded-[4px] px-[7px] whitespace-nowrap inline-block"
            style={{ border: "1px solid #1890ff" }}
          >
            帮我取
          </span>
        ) : item.conditionService === "helpBuy" ? (
          <span
            className="ext-[#722ed1] bg-[#d3adf7] text-[12px] mr-[8px] rounded-[4px] px-[7px] whitespace-nowrap inline-block"
            style={{ border: "1px solid #722ed1" }}
          >
            帮我买
          </span>
        ) : item.conditionService === "ALL" ? (
          <span
            className="text-[#52c41a] bg-[#b7eb8f] text-[12px] mr-[8px] rounded-[4px] px-[7px] whitespace-nowrap inline-block"
            style={{ border: "1px solid #52c41a" }}
          >
            所有
          </span>
        ) : null,
      // 优惠金额
      discountAmount: `${item.discountAmount}元`,
      // 满足条件
      conditionsAmount: `${item.conditionsAmount}元`,
      // 有效天数
      deadlineDays:
        item.deadlineDays === -1 ? (
          <span>不限天数</span>
        ) : (
          <span>{item.deadlineDays}天</span>
        ),
      // 领取人数
      limitNumber:
        item.limitNumber === -1 ? (
          <span>{item.cumulativeDrawNo}/不限</span>
        ) : (
          <span>
            {item.cumulativeDrawNo}/{item.limitNumber}
          </span>
        ),
      // 使用人数
      cumulativeUseNo: `${item.cumulativeDrawNo}/${item.cumulativeUseNo}`,
      // 状态
      state:
        item.status === 1 ? (
          <div
            className=" w-[40px] h-[22px] text-[#52c41a] text-[12px] mr-[8px] px-[7px] rounded-[4px] bg-[#f6ffed]"
            style={{ border: "1px solid #b7eb8f" }}
          >
            启用
          </div>
        ) : (
          <div
            className=" w-[40px] h-[22px] text-[#f5222d] text-[12px] mr-[8px] px-[7px] rounded-[4px] bg-[#fff1f0]"
            style={{ border: "1px solid #ffa39e" }}
          >
            禁用
          </div>
        ),
      // 时间
      Time: (
        <div>
          <p className="m-0">
            创建:{new Date(item.createTime).toLocaleString()}
          </p>
          <p className="m-0">
            更新:{new Date(item.updateTime).toLocaleString()}
          </p>
        </div>
      ),
      // 操作
      operate: (
        <div className=" flex items-center">
          <Icon
            icon="bi:person-fill-gear"
            fontSize="18px"
            color="#955ce6"
            onClick={() => {
              navigate(`/user/admins?adminNo=${info?.data.adminNo}`);
            }}
          />
          <Dropdown
            placement="bottom"
            dropdownRender={() => {
              return (
                <div className=" bg-[white] z-[3] flex flex-col items-start">
                  <Button
                    type="text"
                    onClick={() => {
                      navigate(
                        `/coupon/edit/update/id=${item.id}&createTime=${item.createTime}&updateTime=${item.updateTime}&couponNo=${item.couponNo}&couponName=${item.couponName}&deadlineDays=${item.deadlineDays}&discountAmount=${item.discountAmount}&conditionsAmount=${item.conditionsAmount}&conditionService=${item.conditionService}&cumulativeDrawNo=${item.cumulativeDrawNo}&cumulativeUseNo=${item.cumulativeUseNo}&limitNumber=${item.limitNumber}&status=${item.status}&updatedBy=${item.updatedBy}`
                      );
                    }}
                  >
                    修改
                  </Button>
                  {item.status === 0 ? (
                    <Button
                      type="text"
                      onClick={() => {
                        onFinishStatus(item.couponNo, "1");
                      }}
                    >
                      启用
                    </Button>
                  ) : (
                    <Button
                      type="text"
                      disabled
                      onClick={() => {
                        onFinishStatus(item.couponNo, "1");
                      }}
                    >
                      启用
                    </Button>
                  )}
                  {item.status === 1 ? (
                    <Button
                      type="text"
                      onClick={() => {
                        onFinishStatus(item.couponNo, "0");
                      }}
                    >
                      禁用
                    </Button>
                  ) : (
                    <Button
                      type="text"
                      disabled
                      onClick={() => {
                        onFinishStatus(item.couponNo, "0");
                      }}
                    >
                      禁用
                    </Button>
                  )}
                </div>
              );
            }}
          >
            <Icon
              icon="ri:more-fill"
              className="w-[32px] h-[24px] text-[20px] border-[1px] border-solid rounded-[4px] my-[4px] mx-[8px]"
            />
          </Dropdown>
        </div>
      )
    });
  });

  return (
    <div className=" w-[100%] h-[100%] overflow-y-scroll">
      <div className="h-[36px] leading-[36px] text-[24px] text-[#333333]">
        优惠券列表
      </div>
      <Form onFinish={onFinish} form={form}>
        <div className=" mt-[20px]">
          <div className=" flex">
            <Form.Item name="couponName">
              <Input
                placeholder="优惠券名称"
                className=" w-[200px] h-[40px] mr-[8px] mb-[8px]"
                ref={inputRef}
              />
            </Form.Item>
            <Form.Item name="conditionService">
              <Select
                placeholder={"优惠券类型"}
                style={{
                  width: 200,
                  height: 40,
                  marginBottom: 8,
                  marginRight: 8
                }}
                options={[
                  { label: "类型：所有" },
                  { value: "ALL", label: "类型：全部类型" },
                  { value: "helpDeliver", label: "类型：帮我送" },
                  { value: "helpGet", label: "类型：帮我取" },
                  { value: "helpBuy", label: "类型：帮我买" }
                ]}
              />
            </Form.Item>
            <Form.Item name="status">
              <Select
                placeholder={"状态"}
                style={{
                  width: 200,
                  height: 40,
                  marginBottom: 8,
                  marginRight: 8
                }}
                options={[
                  { label: "状态：全部" },
                  { value: "1", label: "状态：启用" },
                  { value: "0", label: "状态：禁用" }
                ]}
              />
            </Form.Item>
          </div>
          <div className="mt-[12px] flex">
            <Form.Item>
              <Button
                // htmlType="submit"
                className="w-[120px] h-[40px] mr-[5px]"
                onClick={() => {
                  onFinish("");
                  CancelSearch();
                }}
              >
                取 消
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-[120px] h-[40px]"
              >
                搜 索
              </Button>
            </Form.Item>
          </div>
        </div>
        <div className=" h-[1px] bg-[#e8e8e8] my-[24px]"></div>
        <div className=" flex justify-between">
          <Button
            type="primary"
            className="w-[100px] h-[40px]"
            onClick={() => {
              navigate("/coupon/edit/add");
            }}
          >
            添加优惠券
          </Button>
          <Button
            className=" w-[40px] h-[40px] p-0 flex items-center justify-center"
            onClick={() => {
              onFinish("");
              refresh();
            }}
          >
            <Icon icon="codicon:refresh" rotate={2} className=" text-[21px]" />
          </Button>
        </div>
        <div className="mt-[20px]">
          <Table
            bordered
            rowSelection={rowSelection}
            columns={couponsTitle}
            dataSource={data}
            pagination={{
              defaultPageSize: 20,
              defaultCurrent: 1,
              showTotal: () => `共${couponData?.data.data.count}条数据`,
              showSizeChanger: false,
              showQuickJumper: true
            }}
          />
        </div>
      </Form>
    </div>
  );
};

export default Coupons;
