import { RouteObject } from "react-router-dom";
import Login from "../pages/Login/login";
import FindPwd from "../pages/Login/FindPwd/findPwd";
import ResetPwd from "../pages/Login/ResetPwd/resetPwd";
import Join from "../pages/Join/join";
import MyPage from "../pages/MyPage/mypage";

const userRoutes: RouteObject[] = [
  { path: '/login', element: <Login /> },
  { path: '/findPwd', element: <FindPwd /> },
  { path: '/resetPwd', element: <ResetPwd /> },
  { path: '/join', element: <Join /> },
  { path: '/mypage', element: <MyPage /> },
]

export default userRoutes