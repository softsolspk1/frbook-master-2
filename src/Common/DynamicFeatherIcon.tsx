import React from 'react';
import * as FeatherIcons from 'react-feather';
import { DynamicFeatherIconProps } from './CommonInterFace';

const DynamicFeatherIcon: React.FC<DynamicFeatherIconProps> = ({ iconName, className, onClick }) => {
  // @ts-ignore: Dynamic import of feather icons
  const Icon = FeatherIcons[iconName];

  if (!Icon) {
    console.error(`Icon ${iconName} not found`);
    return null;
  }

  return <Icon className={className} onClick={onClick} />;
};

export default DynamicFeatherIcon;