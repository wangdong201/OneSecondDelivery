namespace Req {
  type AdminLogin = {
    adminName: string;
    adminPwd: string;
    no: string;
    verifyCode: string;
  };
  type AdminAgent = {
    current: number;
    pageSize: number;
  };
  type CashIs = {
    shareOpen: boolean;
    newUserOpen: boolean;
    newUserRules: { couponNo: string; probability: number }[];
    shareUserRules: { couponNo: string; probability: number }[];
  };

  type AdminCoupon = {
    current: number;
    pageSize: number;
  };
  type ConfigCoupon = {
    shareOpen: boolean;
    newUserOpen: boolean;
    newUserRules: { couponNo: string; probability: number }[];
    shareUserRules: { couponNo: string; probability: number }[];
  };
  type PutStatus = {
    agentNo: string;
    status: string;
  };
  type AdminList = {
    current: number;
    pageSize: number;
  };
  type PutAdminStatus = {
    adminNo: string;
    status: string;
  };
  type AdminUserList = {
    current: number;
    pageSize: number;
  };
  type PutAdminUserStatus = {
    status: string;
    userNo: string;
  };
  type AdminAgentUpData = {
    agentAccount: string;
    agentNo: string;
    mobileNumber: string;
    realName: string;
    status: number;
  };
  type AdminPwd = {
    agentNo: string;
  };
  type AdminResetPwd = {
    adminNo: string;
  };
  type AdminAgentAdd = {
    agentAccount: string;
    mobileNumber: string;
    realName: string;
    status: number;
  };
  type AdminAdd = {
    adminName: string;
    mobileNumber: string;
    realName: string;
  };
  type OrderData = {
    beginDate: number;
    endDate: number;
  };
  type Asss = {
    beginDate: number;
    endDate: number;
  };
  type getChangePasswordData = {
    adminPwd: string;
    confirmPwd: string;
    oldpwd: string;
  };

  type deleteAdminCitysValuation = {
    id: number;
  };
  type ConfigAppDs = {
    qqAppid: string;
    ttAppid: string;
    wxAppId: string;
    qqAppSecret: string;
    ttAppSecret: string;
    wxAppSecret: string;
  };
  type ConfigAppMch = {
    notifyUrl: string;
    wxMchId: string;
    wxMchSecert: string;
  };
  type ConfigAppMap = {
    mapKey: string;
  };
  type ConfigAppAli = {
    arn: string;
    ossBucket: string;
    ossRegion: string;
    accessKeyId: string;
    smsSignName: string;
    accessKeySecret: string;
    smsTemplateCode: string;
  };
  type ConfigAppCorwx = {
    corpid: string;
    corpsecret: string;
    verifyChatid: string;
  };
  type ConfigAppCreate = { name: string; owner: string; userlist: string[] };
  type ConfigShare = { desc: string; path: string; title: string };
  type ConfigIntegral = { withIntegral: string };
  type configGuideUser = {
    content: string;
  };
  type cityList = { current: number; pageSize: number };
  type ChangeStatus = {
    couponNo: string;
    status: string;
  };
  type AdminAddCoupons = {
    conditionService: string;
    conditionsAmount: number;
    couponName: string;
    deadlineDays: number;
    discountAmount: number;
    limitNumber: number;
    status: number;
  };
  type UpdateCoupons = {
    couponName: string;
    deadlineDays: number;
    discountAmount: number;
    conditionsAmount: number;
    conditionService: string;
    limitNumber: number;
    status: number;
    couponNo: string;
  };
  type ResponseData = {
    feeTips: number[];
    agentExtract: number;
    platformExtract: number;
  };
  type ResPonsedata = {
    userCancelTips: [string, string, object];
    adminCancelTips: string[];
    agentCancelTips: [string, string, object];
    riderCancelTips: string[];
    userCancelRules: { price: number; timeRange: number[] }[];
    riderCancelRules: { price: number; timeRange: number[] }[];
  };
}
