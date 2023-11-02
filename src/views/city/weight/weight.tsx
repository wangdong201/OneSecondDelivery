import { type FC, useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import {
  Button,
  Input,
  Divider,
  Table,
  Tooltip,
  Dropdown,
  Form,
  message
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { deleteAdminCitysWeightDel, getWeight } from "@/service/api";
import { useRequest } from "ahooks";
import { NavLink } from "react-router-dom";

const Weight: FC = () => {
  const [seek, setSeek] = useState({});
  const { data: WeightData, refresh } = useRequest(
    async () =>
      await getWeight({
        current: 1,
        pageSize: 20,
        ...seek
      })
  );
  useEffect(() => {
    refresh();
  }, [refresh, seek]);

  const inputRef = useRef(null);
  const onFinish = (values: string | number) => {
    setSeek(values);
    // console.log(values);
  };

  const weight = WeightData?.data.data.data;
  // console.log(weight);
  interface DataType {
    key: number;
    id: number;
    tagName: string;
    label: string;
    updateTime: React.ReactElement;
    operate: React.ReactElement;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "标签名称",
      dataIndex: "tagName"
    },
    {
      title: "重量标签",
      dataIndex: "label"
    },
    {
      title: "时间",
      dataIndex: "updateTime"
    },
    {
      title: "操作",
      dataIndex: "operate",
      render: (text: string, record: DataType) => (
        <div className="flex items-center">
          <div>
            <Tooltip placement="top" title={"操作人"}>
              <NavLink to={"/user/admins"}>
                <Icon
                  icon="clarity:administrator-solid"
                  className="text-[20px] text-[#955ce6]"
                />
              </NavLink>
            </Tooltip>
          </div>
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <div>
                      <NavLink to={"/city/weight/edit/update"}>修改</NavLink>
                    </div>
                  )
                },
                {
                  key: "2",
                  label: (
                    <div
                      onClick={() => {
                        deleteAdmin(record.id);
                        refresh();
                      }}
                    >
                      删除
                    </div>
                  )
                }
              ]
            }}
            className="w-[30px] h-[25px] ml-1"
          >
            <Button>
              <Icon icon="ri:more-fill" className="ml-[-7px]" />
            </Button>
          </Dropdown>
        </div>
      )
    }
  ];

  const deleteAdmin = (id: number) => {
    deleteAdminCitysWeightDel({ id })
      .then(() => {
        void message.success("删除成功");
      })
      .catch(() => {
        void message.error("删除失败");
      });
  };

  const data: DataType[] = [];
  weight?.map((value, index) => {
    return data.push({
      key: index,
      id: value.id,
      tagName: value.tagName,
      label: value.tags[0].label,
      updateTime: (
        <div>
          <div>创建:{new Date(value.createTime).toLocaleString()}</div>
          <div>更新:{new Date(value.updateTime).toLocaleString()}</div>
        </div>
      ),
      operate: <div></div>
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
    <div className="h-[100%] overflow-y-scroll">
      <Form onFinish={onFinish}>
        <div className="text-[24px]">重量标签列表</div>
        <div className="mt-[20px]">
          <Form.Item name="tagName">
            <Input
              placeholder="标签名称"
              className="w-[200px] h-[40px] px-[11px] py-[4px]"
              ref={inputRef}
            />
          </Form.Item>
          <div className="flex items-center mt-[22px]">
            <Button
              className="w-[120px] h-[40px]"
              onClick={() => {
                onFinish("");
                refresh();
              }}
            >
              取消
            </Button>
            <Form.Item className="m-0">
              <Button
                type="primary"
                htmlType="submit"
                className="w-[120px] h-[40px] ml-[5px]"
              >
                搜索
              </Button>
            </Form.Item>
          </div>
        </div>
        <Divider />
        <div className="mb-[24px] flex justify-between">
          <Button type="primary" className="w-[120px] h-[40px]">
            <NavLink to={"/city/weight/edit/add"}>添加重量标签</NavLink>
          </Button>
          <Button
            icon={<Icon icon="clarity:refresh-line" rotate={1} />}
            style={{ width: "40px", height: "40px", fontSize: "18px" }}
            onClick={() => {
              refresh();
            }}
          />
        </div>
        <div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            bordered={true}
          />
        </div>
      </Form>
    </div>
  );
};

export default Weight;
