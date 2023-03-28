import { Layer, Rect, Stage, Transformer } from "react-konva";
import { Box } from "./Box";
import React, { RefObject, useEffect, useRef, useState } from "react";
import {
  BoxCoordinates,
  calculateBoundingBoxCoordinatesFromStartStopPosition,
  Coordinates,
  getBoundingBoxCoordinatesFromCoordinate,
  INITIAL_COORDINATES,
  StartStopPosition,
} from "./coordinates";
import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;

const MIN_BOUNDING_BOX_SIZE: { width: number; height: number } = {
  width: 5,
  height: 5,
};
export const DrawStage = () => {
  // States
  const [selectionStarted, setSelectionStarted] = useState(false);
  const [boxCoordinates, setBoxCoordinates] = useState<BoxCoordinates | null>(
    null
  );

  const selectionRectRef: React.Ref<Konva.Rect> = useRef(null);
  const stageRef: React.Ref<Konva.Stage> = useRef(null);
  const transformer: RefObject<Konva.Transformer> = useRef(null);
  const coordinates = useRef<Coordinates>(INITIAL_COORDINATES);
  const startStopPosition = useRef<StartStopPosition>({
    start: { x: 0, y: 0 },
    stop: { x: 0, y: 0 },
  });

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    // do nothing if we mousedown on any shape
    const stage = stageRef.current;
    const selectionRectangle = selectionRectRef.current;
    if (!stage || !selectionRectangle) {
      return;
    }

    setSelectionStarted(true);

    e.evt.preventDefault();
    coordinates.current = {
      x1: stage.getPointerPosition()?.x ?? 0,
      y1: stage.getPointerPosition()?.y ?? 0,
      x2: stage.getPointerPosition()?.x ?? 0,
      y2: stage.getPointerPosition()?.y ?? 0,
    };
    startStopPosition.current.start.x = coordinates.current.x1;
    startStopPosition.current.start.y = coordinates.current.y1;

    selectionRectangle.visible(true);
    selectionRectangle.width(0);
    selectionRectangle.height(0);
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    const selectionRectangle = selectionRectRef.current;
    const stage = stageRef.current;
    if (!selectionStarted || !stage || !selectionRectangle) {
      return;
    }

    // do nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
      return;
    }

    e.evt.preventDefault();
    coordinates.current.x2 = stage.getPointerPosition()?.x ?? 0;
    coordinates.current.y2 = stage.getPointerPosition()?.y ?? 0;

    selectionRectangle.setAttrs(
      getBoundingBoxCoordinatesFromCoordinate(coordinates.current)
    );
  };

  const handleMouseUp = (e: KonvaEventObject<MouseEvent>) => {
    const selectionRectangle = selectionRectRef.current;

    // do nothing if we didn't start selection
    if (
      !selectionRectangle ||
      !selectionRectangle.visible() ||
      !stageRef.current
    ) {
      return;
    }

    startStopPosition.current.stop.x = e.evt.offsetX ?? e.evt.clientX;
    startStopPosition.current.stop.y = e.evt.offsetY ?? e.evt.clientY;

    const newBoundingBoxCoordinates: BoxCoordinates =
      calculateBoundingBoxCoordinatesFromStartStopPosition(
        startStopPosition.current
      );

    e.evt.preventDefault();
    // update visibility in timeout, so we can check it in click event
    setTimeout(() => {
      selectionRectangle.visible(false);
    });

    if (
      newBoundingBoxCoordinates.width < MIN_BOUNDING_BOX_SIZE.width ||
      newBoundingBoxCoordinates.height < MIN_BOUNDING_BOX_SIZE.height
    ) {
      return;
    }

    setBoxCoordinates(newBoundingBoxCoordinates);

    //  if (workItemCanvasWrapperRef.current) {
    //    workItemCanvasWrapperRef.current.focus();
    //  }
    setSelectionStarted(false);
  };

  useEffect(() => {
    console.log("Konva about to log");
    console.log(window.Konva.stages);
  });
  return (
    <Stage
      role={"figure"}
      width={500}
      height={500}
      style={{ marginRight: "10px" }}
      key={`Stage_1}`}
      ref={stageRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Layer>
        <Box
          boxCoordinates={
            boxCoordinates ?? { x: 0, y: 0, width: 100, height: 100 }
          }
        />

        <Transformer data-testid={`Transformer-1`} ref={transformer} />
        <Rect fill="rgba(0,0,255,0.5)" visible={false} ref={selectionRectRef} />
      </Layer>
    </Stage>
  );
};
