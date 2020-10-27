import React, { memo } from 'react';

import { Image } from './styles';
import defaultAvatar from '../../assets/default-avatar.png';

type AvatarProps = {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, ...rest }) => {
  return <Image src={src || defaultAvatar} alt={alt || 'avatar'} {...rest} />;
};

export default memo(Avatar);
