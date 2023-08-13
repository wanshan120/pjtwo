/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/alt-text */
import { FC } from 'react';

const ImgWithFallback: FC<{ src: string; fallback: string; type: string }> = ({
  src,
  fallback,
  type = 'image/webp',
  ...delegated
}) => (
  <picture>
    <source srcSet={src} type={type} />
    <img src={fallback} {...delegated} />
  </picture>
);

export default ImgWithFallback;
