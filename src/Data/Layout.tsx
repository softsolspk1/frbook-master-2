import { sideBarDataType } from "../layout/LayoutTypes";

export const smallSideBarData: sideBarDataType[] = [
  {
    path: "/dashboard/feed",
    title: "newsfeed",
    tooltipTittle: "Feed",
    icon: "File",
  },
  {
    path: "/dashboard/profile",
    title: "profile",
    tooltipTittle: "Profile",
    icon: "User",
  },
  {
    path: "/dashboard/friends",
    title: "friends",
    tooltipTittle: "Friends",
    icon: "Star",
  },
  {
    path: "/dashboard/communication",
    title: "communication",
    tooltipTittle: "Communication",
    icon: "Headphones",
  },
  {
    path: "/dashboard/E-learning",
    title: "elearning",
    tooltipTittle: "E-Learning",
    icon: "BookOpen",
  },
];

export const skeltonLoaderList: Record<string, JSX.Element> = {
  defaultLoader: <></>,
  style10: <></>,
};