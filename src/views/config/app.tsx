import { useState, type FC, useEffect } from "react";
import { Tabs, Form, Button, Input } from "antd";
import type { TabsProps } from "antd";
import {
  configAppID,
  postConfigAppDs,
  configAppMch,
  postConfigAppMch,
  configAppMap,
  postConfigAppMap,
  configAppAli,
  postConfigAppAli,
  configAppCorwx,
  postConfigAppCorwx,
  postConfigAppCreate
} from "@/service/api";
import { useRequest } from "ahooks";

const Ds: FC = () => {
  const [idData, setIdData] = useState<Res.ConfigAppID>({
    code: 1,
    msg: "",
    data: {
      qqAppid: "",
      ttAppid: "",
      wxAppId: "",
      qqAppSecret: "",
      ttAppSecret: "",
      wxAppSecret: ""
    }
  });

  useEffect(() => {
    configAppID()
      .then((res) => {
        setIdData(res.data);
      })
      .catch((error) => error);
  }, []);

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      qqAppid: idData?.data.qqAppid ?? "",
      ttAppid: idData?.data.ttAppid ?? "",
      wxAppId: idData?.data.wxAppId ?? "",
      qqAppSecret: idData?.data.qqAppSecret ?? "",
      ttAppSecret: idData?.data.ttAppSecret ?? "",
      wxAppSecret: idData?.data.wxAppSecret ?? ""
    });
  }, [idData]);

  const { run: ConfigAppDs } = useRequest(
    async (values: Req.ConfigAppDs) => await postConfigAppDs(values),
    {
      manual: true
    }
  );

  return (
    <div>
      <Form
        form={form}
        className=" m-auto pt-[80px]"
        name="appauth"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 500 }}
        initialValues={{ remember: true }}
        onFinish={ConfigAppDs}
        autoComplete="off"
        layout="vertical"
      >
        <div>
          <div className=" flex justify-between h-[21px]">
            <div className=" text-[14px] font-bold">微信小程序配置</div>
            <div>
              <a href="#" className=" text-[14px] text-[#955ce6]">
                帮助
              </a>
            </div>
          </div>
          <Form.Item
            label={
              <div className=" h-[40px] flex items-center">小程序ID：</div>
            }
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="wxAppId"
            rules={[{ required: true, message: "请输入小程序id！" }]}
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>

          <Form.Item
            label={
              <div className=" h-[40px] flex items-center">小程序密钥：</div>
            }
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="wxAppSecret"
            rules={[{ required: true, message: "请输入小程序密钥！" }]}
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>
        </div>

        <div className=" h-[1px] bg-[#e8e8e8] my-[24px]" />

        <div>
          <div className=" flex justify-between h-[21px]">
            <div className=" text-[14px] font-bold">QQ小程序配置</div>
            <div>
              <a href="#" className=" text-[14px] text-[#955ce6]">
                帮助
              </a>
            </div>
          </div>
          <Form.Item
            label={
              <div className=" h-[40px] flex items-center">小程序ID：</div>
            }
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="qqAppid"
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>

          <Form.Item
            label={
              <div className=" h-[40px] flex items-center">小程序密钥：</div>
            }
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="qqAppSecret"
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>
        </div>

        <div className=" h-[1px] bg-[#e8e8e8] my-[24px]" />

        <div>
          <div className=" flex justify-between h-[21px]">
            <div className=" text-[14px] font-bold">字节跳动小程序配置</div>
            <div>
              <a href="#" className=" text-[14px] text-[#955ce6]">
                帮助
              </a>
            </div>
          </div>
          <Form.Item
            label={
              <div className=" h-[40px] flex items-center">小程序ID：</div>
            }
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="ttAppid"
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>

          <Form.Item
            label={
              <div className=" h-[40px] flex items-center">小程序密钥：</div>
            }
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="ttAppSecret"
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>
        </div>

        <Form.Item wrapperCol={{ span: 16 }}>
          <Button type="primary" htmlType="submit" className=" h-[40px]">
            提交保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const Ps: FC = () => {
  const [mcData, setMcData] = useState<Res.ConfigAppMch>();
  const [form] = Form.useForm();
  useEffect(() => {
    configAppMch()
      .then((res) => {
        setMcData(res.data);
      })
      .catch((error) => error);
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      wxMchId: mcData?.data.wxMchId,
      notifyUrl: mcData?.data.notifyUrl,
      wxMchSecert: mcData?.data.wxMchSecert
    });
  }, [mcData]);

  const { run: ConfigAppDs } = useRequest(
    async (values: Req.ConfigAppMch) => await postConfigAppMch(values),
    {
      manual: true
    }
  );

  return (
    <div>
      <Form
        form={form}
        className=" m-auto pt-[80px]"
        name="appmch"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 500 }}
        initialValues={{ remember: true }}
        onFinish={ConfigAppDs}
        autoComplete="off"
        layout="vertical"
      >
        <div>
          <div className=" flex justify-between h-[21px]">
            <div className=" text-[14px] font-bold">微信商户号配置</div>
            <div>
              <a href="#" className=" text-[14px] text-[#955ce6]">
                帮助
              </a>
            </div>
          </div>

          <Form.Item
            label={
              <div className=" h-[40px] flex items-center">微信商户ID：</div>
            }
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="wxMchId"
            rules={[{ required: true, message: "请输入微信商户ID！" }]}
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>

          <Form.Item
            label={
              <div className=" h-[40px] flex items-center">微信商户密钥：</div>
            }
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="wxMchSecert"
            rules={[{ required: true, message: "请输入微信商户密钥！" }]}
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>

          <Form.Item
            label={
              <div className=" h-[40px] flex items-center">回调地址：</div>
            }
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="notifyUrl"
            rules={[{ required: true, message: "请输入回调地址！" }]}
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>
        </div>
        <div className=" h-[40px] text-[12px] text-[#999] leading-[40px] mt-[-24px] mb-[24px]">
          输入域名即可，如：https://www.landalf.cn
        </div>

        <Form.Item wrapperCol={{ span: 16 }}>
          <Button type="primary" htmlType="submit" className=" h-[40px]">
            提交保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const Ms: FC = () => {
  const [mapData, setMapData] = useState<Res.ConfigAppMap>();
  const [form] = Form.useForm();

  useEffect(() => {
    configAppMap()
      .then((res) => {
        setMapData(res.data);
      })
      .catch((error) => error);
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      mapKey: mapData?.data.mapKey
    });
  }, [mapData]);

  const { run: configAppMs } = useRequest(
    async (values: Req.ConfigAppMap) => await postConfigAppMap(values),
    {
      manual: true
    }
  );

  return (
    <div>
      <Form
        form={form}
        className=" m-auto pt-[80px]"
        name="configAppmap"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 500 }}
        initialValues={{ remember: true }}
        onFinish={configAppMs}
        autoComplete="off"
        layout="vertical"
      >
        <div>
          <div className=" text-[14px] font-bold">地图配置</div>

          <Form.Item
            label={
              <div className=" h-[40px] flex items-center">腾讯地图key</div>
            }
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="mapKey"
            rules={[{ required: true, message: "腾讯地图key！" }]}
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>
        </div>

        <Form.Item wrapperCol={{ span: 16 }}>
          <Button type="primary" htmlType="submit" className=" h-[40px]">
            提交保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const ACs: FC = () => {
  const [ali, setAli] = useState<Res.ConfigAppAli>();
  const [form] = Form.useForm();
  useEffect(() => {
    configAppAli()
      .then((res) => {
        setAli(res.data);
      })
      .catch((error) => error);
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      accessKeyId: ali?.data.accessKeyId,
      accessKeySecret: ali?.data.accessKeySecret,
      arn: ali?.data.arn,
      ossBucket: ali?.data.ossBucket,
      ossRegion: ali?.data.ossRegion,
      smsSignName: ali?.data.smsSignName,
      smsTemplateCode: ali?.data.smsTemplateCode
    });
  }, [ali]);

  const { run: ConfigAppACs } = useRequest(
    async (values: Req.ConfigAppAli) => await postConfigAppAli(values),
    {
      manual: true
    }
  );

  return (
    <div>
      <Form
        form={form}
        className=" m-auto pt-[80px]"
        name="appali"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 500 }}
        initialValues={{ remember: true }}
        onFinish={ConfigAppACs}
        autoComplete="off"
        layout="vertical"
      >
        <div>
          <div className=" flex justify-between h-[21px]">
            <div className=" text-[14px] font-bold">阿里云配置</div>
            <div>
              <a href="#" className=" text-[14px] text-[#955ce6]">
                帮助
              </a>
            </div>
          </div>
          <Form.Item
            label={
              <div className=" h-[40px] flex items-center">AccessKey ID：</div>
            }
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="accessKeyId"
            rules={[{ required: true, message: "请输入AccessKey ID！" }]}
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>

          <Form.Item
            label={
              <div className=" h-[40px] flex items-center">秘钥 Secret：</div>
            }
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="accessKeySecret"
            rules={[{ required: true, message: "请输入秘钥 Secret！" }]}
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>

          <Form.Item
            label={<div className=" h-[40px] flex items-center">ARN：</div>}
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="arn"
            rules={[{ required: true, message: "请输入ARN！" }]}
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>

          <Form.Item
            label={
              <div className=" h-[40px] flex items-center">
                对象存储Oss Region：
              </div>
            }
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="ossRegion"
            rules={[{ required: true, message: "请输入对象存储Oss Region！" }]}
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>

          <Form.Item
            label={
              <div className=" h-[40px] flex items-center">
                对象存储Oss Bucket：
              </div>
            }
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="ossBucket"
            rules={[{ required: true, message: "请输入对象存储Oss Bucket！" }]}
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>
        </div>

        <div>
          <div className=" flex justify-between h-[21px]">
            <div className=" text-[14px] font-bold">阿里云短信验证码</div>
            <div>
              <a href="#" className=" text-[14px] text-[#955ce6]">
                帮助
              </a>
            </div>
          </div>
          <Form.Item
            label={
              <div className=" h-[40px] flex items-center">签名名称：</div>
            }
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="smsSignName"
            rules={[{ required: true, message: "请输入签名名称！" }]}
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>

          <Form.Item
            label={
              <div className=" h-[40px] flex items-center">模板CODE：</div>
            }
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="smsTemplateCode"
            rules={[{ required: true, message: "请输入模板CODE！" }]}
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>
        </div>

        <Form.Item wrapperCol={{ span: 16 }}>
          <Button type="primary" htmlType="submit" className=" h-[40px]">
            提交保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const WCs: FC = () => {
  const [cor, setCor] = useState<Res.ConfigAppCorwx>();
  const cra: Req.ConfigAppCreate = {
    name: "骑手审核群",
    owner: "",
    userlist: ["", "", ""]
  };
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  useEffect(() => {
    configAppCorwx()
      .then((res) => {
        setCor(res.data);
      })
      .catch((error) => error);
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      corpid: cor?.data.corpid ?? "",
      corpsecret: cor?.data.corpsecret ?? "",
      verifyChatid: cor?.data.verifyChatid ?? ""
    });
    form2.setFieldsValue({
      qunname: cra.name,
      qunuser: cra.owner,
      qun1: cra.userlist[1],
      qun2: cra.userlist[2],
      qun3: cra.userlist[3]
    });
  }, [cor]);

  const { run: ConfigAppWCs } = useRequest(
    async (values) => await postConfigAppCorwx(values),
    {
      manual: true
    }
  );
  const { run: ConfigAppCreate } = useRequest(
    async ({ qunname, qunuser, qun1, qun2, qun3 }) =>
      await postConfigAppCreate({
        name: qunname,
        owner: qunuser,
        userlist: [qun1, qun2, qun3]
      }),
    {
      manual: true
    }
  );

  return (
    <div>
      <Form
        form={form}
        className=" m-auto pt-[80px]"
        name="appcorwx"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 500 }}
        initialValues={{ remember: true }}
        onFinish={ConfigAppWCs}
        autoComplete="off"
        layout="vertical"
      >
        <div>
          <div className=" flex justify-between h-[21px]">
            <div className=" text-[14px] font-bold">企业微信配置</div>
            <div>
              <a href="#" className=" text-[14px] text-[#955ce6]">
                帮助
              </a>
            </div>
          </div>
          <Form.Item
            label={<div className=" h-[40px] flex items-center">企业ID：</div>}
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="corpid"
            rules={[{ required: true, message: "请输入企业ID！" }]}
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>

          <Form.Item
            label={
              <div className=" h-[40px] flex items-center">
                应用凭证Secret：
              </div>
            }
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="corpsecret"
            rules={[{ required: true, message: "请输入应用凭证！" }]}
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>

          <Form.Item
            label={
              <div className=" h-[40px] flex items-center">
                群聊id(用于骑手申请通知)：
              </div>
            }
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
            name="verifyChatid"
          >
            <Input className=" w-[500px] h-[40px] rounded-[4px]" />
          </Form.Item>
        </div>

        <Form.Item wrapperCol={{ span: 16 }}>
          <Button type="primary" htmlType="submit" className=" h-[40px]">
            提交保存
          </Button>
        </Form.Item>
      </Form>

      <Form
        form={form2}
        className=" m-auto"
        name="appcreate"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 500 }}
        initialValues={{ remember: true }}
        onFinish={ConfigAppCreate}
        autoComplete="off"
        layout="vertical"
      >
        <div>
          <Form.Item
            label={
              <div className=" h-[40px] leading-[40px]">
                创建群聊 生成群ID：
              </div>
            }
            className=" mb-0"
            labelCol={{
              style: {
                padding: "0px"
              }
            }}
          >
            <div className=" text-[12px] h-[40px] leading-[40px]">
              请提交上述配置后，在创建如下配置，并提交群聊id
            </div>
          </Form.Item>

          <div className=" flex justify-evenly">
            <Form.Item
              label={<div className=" h-[40px] flex items-center">群名称</div>}
              className=" mb-0 px-[10px]"
              labelCol={{
                style: {
                  padding: "0px"
                }
              }}
              name="qunname"
            >
              <Input
                placeholder="请输入群名称"
                className=" w-[240px] h-[40px] rounded-[4px]"
              />
            </Form.Item>

            <Form.Item
              label={
                <div className=" h-[40px] flex items-center">
                  群所有者(userid)
                </div>
              }
              className=" mb-0 px-[10px]"
              labelCol={{
                style: {
                  padding: "0px"
                }
              }}
              name="qunuser"
            >
              <Input
                placeholder="请输入群所有者(userid)"
                className=" w-[240px] h-[40px] rounded-[4px]"
              />
            </Form.Item>
          </div>

          <div className=" flex justify-evenly">
            <Form.Item
              label={
                <div className=" h-[40px] flex items-center">
                  群成员1(userid)
                </div>
              }
              className=" mb-0 px-[10px]"
              labelCol={{
                style: {
                  padding: "0px"
                }
              }}
              name="qun1"
            >
              <Input
                placeholder="请输入群成员1(userid)"
                className=" w-[153.32px] h-[40px] rounded-[4px]"
              />
            </Form.Item>

            <Form.Item
              label={
                <div className=" h-[40px] flex items-center">
                  群成员2(userid)
                </div>
              }
              className=" mb-0 px-[10px]"
              labelCol={{
                style: {
                  padding: "0px"
                }
              }}
              name="qun2"
            >
              <Input
                placeholder="请输入群成员2(userid)"
                className=" w-[153.32px] h-[40px] rounded-[4px]"
              />
            </Form.Item>

            <Form.Item
              label={
                <div className=" h-[40px] flex items-center">
                  群成员3(userid)
                </div>
              }
              className=" mb-0 px-[10px]"
              labelCol={{
                style: {
                  padding: "0px"
                }
              }}
              name="qun3"
            >
              <Input
                placeholder="请输入群成员3(userid)"
                className=" w-[153.32px] h-[40px] rounded-[4px]"
              />
            </Form.Item>
          </div>

          <Form.Item wrapperCol={{ span: 16 }}>
            <Button htmlType="submit" type="primary" className=" h-[40px]">
              生成群ID
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: <div className=" mx-[16px]">开发设置</div>,
    children: <Ds />
  },
  {
    key: "2",
    label: <div className=" mx-[16px]">支付设置</div>,
    children: <Ps />
  },
  {
    key: "3",
    label: <div className=" mx-[16px]">地图设置</div>,
    children: <Ms />
  },
  {
    key: "4",
    label: <div className=" mx-[16px]">阿里云配置</div>,
    children: <ACs />
  },
  {
    key: "5",
    label: <div className=" mx-[16px]">企业微信配置</div>,
    children: <WCs />
  }
];

const App: FC = () => {
  return (
    <>
      <div className=" h-[36px] text-[24px]">小程序设置</div>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};

export default App;
