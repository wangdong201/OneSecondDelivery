/* eslint-disable no-console */
import { type FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Select,
  Table,
  Switch,
  Tag,
  Dropdown
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { MenuProps, PaginationProps } from "antd";
import { getRiders, putRider, putRidercz } from "@/service/api";
import { Icon } from "@iconify/react";
import { useRequest } from "ahooks";

interface DataType {
  key: number;
  id: number;
  createTime: string;
  updateTime: string;
  riderNo: string;
  status: number;
  userNo: string;
  startReceive: number;
  cityNo: string;
  realname: string;
  mobileNumber: string;
  avatarUrl: string;
  nickName: string;
}

interface RiderSS {
  idCardNo?: string;
  mobileNumber?: string;
  realname?: string;
  riderNo?: string;
  userNo?: string;
}

const showTotals: PaginationProps["showTotal"] = (total) => `共${total}条数据`;

const Riders: FC = () => {
  const navigate = useNavigate();
  const [rdata, setRData] = useState<Res.RidersType>();
  const data: DataType[] = [];
  const [count, setCount] = useState(0);
  const [scount, setScount] = useState(0);
  const [objA, setObjA] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      idCardNo: "",
      mobileNumber: "",
      realname: "",
      riderNo: "",
      userNo: ""
    });
  }, [scount]);

  useEffect(() => {
    getRiders({ ...objA, current: 1, pageSize: 20 })
      .then((res) => {
        setRData(res.data);
      })
      .catch((error) => error);
  }, [count, objA]);

  rdata?.data.data.forEach((value, index) => {
    data.push({ ...value, key: index });
  });

  const rowSelection = {};

  const { run: sta } = useRequest(
    async (putObj: Req.PutRider) => await putRider(putObj),
    {
      manual: true
    }
  );

  const { run: statuss } = useRequest(
    async (values: Req.PutRidercz) => await putRidercz(values),
    {
      manual: true
    }
  );

  const RiderSs = ({
    idCardNo,
    mobileNumber,
    realname,
    riderNo,
    userNo
  }: RiderSS) => {
    const obj: RiderSS = {};
    if (idCardNo !== undefined && idCardNo !== "") {
      obj.idCardNo = idCardNo;
    }
    if (mobileNumber !== undefined && mobileNumber !== "") {
      obj.mobileNumber = mobileNumber;
    }
    if (realname !== undefined && realname !== "") {
      obj.realname = realname;
    }
    if (riderNo !== undefined && riderNo !== "") {
      obj.riderNo = riderNo;
    }
    if (userNo !== undefined && userNo !== "") {
      obj.userNo = userNo;
    }
    setObjA(obj);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "编号",
      dataIndex: "riderNo"
    },
    {
      title: "用户",
      dataIndex: "",
      render: (value: DataType) => {
        return (
          <div className=" flex">
            <div className=" w-[32px] h-[32px] rounded-[50%] overflow-hidden">
              <img
                src={value.avatarUrl}
                className=" w-[100%] h-[100%]"
                alt=""
              />
            </div>
            <div className=" text-[12px] ml-[8px]">
              <div>{value.nickName}</div>
              <div className=" text-[#999]">{value.mobileNumber}</div>
            </div>
          </div>
        );
      }
    },
    {
      title: "身份",
      dataIndex: "realname"
    },
    {
      title: "账户余额",
      dataIndex: "",
      render: () => {
        return <div>元</div>;
      }
    },
    {
      title: "开启接单",
      dataIndex: "",
      render: (value: DataType) => {
        return (
          <div>
            {value.startReceive === 1 ? (
              <Switch
                onClick={(e: boolean) => {
                  sta({ riderNo: value.riderNo, startReceive: e });
                  setCount((e) => e + 1);
                }}
                defaultChecked
              />
            ) : (
              <Switch
                onClick={(e: boolean) => {
                  sta({ riderNo: value.riderNo, startReceive: e });
                  setCount((e) => e + 1);
                }}
              />
            )}
          </div>
        );
      }
    },
    {
      title: "状态",
      dataIndex: "",
      render: (value: DataType) => {
        return (
          <div>
            {value.status === 1 ? (
              <Tag color="green">启用</Tag>
            ) : (
              <Tag color="red">禁用</Tag>
            )}
          </div>
        );
      }
    },
    {
      title: "时间",
      dataIndex: "",
      render: (value: DataType) => {
        return (
          <div className=" text-[12px] text-[#333]">
            <div>创建:{new Date(value.createTime).toLocaleString()}</div>
            <div>更新:{new Date(value.updateTime).toLocaleString()}</div>
          </div>
        );
      }
    },
    {
      title: "操作",
      dataIndex: "",
      render: (value: DataType) => {
        let items: MenuProps["items"];
        if (value.status === 1) {
          items = [
            {
              key: "1",
              label: (
                <a rel="noopener noreferrer" href="#">
                  启用
                </a>
              ),
              disabled: true
            },
            {
              key: "2",
              label: (
                <a
                  onClick={() => {
                    statuss({ status: "0", userNo: value.userNo });
                    setCount((e) => e + 1);
                  }}
                  rel="noopener noreferrer"
                  href="#"
                >
                  禁用
                </a>
              )
            }
          ];
        } else {
          items = [
            {
              key: "1",
              label: (
                <a
                  onClick={() => {
                    statuss({ status: "1", userNo: value.userNo });
                    setCount((e) => e + 1);
                  }}
                  rel="noopener noreferrer"
                  href="#"
                >
                  启用
                </a>
              )
            },
            {
              key: "2",
              label: (
                <a rel="noopener noreferrer" href="#">
                  禁用
                </a>
              ),
              disabled: true
            }
          ];
        }
        return (
          <div>
            <Dropdown menu={{ items }} placement="bottomLeft">
              <Button className=" w-[31.6px] h-[24px] flex justify-center text-[#955ce6] border-[#955ce6]">
                <Icon className=" flex-shrink-0" icon="solar:menu-dots-bold" />
              </Button>
            </Dropdown>
          </div>
        );
      }
    }
  ];

  return (
    <div>
      <div className=" h-[36px] text-[24px]">骑手列表</div>
      <Form onFinish={RiderSs} form={form}>
        <div className=" mt-[20px] flex flex-wrap">
          <Form.Item name="riderNo" className="mb-0">
            <Input
              className=" w-[200px] h-[40px] mr-[8px] mb-[8px]"
              placeholder="骑手编号"
            />
          </Form.Item>

          <Form.Item name="userNo" className="mb-0">
            <Input
              className=" w-[200px] h-[40px] mr-[8px] mb-[8px]"
              placeholder="用户编号"
            />
          </Form.Item>

          <Form.Item name="realname" className="mb-0">
            <Input
              className=" w-[200px] h-[40px] mr-[8px] mb-[8px]"
              placeholder="真实姓名"
            />
          </Form.Item>

          <Form.Item name="idCardNo" className="mb-0">
            <Input
              className=" w-[200px] h-[40px] mr-[8px] mb-[8px]"
              placeholder="身份证号"
            />
          </Form.Item>

          <Form.Item name="mobileNumber" className="mb-0">
            <Input
              className=" w-[200px] h-[40px] mr-[8px] mb-[8px]"
              placeholder="手机号"
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <Select
              defaultValue="状态：全部"
              style={{ width: "200px", height: "40px", borderRadius: "4px" }}
              options={[
                { value: "全部", label: "状态：全部" },
                { value: "启用", label: "状态：启用" },
                { value: "禁用", label: "状态：禁用" }
              ]}
            />
          </Form.Item>
        </div>
        <div className=" mt-[12px] flex">
          <Form.Item className=" mb-0">
            <Button
              onClick={() => {
                setObjA({});
                setScount((e) => e + 1);
              }}
              className=" w-[120px] h-[40px] mr-[4px] rounded-[4px]"
            >
              取消
            </Button>
          </Form.Item>

          <Form.Item className=" mb-0">
            <Button
              htmlType="submit"
              className=" w-[120px] h-[40px] mr-[4px] rounded-[4px]"
              type="primary"
            >
              搜索
            </Button>
          </Form.Item>
        </div>
        <div className=" h-[1px] bg-[#e8e8e8] my-[24px]" />
      </Form>
      <div className=" flex justify-between">
        <Button
          onClick={() => {
            navigate("/rider/edit/add");
          }}
          className=" h-[40px] rounded-[4px]"
          type="primary"
        >
          新增一位骑手
        </Button>
        <Button className=" w-[40px] h-[40px] rounded-[4px] text-[16px] flex justify-center items-center">
          <Icon
            className=" flex-shrink-0"
            icon="clarity:refresh-line"
            rotate={1}
            onClick={() => {
              setObjA({});
            }}
          />
        </Button>
      </div>
      <Table
        className=" mt-[20px]"
        bordered
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={{
          total: data.length,
          showTotal: showTotals
        }}
      />
    </div>
  );
};

export default Riders;
