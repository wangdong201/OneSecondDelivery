import { type FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, Table, Tag, Dropdown, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { MenuProps, PaginationProps } from "antd";
import {
  getRegistersData,
  putRegisters,
  putRegistersRefuse
} from "@/service/api";
import { Icon } from "@iconify/react";
import { useRequest } from "ahooks";

interface DataType {
  key: number;
  id: number;
  createTime: string;
  updateTime: string;
  realname: string;
  idCardNo: string;
  avatarFaceImage: string;
  nationalFaceImage: string;
  status: number;
  refuseReason: string;
  userNo: string;
  cityNo: string;
}
interface Registerss {
  idCardNo?: string;
  realname?: string;
  userNo?: string;
}
interface Putrefuse {
  refuseReason: string;
}

const showTotals: PaginationProps["showTotal"] = (total) => `共${total}条数据`;

const Registers: FC = () => {
  const navigate = useNavigate();
  const [rdata, setRData] = useState<Res.RegistersData>();
  const data: DataType[] = [];
  const [count, setCount] = useState(0);
  const [scount, setScount] = useState(0);
  const [objA, setObjA] = useState({});
  const [form] = Form.useForm();
  const [userNOValue, setUserNoValue] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

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
    getRegistersData({ ...objA, current: 1, pageSize: 20 })
      .then((res) => {
        setRData(res.data);
      })
      .catch((error) => error);
  }, [count, objA]);

  if (rdata?.data !== null) {
    rdata?.data.data.forEach((value, index) => {
      data.push({ ...value, key: index });
    });
  }

  const handleOk = () => {
    setIsModalOpen(false);
    setCount((e) => e + 1);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { run: pass } = useRequest(
    async (values: Req.PutRegisters) => await putRegisters(values),
    {
      manual: true
    }
  );

  const { run: refuse } = useRequest(
    async (values: Putrefuse) =>
      await putRegistersRefuse({ ...values, userNo: userNOValue }),
    {
      manual: true
    }
  );

  const rowSelection = {};

  const RegisterSs = ({ idCardNo, realname, userNo }: Registerss) => {
    const obj: Registerss = {};
    if (idCardNo !== undefined && idCardNo !== "") {
      obj.idCardNo = idCardNo;
    }

    if (realname !== undefined && realname !== "") {
      obj.realname = realname;
    }

    if (userNo !== undefined && userNo !== "") {
      obj.userNo = userNo;
    }
    setObjA(obj);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "用户编号",
      dataIndex: "userNo"
    },
    {
      title: "姓名",
      dataIndex: "realname"
    },
    {
      title: "身份证号码",
      dataIndex: "idCardNo"
    },
    {
      title: "身份证头像照片",
      dataIndex: "",
      render: (value: DataType) => {
        return (
          <div className=" w-[150px] h-[100px]">
            <img
              className=" w-[100%] h-[100%]"
              src={value.avatarFaceImage}
              alt=""
            />
          </div>
        );
      }
    },
    {
      title: "身份证国徽照片",
      dataIndex: "",
      render: (value: DataType) => {
        return (
          <div className=" w-[150px] h-[100px]">
            <img
              className=" w-[100%] h-[100%]"
              src={value.nationalFaceImage}
              alt=""
            />
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
              <Tag color="green">通过审核</Tag>
            ) : (
              <div>
                <Tag color="red">未通过</Tag>
                <div className=" text-[12px] text-[#999] mt-[8px]">
                  {value.refuseReason}
                </div>
              </div>
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
                  通过审核
                </a>
              ),
              disabled: true
            },
            {
              key: "2",
              label: (
                <a
                  onClick={() => {
                    showModal();
                    setUserNoValue(value.userNo);
                  }}
                  rel="noopener noreferrer"
                  href="#"
                >
                  拒绝通过
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
                    pass({ userNo: value.userNo });
                    setCount((e) => e + 1);
                  }}
                  rel="noopener noreferrer"
                  href="#"
                >
                  通过审核
                </a>
              )
            },
            {
              key: "2",
              label: (
                <a rel="noopener noreferrer" href="#">
                  拒绝通过
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
      <Form onFinish={RegisterSs} form={form}>
        <div className=" mt-[20px] flex flex-wrap">
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
              placeholder="身份证号码"
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
      <Modal
        title="拒绝理由"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          onFinish={(values) => {
            refuse(values);
            handleOk();
          }}
        >
          <div className=" py-[24px]">
            <Form.Item name="refuseReason" className="  w-[100%] mb-[0px]">
              <Input className=" h-[40px]" placeholder="请输入拒绝的理由" />
            </Form.Item>
          </div>
          <div className=" flex justify-end">
            <Form.Item className=" mb-[0px]">
              <Button onClick={handleCancel}>取消</Button>
            </Form.Item>
            <Form.Item className=" ml-[8px] mb-[0px]">
              <Button className=" bg-[#955ce6] text-[white]" htmlType="submit">
                确认
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Registers;
