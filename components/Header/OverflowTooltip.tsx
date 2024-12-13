import { Tooltip, TooltipProps } from "@chakra-ui/react";
import { cloneElement, FC, useEffect, useRef, useState } from "react";

export const OverflowTooltip: FC<OverflowTooltipProps> = ({
  children,
  ...props
}) => {
  const textElementRef = useRef<any>();
  const [hoverStatus, setHover] = useState(false);

  const compareSize = () => {
    const compare =
      textElementRef.current?.scrollWidth > textElementRef.current?.clientWidth;
    setHover(compare);
  };

  useEffect(() => {
    compareSize();
    window.addEventListener("resize", compareSize);

    return () => {
      window.removeEventListener("resize", compareSize);
    };
  }, []);

  return (
    <Tooltip {...props} isDisabled={!hoverStatus}>
      {cloneElement(children as any, {
        ref: textElementRef,
        style: {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      })}
    </Tooltip>
  );
};

export interface OverflowTooltipProps extends TooltipProps {}
