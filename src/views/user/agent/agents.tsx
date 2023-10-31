/* eslint-disable no-console */
import { type FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import type { ColumnsType } from "antd/es/table";
import { adminAgent, putAgentStatus, AdminAgentResetPwd } from "@/service/api";
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
  .ant-select-selector,
  .ant-select-arrow {
    display: none !important;
  }
`;

const Agents: FC = () => {
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
      await adminAgent({
        current: currentPage,
        pageSize: 20,
        ...seachData // input框里的内容
      })
  );
  // 页面刷新
  useEffect(() => {
    refresh();
  }, [currentPage, count, seachData]);

  // 参数类型
  interface DataType {
    agentAccount: string;
    agentNo: string;
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
      dataIndex: "agentNo"
    },
    {
      title: "账号",
      dataIndex: ["agentAccount", "defaultPwd"],
      render: (text: string, record: any) => {
        return (
          <div>
            <span>{record.agentAccount}</span>
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
      render: (text: string, record: any) => (
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
              <Icon
                icon="fa6-solid:user-gear"
                color="#955CE6"
                width="18"
                onClick={() => {
                  navigate(`/user/admins?adminNo=${record.agentNo}`);
                }}
              />
            </Tooltip>
          </Tooltip>
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <div
                      onClick={() => {
                        navigate(
                          `/user/agent/edit/update/agentAccount=${record.agentAccount}&realName=${record.realName}&mobileNumber=${record.mobileNumber}&agentNo=${record.agentNo}&status=${record.status}`
                        );
                      }}
                    >
                      修改
                    </div>
                  )
                },
                {
                  key: "2",
                  label: (
                    <div
                      onClick={() => {
                        disableEnableFn(record.agentNo, "1");
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
                        disableEnableFn(record.agentNo, "0");
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
                        resetPasswordFn(record.agentNo);
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
  const disableEnableFn = (agentNo: string, status: string) => {
    putAgentStatus({ agentNo, status })
      .then(() => message.success("修改状态成功"))
      .catch(() => message.error("修改状态失败"));
    setCount(count + 10);
  };

  // 搜索功能
  const searchFn = (value: string | number) => {
    setSeachData(value);
  };

  // 重置密码
  const resetPasswordFn = (agentNo: string) => {
    AdminAgentResetPwd({ agentNo })
      .then((res: any) => {
        if (res.data.code === 200) {
          // 状态码为200，表示重置密码成功
          void message.success("重置密码成功");
        } else {
          // 状态码不为200，表示重置密码失败
          void message.error("重置密码失败");
        }
      })
      .catch(() => {
        void message.error("请求失败");
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
        <div className="text-[24px] font-medium">代理列表</div>
        {/* 搜索 */}
        <div className="mt-[20px]">
          <Form
            name="control-ref"
            style={{ maxWidth: "80vw" }}
            onFinish={searchFn}
          >
            <div className="flex flex-wrap justify-start">
              <Form.Item name="agentNo">
                <Input placeholder="代理编号" className="w-[200px] h-[40px]" />
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
            className="button-ant"
            onClick={() => {
              navigate("/user/agent/edit/add");
            }}
          >
            添加代理
          </Button>
          <Button
            type="primary"
            icon={
              <Icon
                icon="mdi-light:refresh"
                color="#000"
                className="text-[23px] "
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

export default Agents;
