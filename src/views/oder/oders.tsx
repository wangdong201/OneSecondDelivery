/* eslint-disable no-console */
import { useState, type FC, useEffect, useRef } from "react";
import { Input, Select, Button, Table, Dropdown, Form } from "antd";
import { Icon } from "@iconify/react";
import type { ColumnsType } from "antd/es/table";
import { getAdminInfoOne, adminOrder } from "@/service/api";
// import { useRequest } from "ahooks";
import { useNavigate } from "react-router-dom";

const Oders: FC = () => {
  // const [dynamic,setDynamic]=useState({});
  const items = [
    {
      key: "1",
      label: "接单",
      disabled: true
    },
    {
      key: "2",
      label: "配送完成",
      disabled: true
    },
    {
      key: "3",
      label: "确认完成",
      disabled: true
    },
    {
      key: "4",
      label: "取消",
      disabled: true
    }
  ];
  const [search, setSearch] = useState({});
  const [data, setData] = useState<Res.ResponseData>();
  const navigate = useNavigate();
  // const { data, refresh } = useRequest(
  //   async () => await adminOrder({ current: 1, pageSize: 104, ...search })
  // );
  useEffect(() => {
    adminOrder({ current: 1, pageSize: 104, ...search })
      .then((res) => {
        // console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);
  const deta = data?.data.data;
  // console.log(deta);
  // const OdersID = ["用户编号", "订单编号", "骑手编号", "用户手机号"];
  const inputRef = useRef(null);
  // 取消搜索
  const [form] = Form.useForm();
  const CancelSearch = () => {
    form.resetFields();
    // refresh();
    setSearch(() => null);
  };
  useEffect(() => {
    // refresh();
  }, [search]);
  interface Account {
    userNo?: number | string;
    orderNo?: number | string;
    riderNo?: number | string;
    mobileNumber?: number | string;
    status?: number | string | null;
  }
  const onFinish = ({
    userNo,
    orderNo,
    riderNo,
    mobileNumber,
    status
  }: Account) => {
    const obj: Account = {};
    if (userNo !== undefined && userNo !== "") {
      obj.userNo = userNo;
    }
    if (orderNo !== undefined && orderNo !== "") {
      obj.orderNo = orderNo;
    }
    if (riderNo !== undefined && riderNo !== "") {
      obj.riderNo = riderNo;
    }
    if (mobileNumber !== undefined && mobileNumber !== "") {
      obj.mobileNumber = mobileNumber;
    }
    obj.status = status;
    setSearch(obj);
    // setSearch({ userNo, orderNo, riderNo, mobileNumber });
  };
  useEffect(() => {
    getAdminInfoOne()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  // name判断
  // const Account =( {
  //   userNo: "userNo",
  //   orderNo: "orderNo",
  //   mobileNumber: "mobileNumber",
  //   riderNo: "riderNo"
  // });
  interface DataType {
    key: React.Key;
    id: React.ReactElement;
    user: React.ReactElement;
    amount: React.ReactElement;
    message: React.ReactElement;
    status: React.ReactElement;
    sale: React.ReactElement;
    time: React.ReactElement;
    controls: React.ReactElement;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "编号",
      dataIndex: "id"
    },
    {
      title: "下单用户",
      dataIndex: "user"
    },
    {
      title: "下单金额",
      dataIndex: "amount"
    },
    {
      title: "下单信息",
      dataIndex: "message"
    },
    {
      title: "状态",
      dataIndex: "status"
    },
    {
      title: "售后",
      dataIndex: "sale"
    },
    {
      title: "时间",
      dataIndex: "time"
    },
    {
      title: "操作",
      dataIndex: "controls"
    }
  ];

  const dataer: DataType[] = [];
  deta?.map((value: any, index) => {
    const list1 = value.startAddress;
    const list2 = value.endAddress;

    return dataer.push({
      key: index,
      id: (
        <div className="w-[100px] h-auto text-[12px] text-[#333333] m-0 flex items-center justify-center">
          <div className="w-[100px] h-[54px]">{value.orderNo}</div>
        </div>
      ),
      user: (
        <div
          className="w-[100px] h-auto flex items-center"
          onClick={() => {
            navigate(`/user/users?userNo=${value.userNo}`);
          }}
        >
          <div className="w-[100px] h-[54px] flex items-center">
            <div className="w-[28.46],h-[32px] flex items-center">
              <img
                src={value.avatarUrl}
                alt=""
                style={{ width: 28.46, height: 32, borderRadius: "50%" }}
              />
            </div>
            <div>
              <div className="w-[74.7px] h-[36px] text-[12px] text-[#333333] flex justify-center items-center">
                {value.nickName}
              </div>
              <div className="w-[74.7px] h-[18px] text-[12px] text-[#999999] flex justify-center items-center">
                {value.mobileNumber}
              </div>
            </div>
          </div>
        </div>
      ),
      amount: (
        <div className="w-[100px] h-auto flex items-center">
          <div>
            {value.startPrice > 0 ? (
              <div className="w-[120px] h-[18px] flex items-center justify-between">
                <div className="text-[12px] text-[#333333]">起步价</div>
                <div className="text-[12px] text-[#333333]">
                  {value.startPrice}元
                </div>
              </div>
            ) : (
              <div className="w-[120px] h-auto flex items-center justify-between">
                <div className="text-[12px] text-[#333333]"></div>
              </div>
            )}
            {value.distancePrice > 0 ? (
              <div className="w-[120px] h-auto flex items-center justify-between">
                <div className="text-[12px] text-[#333333]">路程价</div>
                <div className="text-[12px] text-[#333333]">
                  {value.distancePrice}元
                </div>
              </div>
            ) : (
              <div className="w-[120px] h-auto flex items-center justify-between">
                <div className="text-[12px] text-[#333333]"></div>
              </div>
            )}
            {value.weightPrice > 0 ? (
              <div className="w-[120px] h-[18px] flex items-center justify-between">
                <div className="text-[12px] text-[#333333]">重量价</div>
                <div className="text-[12px] text-[#333333]">
                  {value.weightPrice}元
                </div>
              </div>
            ) : (
              <div className="w-[120px] h-auto flex items-center justify-between">
                <div className="text-[12px] text-[#333333]"></div>
              </div>
            )}
            {value.timePrice > 0 ? (
              <div className="w-[120px] h-[18px] flex items-center justify-between">
                <div className="text-[12px] text-[#333333]">时间阶段价</div>
                <div className="text-[12px] text-[#333333]">
                  {value.timePrice}元
                </div>
              </div>
            ) : (
              <div className="w-[120px] h-auto flex items-center justify-between">
                <div className="text-[12px] text-[#333333]"></div>
              </div>
            )}
            {value.payAmount > 0 ? (
              <div className="w-[120px] h-[18px] flex items-center justify-between font-bold">
                <div className="text-[12px] text-[#333333]">支付金额</div>
                <div className="text-[12px] text-[#333333]">
                  {value.payAmount}元
                </div>
              </div>
            ) : (
              <div className="w-[120px] h-auto flex items-center justify-between">
                <div className="text-[12px] text-[#333333]"></div>
              </div>
            )}
          </div>
        </div>
      ),
      message: (
        <div className="w-[135.5px] h-auto flex flex-col justify-center">
          <div className="w-[135.5px] h-auto text-[#333333] text-[12px] font-bold">
            {value.goodsDesc}
          </div>
          {index !== 1 ? (
            <>
              <div className="w-[135.5px] h-auto text-[#333333] text-[12px]">
                <span className=" font-bold text-[#666666]">起点：</span>
                <span className="text-[#999999]">
                  {list1?.city}
                  {list1?.district}
                  {list1?.addressDetail}
                </span>
              </div>
              <div className="text-[12px]">
                {list1?.contactName}-{list1?.mobileNumber}
              </div>
            </>
          ) : null}
          <div className="w-[135.5px] h-auto text-[#333333] text-[12px]">
            <span className=" font-bold text-[#666666]">终点：</span>
            <span className="text-[#999999]">
              {list2?.city}
              {list2?.district}
              {list2?.addressDetail}
            </span>
          </div>
          <div className="text-[12px]">
            {list2?.contactName}-{list2?.mobileNumber}
          </div>
        </div>
      ),
      status: (
        <div>
          {value.status === -1 ? (
            <div className="px-[7px] w-[51px] text-[#ffffff] bg-[#333333] rounded-[5px] mr-[8px] text-[12px]">
              已关闭
            </div>
          ) : value.status === -2 ? (
            <div className="px-[7px] w-[51px] text-[#ffffff] bg-[#cccccc] rounded-[5px] mr-[8px] text-[12px]">
              已取消
            </div>
          ) : value.status === 1 ? (
            <div className="px-[7px] w-[51px] text-[#ffffff] bg-[#cccccc] rounded-[5px] mr-[8px] text-[12px]">
              待付款
            </div>
          ) : value.status === 2 ? (
            <div className="px-[7px] w-[51px] text-[#ffffff] bg-[#cccccc] rounded-[5px] mr-[8px] text-[12px]">
              待接单
            </div>
          ) : value.status === 3 ? (
            <div className="px-[7px] w-[51px] text-[#ffffff] bg-[#cccccc] rounded-[5px] mr-[8px] text-[12px]">
              配送中
            </div>
          ) : value.status === 4 ? (
            <div className="px-[7px] w-[51px] text-[#ffffff] bg-[#cccccc] rounded-[5px] mr-[8px] text-[12px]">
              待确定完成
            </div>
          ) : value.status === 5 ? (
            <div className="px-[7px] w-[51px] text-[#ffffff] bg-[#cccccc] rounded-[5px] mr-[8px] text-[12px]">
              订单已完成
            </div>
          ) : null}
        </div>
      ),
      sale: (
        <div className="w-[36px] h-auto">
          <div className="text-[14px] text-[#333333]">无</div>
          {value.cancelReason === null ? (
            <>
              <div className="text-[12px] text-[#333333]">已退款 0元</div>
              <div className="text-[12px] text-[#999999]">No: Invalid Date</div>
            </>
          ) : (
            <div className="text-[12px] text-[#999999]">
              {value.cancelReason}
            </div>
          )}
        </div>
      ),
      time: (
        <div>
          <div className="text-[12px] text-[#333333]">
            创建:{new Date(value.createTime).toLocaleString()}
          </div>
          <div className="text-[12px] text-[#333333]">
            更新:{new Date(value.updateTime).toLocaleString()}
          </div>
          <div className="text-[12px] text-[#333333]">
            取消:{new Date(value.updateTime).toLocaleString()}
          </div>
        </div>
      ),
      controls: (
        <div className=" flex items-center">
          <Dropdown menu={{ items }} placement="bottom">
            <Icon
              icon="ri:more-fill"
              color="#955ce6"
              className="w-[32px] h-[24px] text-[20px] border-[1px] border-solid rounded-[4px] my-[4px] mx-[8px]"
            />
          </Dropdown>
        </div>
      )
    });
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  return (
    <div className="w-[100%] h-[100%] overflow-auto" id="div">
      <Form onFinish={onFinish} form={form}>
        <div className="w-[100%] h-[36px] text-[#333333] text-[24px]">
          用户列表
        </div>
        <div className="w-[100%] h-[173px] mt-[20px] mb-[24px]">
          <div className=" w-auto h-auto">
            <div className="w-100% h-[48px] flex">
              <div className="pb-[8px] pr-[8px]">
                <Form.Item name="userNo">
                  <Input
                    placeholder="用户编号"
                    className="w-[200px] h-[40px] py-[4px] px-[11px]"
                    ref={inputRef}
                  />
                </Form.Item>
              </div>
              <div className="pb-[8px] pr-[8px]">
                <Form.Item name="orderNo">
                  <Input
                    placeholder="订单编号"
                    className="w-[200px] h-[40px] py-[4px] px-[11px]"
                    ref={inputRef}
                  />
                </Form.Item>
              </div>
              <div className="pb-[8px] pr-[8px]">
                <Form.Item name="riderNo">
                  <Input
                    placeholder="骑手编号"
                    className="w-[200px] h-[40px] py-[4px] px-[11px]"
                    ref={inputRef}
                  />
                </Form.Item>
              </div>
              <div className="pb-[8px] pr-[8px]">
                <Form.Item name="mobileNumber">
                  <Input
                    placeholder="用户手机号"
                    className="w-[200px] h-[40px] py-[4px] px-[11px]"
                    ref={inputRef}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="pb-[8px] pr-[8px] h-[48px]">
              <Form.Item name="status">
                <Select
                  ref={inputRef}
                  placeholder="状态："
                  style={{ width: 200, height: 40 }}
                  options={[
                    { value: null, label: "状态：全部" },
                    { value: -2, label: "取消订单" },
                    { value: -1, label: "交易关闭" },
                    { value: 1, label: "待付款" },
                    { value: 2, label: "待接单" },
                    { value: 3, label: "配送中" },
                    { value: 4, label: "待确定完成" },
                    { value: 5, label: "订单已完成" }
                  ]}
                />
              </Form.Item>
            </div>
          </div>
          <div className="w-[100%] h-[40px] mt-[12px] text-[#333333] text-[14px] flex">
            <Form.Item>
              <Button
                htmlType="submit"
                className="w-[120px] h-[40px] px-[15px] py-0 mr-[4px] rounded-[5px]"
                onClick={() => {
                  CancelSearch();
                }}
              >
                取消
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                className="w-[120px] h-[40px] px-[15px] py-0 rounded-[5px]"
                htmlType="submit"
              >
                搜索
              </Button>
            </Form.Item>
          </div>
        </div>
        <div className="w-[100%] h-[1px]  bg-[#E8E8E8] flex items-center justify-end mb-[20px]"></div>
        <Form.Item className="w-[100%] h-auto flex justify-end">
          <Button
            className="w-[40px] h-[40px] flex justify-center items-center p-0 "
            onClick={() => {
              setSearch({});
            }}
          >
            <Icon icon="mdi-light:refresh" rotate={2} className="text-[25px]" />
          </Button>
        </Form.Item>
        <Form.Item>
          <div>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={dataer}
              pagination={{
                showQuickJumper: true,
                showSizeChanger: false,
                pageSize: 20,
                defaultPageSize: 20,
                showTotal: () => `共${data?.data.pageSize}条数据`
              }}
            ></Table>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Oders;
