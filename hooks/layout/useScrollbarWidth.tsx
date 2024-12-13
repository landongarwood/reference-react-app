import { useEffect } from "react";
import { useGlobalState } from "../store/base";

const useScrollbarWidth = (
  elementRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  const [, setContentWidthThreshold] = useGlobalState("contentWidthThreshold");

  useEffect(() => {
    if (!elementRef.current) {
      setContentWidthThreshold(0);
    } else {
      const hasVerticalScrollBar =
        elementRef.current.clientHeight < elementRef.current.scrollHeight;
      setContentWidthThreshold(
        hasVerticalScrollBar
          ? elementRef.current.offsetWidth - elementRef.current.clientWidth
          : 0
      );
    }
  }, [
    elementRef,
    elementRef.current?.clientHeight,
    elementRef.current?.scrollHeight,
    elementRef.current?.offsetWidth,
    setContentWidthThreshold,
  ]);
};

export default useScrollbarWidth;
