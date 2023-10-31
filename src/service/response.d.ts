namespace Res {
  type VerifyCode = {
    code: number;
    msg: string;
    data: { svg: string; no: string };
  };
  type AdminLogin = {
    code: number;
    msg: null | string;
    data?: null | object;
  };
  type AgentList = {
    code: number;
    msg: string;
    data: {
      pageSize: number;
      current: number;
      count: number;
      totalPages: number;
      data: {
        agentNo: string;
        agentAccount: string;
        mobileNumber: string;
        realName: string;
        status: number;
        createTime: string;
        updateTime: string;
        defaultPwd: string;
        updatedBy: string;
      }[];
    };
  };
  type CashData = {
    code: number;
    msg: string;
    data: {
      pageSize: number;
      current: number;
      count: number;
      totalPages: number;
      data: [];
    };
  };
  type CashIs = {
    code: number;
    msg: string;
    data: {
      shareOpen: boolean;
      newUserOpen: boolean;
      newUserRules: { couponNo: string; probability: number }[];
      shareUserRules: { couponNo: string; probability: number }[];
    };
  };
  type AdminList = {
    code: number;
    msg: string;
    data: {
      pageSize: number;
      current: number;
      count: number;
      totalPages: number;
      data: {
        adminNo: string;
        adminName: string;
        mobileNumber: string;
        realName: string;
        status: number;
        createTime: string;
        updateTime: string;
        defaultPwd: string;
        updatedBy: string;
      }[];
    };
  };

  type AdminUserList = {
    code: number;
    msg: string;
    data: {
      pageSize: number;
      current: number;
      count: number;
      data: [
        {
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
      ];
    };
  };
}
