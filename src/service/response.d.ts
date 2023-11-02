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
  type CouponList = {
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
  type couponData = {
    id: number;
    createTime: string;
    updateTime: string;
    couponNo: string;
    couponName: string;
    deadlineDays: number;
    discountAmount: number;
    conditionsAmount: number;
    conditionService: string;
    cumulativeDrawNo: number;
    cumulativeUseNo: number;
    limitNumber: number;
    status: number;
    updatedBy: string;
  };

  type Coupon = {
    code: number;
    msg: string;
    data: {
      shareOpen: boolean;
      newUserOpen: boolean;
      newUserRules: { couponNo: string; probability: number }[];
      shareUserRules: { couponNo: string; probability: number }[];
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

  type ResponseData = {
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

  type ResPonsedata = {
    code: number;
    msg: string;
    data: {
      userCancelTips: [string, string, object];
      adminCancelTips: string[];
      agentCancelTips: [string, string, object];
      riderCancelTips: string[];
      userCancelRules: { price: number; timeRange: number[] }[];
      riderCancelRules: { price: number; timeRange: number[] }[];
    };
  };

  type ResPonseData = {
    code: number;
    msg: string;
    data: { feeTips: number[]; agentExtract: number; platformExtract: number };
  };
  type ResponseDatas = {
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
  type AecData = {
    code: number;
    msg: string;
    data: {
      date: string;
      cancel: number;
      close: number;
      waitPay: number;
      waitReceive: number;
      sending: number;
      waitConfirm: number;
      complete: number;
    }[];
  };
  type OverviewData = {
    code: number;
    msg: string;
    data: {
      userTotal: number;
      orderCompleteTotal: number;
      tradeTotal: number;
      incomeTotal: number;
      yesterdayUserTotal: string;
      yesterdayOrderCompleteTotal: string;
      yesterdayTradeTotal: number;
      yesterdayIncomeTotal: number;
    };
  };
  type ResDatas = {
    code: number;
    msg: string;
    data: { date: string; wx: number; user: number }[];
  };
  type PersonalData = {
    code: number;
    msg: string;
    data: {
      adminNo: string;
      mobileNumber: string;
      adminName: string;
      realName: string;
      avatarUrl: object;
    };
  };

  type ResponseData = {
    code: number;
    msg: string;
    data: {
      adminNo: string;
      mobileNumber: string;
      adminName: string;
      realName: string;
      avatarUrl: object;
    };
  };
  type AdminInfo = {
    code: number;
    msg: string;
    data: {
      adminNo: string;
      mobileNumber: string;
      adminName: string;
      realName: string;
      avatarUrl: object;
    };
  };
  type PopUp = {
    code: number;
    msg: string;
    data: {
      adminNo: string;
      mobileNumber: string;
      adminName: string;
      realName: string;
      avatarUrl: object;
    };
  };
  type Valuation = {
    code: number;
    msg: string;
    data: {
      pageSize: number;
      current: number;
      count: number;
      totalPages: number;
      data: [
        {
          id: number;
          createTime: string;
          updateTime: string;
          isDelete: number;
          ruleName: string;
          ruleContext: {
            time: { gt: number; lte: number; price: number }[];
            weight: {
              gt: number;
              lte: number;
              price: number;
              unitWeight: number;
            }[];
            distance: {
              gt: number;
              lte: number;
              price: number;
              unitDistance: number;
            }[];
          };
          createdBy: string;
          updatedBy: string;
        }
      ];
    };
  };
  type Weight = {
    code: number;
    msg: string;
    data: {
      pageSize: number;
      current: number;
      count: number;
      totalPages: number;
      data: {
        id: number;
        createTime: string;
        updateTime: string;
        isDelete: number;
        tagName: string;
        tags: { type: string; label: string; value: number[] }[];
        createdBy: string;
        updatedBy: string;
      }[];
    };
  };
  type Tag = {
    code: number;
    msg: string;
    data: {
      pageSize: number;
      current: number;
      count: number;
      totalPages: number;
      data: [
        {
          id: number;
          createTime: string;
          updateTime: string;
          isDelete: number;
          groupName: string;
          tags: string[];
          createdBy: string;
          updatedBy: string;
        }
      ];
    };
  };
  type ConfigAppID = {
    code: number;
    msg: string;
    data: {
      qqAppid: string;
      ttAppid: string;
      wxAppId: string;
      qqAppSecret: string;
      ttAppSecret: string;
      wxAppSecret: string;
    };
  };
  type ConfigAppMch = {
    code: number;
    msg: string;
    data: { wxMchId: string; notifyUrl: string; wxMchSecert: string };
  };
  type ConfigAppMap = { code: number; msg: string; data: { mapKey: string } };
  type ConfigAppAli = {
    code: number;
    msg: string;
    data: {
      arn: string;
      ossBucket: string;
      ossRegion: string;
      accessKeyId: string;
      smsSignName: string;
      accessKeySecret: string;
      smsTemplateCode: string;
    };
  };
  type ConfigAppCorwx = {
    code: number;
    msg: string;
    data: { corpid: string; corpsecret: string; verifyChatid: string };
  };
  type configShare = {
    code: number;
    msg: string;
    data: { desc: string; path: string; title: string };
  };
  type configIntegral = {
    code: number;
    msg: string;
    data: { withIntegral: number };
  };
  type configGuideUser = {
    code: number;
    msg: string;
    data: { content: string };
  };
  type configGuideRider = {
    code: number;
    msg: string;
    data: { content: string };
  };
  type cityList = {
    code: number;
    msg: string;
    data: {
      pageSize: number;
      current: number;
      count: number;
      totalPages: number;
      data: [
        {
          id: number;
          createTime: string;
          updateTime: string;
          cityNo: string;
          cityName: string;
          province: string;
          agentNo: string;
          startPrice: number;
          extractHelpDeliver: number;
          extractHelpGet: number;
          extractHelpBuy: number;
          extractHelpDeliverForAgent: number;
          extractHelpGetForAgent: number;
          extractHelpBuyForAgent: number;
          citysValuationId: number;
          citysWeightTagId: number;
          citysTagGroupId: number;
          status: number;
          corwxChatid: object;
          updatedBy: string;
        }
      ];
    };
  };
  type RidersType = {
    code: number;
    msg: string;
    data: {
      pageSize: number;
      current: number;
      count: number;
      totalPages: number;
      data: {
        id: number;
        createTime: string;
        updateTime: string;
        riderNo: string;
        status: number;
        userNo: string;
        startReceive: number;
        cityNo: string;
        realname: string;
        mobileNumber: string;
        avatarUrl: string;
        nickName: string;
      }[];
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
}
