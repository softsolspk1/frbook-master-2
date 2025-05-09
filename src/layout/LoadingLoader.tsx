import { FC } from "react";
import { LoadingLoaderProps } from "./LayoutTypes";

const LoadingLoader: FC<LoadingLoaderProps> = ({ show = false }) => {
  return (
    <>
      {show && (
        <div className="loader">
          <div className="loader-inner">
            <div className="loader-line-wrap">
              <div className="loader-line"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingLoader;