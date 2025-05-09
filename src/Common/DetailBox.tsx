import { FC } from "react";
import { DetailBoxProps } from "./CommonInterFace";

const DetailBox: FC<DetailBoxProps> = ({ post }) => {
  return (
    <div className="detail-box">
      <h3>{post?.content}</h3>
    </div>
  );
};

export default DetailBox;