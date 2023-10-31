import { type FC, useState, useEffect, useRef } from "react";
import type { MenuProps } from "antd";
import { Icon } from "@iconify/react";
import { Button, Input, Divider, Table, Tooltip, Dropdown, Form } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getTag } from "@/service/api";
import { useRequest } from "ahooks";
import { NavLink } from "react-router-dom";

const Tag: FC = () => {
  const [seek, setSeek] = useState({});
  const { data: TagData, refresh } = useRequest(
    async () =>
      await getTag({
        current: 1,
        pageSize: 20,
        ...seek
      })
  );
  useEffect(() => {
    refresh();
  }, [refresh, seek]);

  const inputRef = useRef(null);
  const onFinish = (values: { tagName?: string }) => {
    setSeek(values);
    // console.log(values);
  };

  const tag = TagData?.data.data.data;
  // console.log(weight);
  interface DataType {
    key: number;
    id: number;
    groupName: string;
    tags: string;
    updateTime: React.ReactElement;
    operate: React.ReactElement;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "标签组名称",
      dataIndex: "groupName"
    },
    {
      title: "标签",
      dataIndex: "tags"
    },
    {
      title: "时间",
      dataIndex: "updateTime"
    },
    {
      title: "操作",
      dataIndex: "operate"
    }
  ];

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div>修改</div>
    },
    {
      key: "2",
      label: <div>删除</div>
    }
  ];

  const data: DataType[] = [];
  tag?.map((value, index) => {
    return data.push({
      key: index,
      id: value.id,
      groupName: value.groupName,
      tags: value.tags[0],
      updateTime: (
        <div>
          <div>创建:{value.createTime}</div>
          <div>更新:{value.updateTime}</div>
        </div>
      ),
      operate: (
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
          <div>
            <Dropdown menu={{ items }} className="w-[30px] h-[25px]">
              <Button>
                <Icon icon="ri:more-fill" className="ml-[-7px]" />
              </Button>
            </Dropdown>
          </div>
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
    <div className="h-[100%] overflow-y-scroll">
      <Form onFinish={onFinish}>
        <div className="text-[24px]">物品标签组列表</div>
        <div className="mt-[20px]">
          <Form.Item name="tagName">
            <Input
              placeholder="标签组名称"
              className="w-[200px] h-[40px] px-[11px] py-[4px]"
              ref={inputRef}
            />
          </Form.Item>
          <div className="flex items-center mt-[22px]">
            <Button className="w-[120px] h-[40px]">取消</Button>
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
          <Button type="primary" className="w-[130px] h-[40px]">
            添加物品标签组
          </Button>
          <Button
            icon={<Icon icon="clarity:refresh-line" rotate={1} />}
            style={{ width: "40px", height: "40px", fontSize: "18px" }}
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

export default Tag;
