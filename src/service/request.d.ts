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
}
