import React, { useRef } from "react";
import Konva from "konva";
import { DrawStage } from "./DrawStage";

export const DrawBox = () => {
  const workItemCanvasWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={workItemCanvasWrapperRef}
      tabIndex={1}
      style={{ position: "relative" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 10,
          width: 10,
          backgroundColor: "hotpink",
          zIndex: 1,
          opacity: 0,
        }}
      ></div>
      <DrawStage />
    </div>
  );
};
