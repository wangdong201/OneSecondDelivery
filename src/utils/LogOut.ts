import Cookies from "js-cookie";

export default function getCookies() {
  Cookies.remove("token");
  window.location.href = "/login";
}
