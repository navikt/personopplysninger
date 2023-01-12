import { ReactEventHandler } from "react";

declare global {
  namespace React {
    interface DOMAttributes<T> {
      onResize?: ReactEventHandler<T> | undefined;
      onResizeCapture?: ReactEventHandler<T> | undefined;
      nonce?: string | undefined;
    }
  }
}
