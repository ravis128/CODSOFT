import React from 'react';

function Image({
  src,
  alt = "Image Name",
  className = "",
  width,
  height,
  sources = [], // [{ type: 'image/webp', srcSet: '...', sizes: '...' }]
  loading = 'lazy',
  decoding = 'async',
  ...props
}) {
  const fallbackSrc = "/assets/images/no_image.png";

  return (
    <picture>
      {sources?.map((s, i) => (
        <source key={i} type={s?.type} srcSet={s?.srcSet} sizes={s?.sizes} />
      ))}
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        onError={(e) => {
          e.currentTarget.src = fallbackSrc;
        }}
        {...props}
      />
    </picture>
  );
}

export default Image;
