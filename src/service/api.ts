import request from "@/utils/request";

// 验证码
export const getVerifyCode = async () =>
  await request.get<Res.VerifyCode>("/api/admin/verifycode");

// 登录
export const postAdminLogin = async (params: Req.AdminLogin) =>
  await request.post("/api/admin/login", params);

// 代理列表 /admin/agent/list
export const adminAgent = async (params: Req.AdminAgent) =>
  await request.get<Res.AgentList>("/api/admin/agent/list", { params });

// 获取提现数据
export const cashData = async (params: Req.AdminAgent) =>
  await request.get<Res.CashData>("/api/admin/cash/list", { params });

export const cashIs = async () =>
  await request.get<Res.CashIs>("/api/admin/config/coupon");

export const postCashIs = async (data: Req.CashIs) =>
  await request.post("/api/admin/config/coupon", data);

// 代理启用禁用
export const putAgentStatus = async (params: Req.PutStatus) =>
  await request.put("/api/admin/agent/status", params);

// 代理列表重置密码
export const AdminAgentResetPwd = async (params: Req.AdminPwd) =>
  await request.put("/api/admin/agent/resetpwd", params);

// 修改代理
export const putAdminAgentUpdata = async (params: Req.AdminAgentUpData) =>
  await request.put("/api/admin/agent/update", params);

// 新增代理
export const postAdminAgentAdd = async (params: Req.AdminAgentAdd) =>
  await request.post("/api/admin/agent/add", params);

// 管理员列表
export const adminList = async (params: Req.AdminList) =>
  await request.get<Res.AdminList>("/api/admin/list", { params });

// 管理员启用禁用
export const putAdminStatus = async (params: Req.PutAdminStatus) =>
  await request.put("/api/admin/status", params);

// 管理员重置密码
export const putAdminResetPwd = async (params: Req.AdminResetPwd) =>
  await request.put("/api//admin/resetpwd", params);

// 新增管理员
export const postAdminAdd = async (params: Req.AdminAdd) =>
  await request.post("/api/admin/add", params);

// 用户列表
export const getAdminUserList = async (params: Req.AdminUserList) =>
  await request.get<Res.AdminUserList>("/api/admin/user/list", { params });

// 用户列表启用禁用
export const putAdminUserStatus = async (params: Req.PutAdminUserStatus) =>
  await request.put("/api/admin/user/status", params);

// 数据总览-订单数据曲线
export const getAdminAnalysisNewOrder = async (params: Req.OrderData) =>
  await request.get<Res.AecData>("/api/admin/analysis/new/order", {
    params
  });

// 数据总览-用户数据曲线数据
export const getPlateOneData = async (params: Req.Asss) =>
  await request.get<Res.ResDatas>("/api/admin/analysis/new/user", {
    params
  });

// 数据总览-板块一数据
export const getOverviewData = async () =>
  await request.get<Res.OverviewData>("/api/admin/analysis/total");

// 首页-右上角弹框
export const getPopUp = async () => {
  return await request.get<Res.PopUp>("/api/admin/info");
};

// 个人设置
export const PersonalSettings = async () =>
  await request.get<Res.PersonalData>("/api/admin/info/self");

// 修改密码
export const ChangePassword = async (params: Req.getChangePasswordData) =>
  await request.put("/api/admin/updatepwd", params);

// 计价规则
export const getValuation = async (params: Req.AdminAgent) =>
  await request.get<Res.Valuation>("/api/admin/citys/valuation/list", {
    params
  });

// 重量标签
export const getWeight = async (params: Req.AdminAgent) =>
  await request.get<Res.Weight>("/api/admin/citys/weight/list", {
    params
  });

// 物品标签组
export const getTag = async (params: Req.AdminAgent) =>
  await request.get<Res.Tag>("/api/admin/citys/tag/list", {
    params
  });

// 计价规则删除
export const deleteAdminCitysValuationDel = async (
  data: Req.deleteAdminCitysValuation
) => await request.delete("/api/admin/citys/valuation/del", { data });

// 重量标签删除
export const deleteAdminCitysWeightDel = async (
  data: Req.deleteAdminCitysValuation
) => await request.delete("/api/admin/citys/weight/del", { data });

// 物品标签组删除
export const deleteAdminCitysTagDel = async (
  data: Req.deleteAdminCitysValuation
) => await request.delete("/api/admin/citys/tag/del", { data });

// 计价规则添加
export const postValuation = async (params: Req.addAdminCitysValuaContext) =>
  await request.post("/api/admin/citys/valuation/add", { params });

// 获取小程序设置ID及密钥
// 开发设置
export const configAppID = async () =>
  await request.get<Res.ConfigAppID>("/api/admin/config/appauth");

export const postConfigAppDs = async (data: Req.ConfigAppDs) =>
  await request.post("/api/admin/config/appauth", data);
// 支付设置
export const configAppMch = async () =>
  await request.get<Res.ConfigAppMch>("/api/admin/config/appmch");

export const postConfigAppMch = async (data: Req.ConfigAppMch) =>
  await request.post("/api/admin/config/appmch", data);
// 地图设置
export const configAppMap = async () =>
  await request.get<Res.ConfigAppMap>("/api/admin/config/map");

export const postConfigAppMap = async (data: Req.ConfigAppMap) =>
  await request.post("/api/admin/config/map", data);
// 阿里云配置
export const configAppAli = async () =>
  await request.get<Res.ConfigAppAli>("/api/admin/config/ali");

export const postConfigAppAli = async (data: Req.ConfigAppAli) =>
  await request.post("/api/admin/config/ali", data);
// 企业微信配置
export const configAppCorwx = async () =>
  await request.get<Res.ConfigAppCorwx>("/api/admin/config/corwx");

export const postConfigAppCorwx = async (data: Req.ConfigAppCorwx) =>
  await request.post("/api/admin/config/corwx", data);

export const postConfigAppCreate = async (data: Req.ConfigAppCreate) =>
  await request.post("/api/admin/corwx/appchat/create", data);
// 系统设置 *********
// 分享设置
export const configShare = async () =>
  await request.get<Res.configShare>("/api/admin/config/share");

export const postConfigShare = async (data: Req.ConfigShare) =>
  await request.post("/api/admin/config/share", data);
// 积分设置
export const configIntegral = async () =>
  await request.get<Res.configIntegral>("/api/admin/config/integral");

export const postConfigIntegral = async (data: Req.ConfigIntegral) =>
  await request.post("/api/admin/config/integral", data);

// 用户指南
export const getAdminConfigGuideUser = async () =>
  await request.get<Res.configGuideUser>("/api/admin/config/guide/user");

// 修改用户指南
export const postAdminConfigGuideUser = async (data: Req.configGuideUser) =>
  await request.post("/api/admin/config/guide/user", data);

// 骑手指南
export const grtAdminConfigGuideRider = async () =>
  await request.get<Res.configGuideRider>("/api/admin/config/guide/rider");

// 修改骑手指南
export const postAdminConfigGuideRider = async (data: Req.configGuideUser) =>
  await request.post("/api/admin/config/guide/rider", data);

// 骑手协议
export const grtAdminConfigAgreementRider = async () =>
  await request.get<Res.configGuideRider>("/api/admin/config/agreement/rider");

// 修改骑手协议
export const postAdminConfigAgreementRider = async (
  data: Req.configGuideUser
) => await request.post("/api/admin/config/agreement/rider", data);

// 城市管理 运营城市列表
export const cityManagementList = async (params: Req.cityList) =>
  await request.get<Res.cityList>("/api/admin/citys/list", { params });

// 优惠券列表
export const adminCoupon = async (params?: Req.AdminCoupon) =>
  await request.get<Res.CouponList>("/api/admin/coupon/list", { params });

// 操作人信息
export const adminInfo = async () =>
  await request.get<Res.AdminInfo>("/api/admin/info");

// 修改状态
export const putCouponsState = async (params: Req.ChangeStatus) =>
  await request.put("/api/admin/coupon/status", params);

// 优惠券设置
export const configCoupon = async () =>
  await request.get<Res.Coupon>("/api/admin/config/coupon");

export const postConfigCoupon = async (data: Req.ConfigCoupon) =>
  await request.post("/api/admin/config/coupon", data);

// 添加优惠券
export const postadminAddCoupons = async (data: Req.AdminAddCoupons) =>
  await request.post("/api/admin/coupon/add", data);

// 修改优惠券
export const updateCoupon = async (data: Req.UpdateCoupons) =>
  await request.put("/api/admin/coupon/update", data);

// 订单管理
export const adminOrder = async (params: Req.AdminAgent) =>
  await request.get<Res.ResponseData>("/api/admin/order/list", { params });

// 资金走向
export const orderCapitaltrend = async (params: Req.AdminAgent) =>
  await request.get<Res.ResponseDatas>("/api/admin/order/capitaltrend/list", {
    params
  });
// 取消订单设置
export const configOrdercancel = async () =>
  await request.get<Res.ResPonsedata>("/api/admin/config/ordercancel");

export const postConfigOrdercancel = async (data: Req.ResPonsedata) =>
  await request.post("/api/admin/config/ordercancel", data);
// 小费选项配置
export const configOrderfee = async () =>
  await request.get<Res.ResPonseData>("/api/admin/config/orderfee");

export const postConfigOrderfee = async (data: Req.ResponseData) =>
  await request.post("/api/admin/config/orderfee", data);

// 跳转
export const getAdminInfoOne = async () => await request.get("/api/admin/info");

// 城市管理禁用启用
export const putAdminCitysStatus = async (params: Req.cityStatus) =>
  await request.put("/api/admin/citys/status", params);

// 修改城市
export const putAdminCitysUpDate = async (params: Req.CitysUpDate) =>
  await request.put("/api/admin/citys/update", params);

// 新增城市
export const postAdminCityAdd = async (params: Req.postCityAdd) =>
  await request.post("/api/admin/citys/add", params);
// 骑手列表获取
export const getRiders = async (params: Req.getRiderlist) =>
  await request.get<Res.RidersType>("/api/admin/rider/list", { params });

// 骑手列表接单状态修改
export const putRider = async (data: Req.PutRider) =>
  await request.put("/api/admin/rider/receive/status", data);

// 骑手列表操作
export const putRidercz = async (data: Req.PutRidercz) =>
  await request.put("/api/admin/user/status", data);
