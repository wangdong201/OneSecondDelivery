import Layout from "../layout/Layout";
import Home from "../views/home/Home";
import Login from "@/views/Login/login";
import Citys from "../views/city/citys";
import Tag from "../views/city/tag/tag";
import Valuations from "../views/city/valuation/valuations";
import Weight from "../views/city/weight/weight";
import Apps from "../views/config/app";
import Cash from "../views/config/cash";
import Integral from "../views/config/integral";
import Rider from "../views/config/rider";
import Share from "../views/config/share";
import User from "../views/config/user";
import Wxsubscribe from "../views/config/wxsubscribe";
import Coupons from "../views/coupon/coupons";
import Setting from "../views/coupon/setting";
import Cancelset from "../views/oder/cancelset";
import Capitaltrend from "../views/oder/capitaltrend";
import Feeset from "../views/oder/feeset";
import Oders from "@/views/oder/oders";
import RiderCash from "../views/rider/cash";
import Registers from "../views/rider/registers";
import Riders from "../views/rider/riders";
import Agents from "../views/user/agent/agents";
import Admins from "../views/user/admins";
import Users from "../views/user/users";
import AgreementRider from "../views/config/agreementRider";
import AgentEditAdd from "@/views/user/agent/edit/add";
import AddAdmin from "@/views/user/edit/add";
import UserEditUpData from "@/views/user/agent/edit/updata";
import UserUpdate from "@/views/user/update";
import UserPwd from "../views/user/pwd";
import Add from "../views/city/edit/add";
import CouponEditAddCon from "@/views/coupon/edit/add";
import CouponEditUpdate from "@/views/coupon/edit/update";
import CitysUpdate from "@/views/city/edit/update";
import CitysChat from "@/views/city/edit/chat";
import ValuationAdd from "../views/city/valuation/edit/Add";
import WeightAdd from "../views/city/weight/edit/Add";
import TagAdd from "../views/city/tag/edit/Add";
import ValuationUpdate from "../views/city/valuation/edit/Update";
import WeightUpdate from "../views/city/weight/edit/Update";
import TagUpdate from "../views/city/tag/edit/Update";
import RiderEditAdd from "@/views/rider/edit/add";

const routes = [
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/user/agent/agents/:id?", element: <Agents /> },
      { path: "/user/admins", element: <Admins /> },
      { path: "/user/users", element: <Users /> },
      { path: "/order/orders", element: <Oders /> },
      { path: "/order/capitaltrend", element: <Capitaltrend /> },
      { path: "/order/cancelset", element: <Cancelset /> },
      { path: "/order/feeset", element: <Feeset /> },
      { path: "/rider/riders", element: <Riders /> },
      { path: "/rider/registers", element: <Registers /> },
      { path: "/rider/cash", element: <RiderCash /> },
      { path: "/city/citys", element: <Citys /> },
      { path: "/city/valuation/valuations", element: <Valuations /> },
      { path: "/city/weight/weight", element: <Weight /> },
      { path: "/city/tag/tag", element: <Tag /> },
      { path: "/coupon/coupons", element: <Coupons /> },
      { path: "/coupon/setting", element: <Setting /> },
      { path: "/config/cash", element: <Cash /> },
      { path: "/config/app", element: <Apps /> },
      { path: "/config/share", element: <Share /> },
      { path: "/config/integral", element: <Integral /> },
      { path: "/config/wxsubscribe", element: <Wxsubscribe /> },
      { path: "/config/user", element: <User /> },
      { path: "/config/rider", element: <Rider /> },
      { path: "/config/agreementRider", element: <AgreementRider /> },
      { path: "/user/agent/edit/add", element: <AgentEditAdd /> },
      { path: "/user/edit/add", element: <AddAdmin /> },
      { path: "/user/agent/edit/update/:id?", element: <UserEditUpData /> },
      { path: "/user/update", element: <UserUpdate /> },
      { path: "/user/pwd", element: <UserPwd /> },
      { path: "/city/edit/add", element: <Add /> },
      { path: "/coupon/edit/add", element: <CouponEditAddCon /> },
      { path: "/coupon/edit/update/:id", element: <CouponEditUpdate /> },
      { path: "/city/edit/update/:id?", element: <CitysUpdate /> },
      { path: "/city/edit/chat", element: <CitysChat /> },
      { path: "/city/valuation/edit/add", element: <ValuationAdd /> },
      { path: "/city/weight/edit/add", element: <WeightAdd /> },
      { path: "/city/tag/edit/add", element: <TagAdd /> },
      { path: "/city/valuation/edit/update", element: <ValuationUpdate /> },
      { path: "/city/weight/edit/update", element: <WeightUpdate /> },
      { path: "/city/tag/edit/update", element: <TagUpdate /> },
      { path: "/rider/edit/add", element: <RiderEditAdd /> }
    ]
  }
];
export default routes;
