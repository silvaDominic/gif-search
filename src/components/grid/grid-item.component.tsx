import { ReactElement } from "react";

type GridItemProps = {
  imgSrc: string,
  imgAltText: string,
  title?: string,
}

export function GridItem({imgSrc, imgAltText, title}: GridItemProps): ReactElement {
  return (
    <div className='grid-item'>
      <h4>{title}</h4>
      <img crossOrigin='anonymous' src={imgSrc} alt={imgAltText}/>
    </div>
  );
}
