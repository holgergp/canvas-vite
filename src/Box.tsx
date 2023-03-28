import React, {useEffect} from "react";
import Konva from "konva";
import { Group, Label, Rect, Tag, Text } from "react-konva";
import { BoxCoordinates } from "./coordinates";
import Color from "color";

export const Box = ({ boxCoordinates }: { boxCoordinates: BoxCoordinates }) => {
  const shapeRef =
    React.useRef<Konva.Group>() as React.MutableRefObject<Konva.Group>;

  const rectRef =
    React.useRef<Konva.Rect>() as React.MutableRefObject<Konva.Rect>;

  useEffect(() => {
    console.log('Konva about to log');
    console.log(window.Konva.stages);
  })
  console.log("Renderender");
  return (
    <Group
      draggable={false}
      x={boxCoordinates.x}
      y={boxCoordinates.y}
      id={"1"}
      ref={shapeRef}
      name={"BoxGroup"}
    >
      <Rect
        ref={rectRef}
        fill={Color("black").alpha(0.1).string()}
        width={boxCoordinates.width}
        height={boxCoordinates.height}
        stroke={Color("black").alpha(1).string()}
        strokeWidth={2}
      />
    </Group>
  );
};
