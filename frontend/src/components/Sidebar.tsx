import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import UpArrow from "../assets/icons/svg/Group 47400.svg";
import ClosedLogo from "../assets/icons/svg/Group 48700.svg";
import IconLogo from "../assets/icons/08_chart.png";
import IconSideControl from "../assets/icons/03_user.png";
import IconSideUser from "../assets/icons/07_profile.png";
import SideBarArrow from "../assets/icons/svg/Group 47408.svg";
import { DASHBOARD_SIDEBAR_LINKS } from "../lib/sidebar_menus.tsx";
import logo2 from "@/assets/icons/Group 48687@2x.png";

const linkClass =
  "flex items-center gap-2 px-3 py-2 hover:no-underline hover:bg-custom-active rounded-sm text-base";
const linkSubClass =
  "flex gap-2 w-52 px-2 items-center hover:no-underline hover:bg-custom-active rounded-sm text-base";
const ListClass =
  "flex gap-2 px-2 items-center  hover:no-underline rounded-sm text-white";

function OpenSidebarLink({ link }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleList = (id: string) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  const { pathname } = useLocation();
  return (
    <Link
      className={classNames(
        pathname === link.path
          ? "text-sm bg-custom-active flex justify-center text-black font-extrabold"
          : "text-white text-sm flex justify-center font-extrabold",
        linkClass
      )}
    >
      <span className="text-xl text-center">{link.icon}</span>
    </Link>
  );
}

const Sidebar: React.FC = () => {
  const [UserLink, SetUserLink] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === "/users") {
      SetUserLink(true);
    }
  }, []);

  const [SideBarStatus, SetSidebar] = useState(true);

  const [Logo, Setlogo] = useState(logo2);

  const toggleSideBar = () => {
    if (SideBarStatus) {
      Setlogo(ClosedLogo);

      let mainsDiv = document.querySelectorAll(".main-div");
      mainsDiv.forEach((div) => {
        div.classList.add("w-32");
        div.classList.remove("w-72");
      });

      const AllsP = document.querySelectorAll("#remove-p");
      AllsP.forEach((p) => {
        p.style.display = "none";
      });

      SetUserLink(false);

      const sideBarArrow = document.querySelector(".sideBarArrow");
      if (sideBarArrow) {
        sideBarArrow.style.transform = "rotate(180deg)";
        sideBarArrow.style.left = "80px";
      }
    } else {
      Setlogo(logo2);

      let mainsDiv = document.querySelectorAll(".main-div");

      mainsDiv.forEach((div) => {
        div.classList.add("w-72");
        div.classList.remove("w-32");
      });

      const AllsP = document.querySelectorAll("#remove-p");
      AllsP.forEach((p) => {
        p.style.display = "block";
      });

      const sideBarArrow = document.querySelector(".sideBarArrow");
      if (sideBarArrow) {
        sideBarArrow.style.transform = "rotate(360deg)";
        sideBarArrow.style.left = "240px";
      }

      if (pathname === "/users") {
        SetUserLink(true);
      }
    }
    SetSidebar(!SideBarStatus);
  };
  return (
    <div className="flex main-div flex-col z-10 justify-between w-72 h-full bg-primary-700 shadow-primary-800">
      <div className="main-div flex flex-col fixed h-screen z-10  w-72 p-3 text-white">
        <div className=" lg:flex flex-nowrap px-4 py-7">
          <img src={Logo} id="logo" alt="Logo" className="max-w-full h-auto" />
          <img
            src={SideBarArrow}
            onClick={() => toggleSideBar()}
            alt="My Icon"
            className="sideBarArrow"
          />
        </div>
        <div className="py-2 flex flex-col gap-0.5">
          <div>
            <Link
              className={classNames(
                pathname === "/home"
                  ? "text-sm bg-custom-active  text-black font-extrabold"
                  : "text-white text-sm font-extrabold",
                linkClass
              )}
              to={"/home"}
            >
              <div style={{ marginLeft: "1rem" }} className={linkClass}>
                <img src={IconLogo} />
                <p id="remove-p" className="text-sm">
                  Home
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div
          onClick={() => SetUserLink(!UserLink)}
          className="py-2 cursor-pointer flex flex-col gap-0.5"
        >
          <div>
            <a className={classNames(ListClass)}>
              <div
                style={{ marginLeft: "1rem" }}
                className={"flex gap-2 px-2 py-2 items-center"}
              >
                <img src={IconSideControl} />
                <p id="remove-p" className="text-sm">
                  Controle de acesso
                </p>
                <img
                  style={{ marginLeft: "auto" }}
                  src={UpArrow}
                  alt="Up Arrow"
                />
              </div>
            </a>
          </div>
        </div>
        <div
          className={classNames(
            UserLink
              ? "flex justify-center items-center w-full flex-col ml-5"
              : "hidden"
          )}
        >
          <div className="w-52 flex-col ">
            <Link
              to={"/users/list"}
              className={classNames(
                pathname === "/users"
                  ? "text-sm bg-custom-active text-black font-extrabold"
                  : "text-white text-sm font-extrabold",
                linkSubClass
              )}
            >
              <div
                style={{ marginLeft: "1rem", marginTop: "0" }}
                className={linkClass}
              >
                <img src={IconSideUser} />
                <p id="remove-p" className="text-sm">
                  Usuários
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div
        style={{ marginTop: "88vh" }}
        className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700"
      >
        <div className=" px-6 py-2 text-white">
          © WenLock <br />
          Power by Conecthus <br />V 0.0.0
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
