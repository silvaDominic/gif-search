import { ReactElement, useState } from "react";

type GridItemProps = {
  imgSrc: string,
  imgAltText: string,
  title?: string,
}

export function GridItem({imgSrc, imgAltText, title}: GridItemProps): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <>
      {isLoading && <span className='img-skeleton'></span>}

      <div className='grid-item'>
        <h4>{title}</h4>
        <img
          crossOrigin='anonymous'
          src={imgSrc}
          alt={imgAltText}
          style={{display: isLoading ? 'none' : 'block'}}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </>
  );
}
