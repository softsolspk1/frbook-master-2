import React, { FC } from 'react';
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import { HoverMessageProps } from './CommonInterFace';
import { ImagePath } from '../utils/constant/index';
import CustomImage from './CustomImage';

const HoverMessage: FC<HoverMessageProps> = ({ placement, target, name, imagePath }) => {
  return (
    <UncontrolledPopover
      placement={placement}
      target={target}
      trigger="hover"
      className="profile-tooltip"
    >
      <PopoverHeader className="p-0">
        <div className="popover-image bg-size blur-up lazyloaded">
          {imagePath ? (
            <CustomImage
              src={`${process.env.NEXT_PUBLIC_API_BASE}/assets/${imagePath}`}
              className="img-fluid blur-up lazyload bg-img"
              alt="profile"
            />
          ) : (
            <CustomImage
              src={`${ImagePath}/user-sm/def.jpg`}
              className="img-fluid blur-up lazyload bg-img"
              alt="profile"
            />
          )}
        </div>
      </PopoverHeader>
      <PopoverBody>
        <h5>{name || 'User'}</h5>
        <div className="connect-btn">
          <a href="#" className="btn btn-outline-primary">
            Message
          </a>
        </div>
      </PopoverBody>
    </UncontrolledPopover>
  );
};

export default HoverMessage;