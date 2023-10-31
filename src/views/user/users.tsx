/* eslint-disable no-console */
import { type FC, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import type { ColumnsType } from "antd/es/table";
import { getAdminUserList, putAdminUserStatus } from "@/service/api";
import { UserOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import {
  Input,
  Select,
  Form,
  Button,
  Table,
  Tag,
  Dropdown,
  message,
  Avatar
} from "antd";

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
  .ant-btn-primary {
    background-color: #955ce6;
    border-color: #955ce6;
    margin-left: 5px;
  }
  .button-ant {
    height: 40px !important;
  }
  .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item {
    padding: 0 !important;
    background-color: #fff !important;
  }
  .ant-select-selector,
  .ant-select-arrow {
    display: none !important;
  }
`;

const Users: FC = () => {
  const { Option } = Select;
  // 复选框
  const [selectionType] = useState<"checkbox" | "radio">("checkbox");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState({});
  const [count, setCount] = useState(0);

  // 代理列表数据请求
  // refresh 手动触发请求并更新数据
  const { data: AdminAgentListData, refresh } = useRequest(
    async () =>
      await getAdminUserList({
        current: currentPage,
        pageSize: 20,
        ...searchData // input框里的内容
      })
  );

  // 页面刷新
  useEffect(() => {
    console.log(AdminAgentListData);
    refresh();
  }, [currentPage, count, searchData]);

  // 参数类型
  interface DataType {
    id: number;
    createTime: string;
    updateTime: string;
    userNo: string;
    countryCode: string;
    mobileNumber: string;
    avatarUrl: string;
    nickName: string;
    gender: number;
    province: object;
    city: object;
    area: object;
    status: number;
    homeAddressNo: object;
    companyAddressNo: object;
  }

  // 表格头部以及渲染内容
  const columns: ColumnsType<DataType> = [
    {
      title: "编号",
      dataIndex: "userNo"
    },
    {
      title: "头像",
      dataIndex: "avatarUrl",
      render: (text: string, record: DataType) => {
        return (
          <div>
            {record.avatarUrl != null ? (
              <img
                src={record.avatarUrl}
                alt=""
                className="w-[30px] h-[30px] rounded-[50%]"
              />
            ) : (
              <Avatar icon={<UserOutlined />} />
            )}
          </div>
        );
      }
    },
    {
      title: "昵称",
      dataIndex: "nickName"
    },
    {
      title: "手机号",
      dataIndex: "mobileNumber"
    },
    {
      title: "地区",
      dataIndex: "city"
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
      dataIndex: "status",
      render: (text: string, record: DataType) => (
        <div className="flex items-center w-[32px] h-[24px]">
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <div>
                      <Button
                        type="text"
                        disabled={record.status === 1}
                        onClick={() => {
                          disableEnableFn(record.userNo, "1");
                        }}
                      >
                        启用
                      </Button>
                    </div>
                  )
                },
                {
                  key: "2",
                  label: (
                    <div>
                      <Button
                        type="text"
                        disabled={record.status === 0}
                        onClick={() => {
                          disableEnableFn(record.userNo, "0");
                        }}
                      >
                        禁用
                      </Button>
                    </div>
                  ),
                  disabled: record.status === 0
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
  const disableEnableFn = (userNo: string, status: string) => {
    putAdminUserStatus({ userNo, status })
      .then(() => message.success("修改状态成功"))
      .catch(() => message.error("修改状态失败"));
    setCount(count + 1);
  };

  // 搜索功能
  const searchFn = (value: string | number) => {
    setSearchData(value);
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
        <div className="text-[24px] font-medium">用户列表</div>
        {/* 搜索 */}
        <div className="mt-[20px]">
          <Form
            name="control-ref"
            style={{ maxWidth: "80vw" }}
            onFinish={searchFn}
          >
            <div className="flex flex-wrap justify-start">
              <Form.Item name="userNo">
                <Input placeholder="用户列表" className="w-[200px] h-[40px]" />
              </Form.Item>
              <Form.Item name="nickName">
                <Input placeholder="昵称" className="w-[200px] h-[40px]" />
              </Form.Item>
              <Form.Item name="mobileNumber">
                <Input placeholder="手机号" className="w-[200px] h-[40px]" />
              </Form.Item>
              <Form.Item name="status">
                <Select placeholder="状态：全部" className="w-[200px]">
                  <Option>状态：全部</Option>
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
        <div className="flex items-center justify-end">
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

export default Users;
