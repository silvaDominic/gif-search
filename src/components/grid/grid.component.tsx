import { PropsWithChildren, ReactElement } from "react";

export function Grid(props: PropsWithChildren<{}>): ReactElement {
  return (
    <div id='gif-grid' className="grid">
      {props.children}
    </div>
  );
}
