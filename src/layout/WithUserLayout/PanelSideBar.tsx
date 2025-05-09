import { FC } from "react";
import SideBar from "./SideBar";
import { UserInterFace } from "../LayoutTypes";

const PanelSideBar: FC<UserInterFace> = ({ user }) => {
  return (
    <div className="panel-sidebar">
      <div className="sticky-cls">
        <SideBar user={user} />
      </div>
    </div>
  );
};

export default PanelSideBar;