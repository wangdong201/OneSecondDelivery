/* eslint-disable no-console */
import { type FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import type { ColumnsType } from "antd/es/table";
import { adminList, putAdminStatus, putAdminResetPwd } from "@/service/api";
import {
  Input,
  Select,
  Form,
  Button,
  Table,
  Tooltip,
  Tag,
  Dropdown,
  message
} from "antd";
import { useRequest } from "ahooks";

const Wrapper = styled.div`
  .ant-input {
    width: 200px !important;
    margin-right: 8px;
    margin-bottom: 8px;
  }
  .ant-select-selector {
    width: 200px !important;
    height: 40px !important;
    padding: 4px 11px !important;
    margin-bottom: 8px !important;
  }
  .ant-select-selection-search-input {
    height: 40px !important;
    padding-top: 10px;
  }
  .ant-form-item {
    margin-bottom: 0 !important;
  }
  .button-ant {
    height: 40px !important;
  }
  .ant-btn-primary {
    background-color: #955ce6;
    border-color: #955ce6;
    margin-left: 5px;
  }
`;

const Admins: FC = () => {
  const { Option } = Select;
  const navigate = useNavigate();
  // 复选框
  const [selectionType] = useState<"checkbox" | "radio">("checkbox");
  const [currentPage, setCurrentPage] = useState(1);
  const [seachData, setSeachData] = useState({});
  const [count, setCount] = useState(0);

  // 代理列表数据请求
  // refresh 手动触发请求并更新数据
  const { data: AdminAgentListData, refresh } = useRequest(
    async () =>
      await adminList({
        current: currentPage,
        pageSize: 20,
        ...seachData // input框里的内容
      })
  );
  // 页面刷新
  useEffect(() => {
    console.log(AdminAgentListData);
    refresh();
  }, [currentPage, count, seachData]);

  // 参数类型
  interface DataType {
    adminName: string;
    adminNo: string;
    createTime: string;
    defaultPwd: string;
    mobileNumber: string;
    realName: string;
    status: number;
    updateTime: string;
    updatedBy: string;
  }

  // 表格头部以及渲染内容
  const columns: ColumnsType<DataType> = [
    {
      title: "编号",
      dataIndex: "adminNo"
    },
    {
      title: "账号",
      dataIndex: ["adminName", "defaultPwd"],
      render: (text: string, record: any) => {
        return (
          <div>
            <span>{record.adminName}</span>
            <br />
            <span>初始密码{record.defaultPwd}</span>
          </div>
        );
      }
    },
    {
      title: "手机号",
      dataIndex: "mobileNumber"
    },
    {
      title: "姓名",
      dataIndex: "realName"
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (text: number) => (
        <Tag color={`${text === 0 ? "error" : text === 1 ? "success" : ""}`}>
          {text === 1 ? "启用" : "禁用"}
        </Tag>
      )
    },
    {
      title: "时间",
      dataIndex: ["createTime", "updateTime"],
      render: (text: string, record: DataType) => (
        <div>
          创建:{time(record.createTime)}
          <br />
          更新:{time(record.updateTime)}
        </div>
      )
    },
    {
      title: "操作",
      dataIndex: "1",
      render: (text: string, record: DataType) => (
        <div className="flex items-center">
          <Tooltip>
            <Tooltip title="操作人">
              <Icon icon="fa6-solid:user-gear" color="#955CE6" width="18" />
            </Tooltip>
          </Tooltip>
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: <div>修改</div>
                },
                {
                  key: "2",
                  label: (
                    <div
                      onClick={() => {
                        disableEnableFn(record.adminNo, "1");
                      }}
                    >
                      启用
                    </div>
                  ),
                  disabled: record.status === 1
                },
                {
                  key: "3",
                  label: (
                    <div
                      onClick={() => {
                        disableEnableFn(record.adminNo, "0");
                      }}
                    >
                      禁用
                    </div>
                  ),
                  disabled: record.status === 0
                },
                {
                  key: "4",
                  label: (
                    <div
                      onClick={() => {
                        resetPasswordFn(record.adminNo);
                      }}
                    >
                      重置密码
                    </div>
                  )
                }
              ]
            }}
            placement="bottom"
          >
            <Button className="h-[24px] w-[31.6px] px-[7px] border-[#955ce6] ml-[5px] flex items-center">
              <Icon icon="iconoir:more-horiz" color="#955CE6" width="30" />
            </Button>
          </Dropdown>
        </div>
      )
    }
  ];

  // 禁用启用功能
  const disableEnableFn = (adminNo: string, status: string) => {
    putAdminStatus({ adminNo, status })
      .then(() => message.success("修改状态成功"))
      .catch(() => message.error("修改状态失败"));
    setCount(count + 1);
  };

  // 搜索功能
  const searchFn = (value: string | number) => {
    setSeachData(value);
  };

  // 管理员重置密码
  const resetPasswordFn = (adminNo: string) => {
    putAdminResetPwd({ adminNo })
      .then((res: any) => {
        if (res.data.code === 200) {
          void message.success("重置密码成功");
        }
      })
      .catch(() => {
        void message.error("重置密码失败");
      });
  };

  // 时间转换函数
  function time(time: any) {
    const dateObj = new Date(time);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const hours = String(dateObj.getUTCHours() + 8).padStart(2, "0");
    const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");
    const TimeData = `${year}/${month}/${day} ${hours}:${minutes}`;
    return TimeData;
  }
  return (
    <Wrapper>
      <div className="p-[20px] overflow-y-auto h-[540px] lastBox">
        {/* 代理列表 */}
        <div className="text-[24px] font-medium">管理员列表</div>
        {/* 搜索 */}
        <div className="mt-[20px]">
          <Form
            name="control-ref"
            style={{ maxWidth: "80vw" }}
            onFinish={searchFn}
          >
            <div className="flex flex-wrap justify-start">
              <Form.Item name="adminNo">
                <Input
                  placeholder="管理员编号"
                  className="w-[200px] h-[40px]"
                />
              </Form.Item>
              <Form.Item name="agentAccount">
                <Input placeholder="账号" className="w-[200px] h-[40px]" />
              </Form.Item>
              <Form.Item name="mobileNumber">
                <Input placeholder="手机号" className="w-[200px] h-[40px]" />
              </Form.Item>
              <Form.Item name="realName">
                <Input placeholder="昵称" className="w-[200px] h-[40px]" />
              </Form.Item>
              <Form.Item name="status">
                <Select placeholder="状态：全部" className="w-[200px]">
                  <Option value="10">状态：全部</Option>
                  <Option value="1">状态：启用</Option>
                  <Option value="0">状态：禁用</Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item className="mt-[12px] mtx">
              <Button
                htmlType="button"
                className="w-[120px] button-ant"
                onClick={() => {
                  searchFn("");
                  refresh();
                }}
              >
                取消
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="w-[120px] ml-[10px] button-ant"
              >
                搜索
              </Button>
            </Form.Item>
          </Form>
        </div>
        {/* 分割线 */}
        <div className="h-[1px] bg-[#ccc] w-[100%] my-[24px]"></div>
        {/* 跳转添加代理页面 */}
        <div className="flex items-center justify-between">
          <Button
            type="primary"
            onClick={() => {
              navigate("/user/edit/add");
            }}
            className="button-ant"
          >
            添加管理员
          </Button>
          <Button
            type="primary"
            icon={
              <Icon
                icon="mdi-light:refresh"
                color="#000"
                className="text-[23px]"
              />
            }
            className="!w-[40px] !h-[40px] !bg-[#fff]"
          ></Button>
        </div>
        {/* 表格部分 */}
        <div className="mt-[20px]">
          <Table
            rowSelection={{
              type: selectionType
            }}
            columns={columns}
            dataSource={AdminAgentListData?.data.data.data.map(
              (item, index) => ({
                ...item,
                key: index // 使用数组索引作为key值
              })
            )}
            bordered={true}
            pagination={{
              pageSize: 20,
              showQuickJumper: true,
              showSizeChanger: true,
              total: AdminAgentListData?.data.data.count,
              showTotal: (total) => `共 ${total} 条数据`,
              onChange: (page) => {
                setCurrentPage(page);
              }
            }}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Admins;
