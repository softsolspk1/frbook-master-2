import Image from "next/image";
import { FC } from "react";

interface CustomImageProps {
  src: string;
  className?: string;
  alt?: string;
  style?: React.CSSProperties;
}

const CustomImage: FC<CustomImageProps> = ({ src, className, alt, style }) => {
  return (
    <img
      src={src}
      className={className}
      alt={alt || "image"}
      style={style}
    />
  );
};

export default CustomImage;