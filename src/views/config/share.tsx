import { useState, type FC, useEffect } from "react";
import type { UploadProps } from "antd";
import { Form, Input, Button, Upload, message } from "antd";
import { Icon } from "@iconify/react";
import { configShare, postConfigShare } from "@/service/api";
import { useRequest } from "ahooks";

const Share: FC = () => {
  const [se, setSe] = useState<Res.configShare>();
  const [form] = Form.useForm();

  useEffect(() => {
    configShare()
      .then((res) => {
        setSe(res.data);
      })
      .catch((error) => error);
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      title: se?.data.title,
      desc: se?.data.desc,
      path: se?.data.path
    });
  }, [se]);

  const { run: Configpost } = useRequest(
    async (values: Req.ConfigShare) => await postConfigShare(values),
    {
      manual: true
    }
  );

  const props: UploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text"
    },
    onChange(info) {
      if (info.file.status === "done") {
        void message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        void message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  return (
    <div className="overflow-y-auto h-[540px] lastBox">
      <div className=" text-[20px] py-[16px] px-[24px] font-bold">分享设置</div>
      <Form
        form={form}
        className=" px-[50px]"
        name="appcorwx"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={Configpost}
        autoComplete="off"
        layout="vertical"
      >
        <div>
          <Form.Item
            label={
              <div className=" h-[40px] flex items-center">分享标题：</div>
            }
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="title"
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>

          <Form.Item
            label={
              <div className=" h-[40px] flex items-center">
                自定义分享描述：
              </div>
            }
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="desc"
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>

          <Form.Item
            label={
              <div className=" h-[40px] flex items-center">页面 path ：</div>
            }
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="path"
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>
          <div className=" mt-[-24px] mb-[24px] h-[40px] leading-[40px] text-[12px] text-[#999]">
            页面 path ，必须是以 / 开头的完整路径
          </div>
        </div>

        <Form.Item
          label={<div className=" h-[40px] flex items-center">分享图标：</div>}
          labelCol={{
            style: {
              padding: "0px"
            }
          }}
          className=" mb-[0px]"
        >
          <Upload {...props}>
            <Button className=" w-[200px] h-[160px] bg-[#f3f3f3]">
              <Icon className=" text-[32px]" icon="ion:image-outline" />
            </Button>
          </Upload>
        </Form.Item>
        <div className=" text-[12px] text-[#999] mt-[8px] mb-[12px]">
          <div className=" h-[18px]">上传格式:jpg,jpeg,png</div>
          <div className=" h-[18px]">最大限制2MB</div>
        </div>
        <div className=" h-[40px] text-[12px] text-[#999] leading-[40px] mb-[24px]">
          路径可以是本地文件路径、代码包文件路径或者网络图片路径。显示图片长宽比是
          5:4
        </div>

        <Form.Item wrapperCol={{ span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            className=" h-[40px] rounded-[4px]"
          >
            提交保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Share;
