import IconSideHome from "../assets/icons/08_chart.png";
import IconSideControl from "../assets/icons/03_user.png";
import IconSideUser from "../assets/icons/07_profile.png";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "Home",
    label: "Home",
    path: "/",
    icon: <img src={IconSideHome} className="w-[24px] h-[24px]" />,
    subLinks: false,
  },
  {
    key: "dashboard",
    label: "Controle de acesso",
    path: "/dashboard",
    icon: <img src={IconSideControl} className="w-[24px] h-[24px]" />,
    subLinks: [
      {
        key: "products",
        label: "Usuários",
        path: "/users",
        icon: <img src={IconSideUser} className="w-[24px] h-[24px]" />,
      },
    ],
  },
];
