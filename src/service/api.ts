import request from "@/utils/request";

// 验证码
export const getVerifyCode = async () =>
  await request.get<Res.VerifyCode>("/api/admin/verifycode");

// 登录
export const postAdminLogin = async (params: Req.AdminLogin) =>
  await request.post("/api/admin/login", params);

// 代理列表
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
