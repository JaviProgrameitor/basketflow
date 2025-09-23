
import { useRef } from 'react';

export function useDoubleTap(delay = 300) {
  const lastTap = useRef(0);

  function handleTouchEnd() {
    const now = Date.now();
    let doubleTap = false;

    if (now - lastTap.current < delay) {
      doubleTap = true;
    } else doubleTap = false;
    
    lastTap.current = now;
    return { doubleTap };
  }

  return { onTouchEnd: handleTouchEnd };
}