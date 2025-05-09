import type { FC, ReactNode } from "react";
import { Container } from "reactstrap";
import PanelSideBar from "./PanelSideBar";
import { UserType } from "@/Common/CommonInterFace";

interface WithUserLayoutInterFace {
  children: ReactNode;
  loaderName: string;
  mainClassName?: string;
  user?: UserType;
  friends?: UserType[];
  notfriends?: UserType[];
  reloadFriends?: () => void;
}

const WithUserLayout: FC<WithUserLayoutInterFace> = ({
  children,
  mainClassName,
  user,
  friends,
  notfriends,
  reloadFriends,
  loaderName = "defaultLoader",
}) => {
  return (
    <>
      <Container
        fluid
        className={`page-body newsfeed-style6 ${
          mainClassName ? mainClassName : ""
        }`}
      >
        <PanelSideBar user={user} />
        {children}
      </Container>
    </>
  );
};

export default WithUserLayout;