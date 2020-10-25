import React from 'react';

import { BackgroundContainer } from './styles';

type BackgroundImageProps = {
  image: string;
};

const BackgroundImage: React.FC<BackgroundImageProps> = ({ image }) => {
  return <BackgroundContainer image={image} />;
};

export default BackgroundImage;
