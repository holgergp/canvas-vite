import { act, fireEvent, render } from "@testing-library/react";
import React, { ReactElement } from "react";
import { UserEvent } from "@testing-library/user-event/setup/setup";
import { StartStopPosition } from "./coordinates";

export const renderWithKonva = async (component: React.ReactElement) => {
  const App = ({
    onUpdate,
    children,
  }: {
    onUpdate: (x: null) => void;
    children: ReactElement;
  }) => {
    React.useEffect(() => {
      onUpdate(null);
    });
    return children;
  };

  await new Promise((resolve) => {
    render(<App onUpdate={resolve}>{component}</App>);
  });

  return {
    stages: window.Konva.stages,
    konva: window.Konva,
    document: window.document,
    rerender: async (component: React.ReactElement) => {
      await new Promise((resolve) => {
        render(<App onUpdate={resolve}>{component}</App>);
      });
    },
  };
};
export const BOX_GROUP_SELECTOR = ".BoxGroup";

export const moveBoundingBoxArbitrarily = async (
  user: UserEvent,
  canvas: HTMLCanvasElement | null
) => {
  if (!canvas) {
    return;
  }
  const selectionGroup = window.Konva.stages[0].find(BOX_GROUP_SELECTOR);
  act(() => {
    selectionGroup[0].startDrag();
    selectionGroup[0].setDragDistance(2);
    selectionGroup[0].stopDrag();
  });
};

export const drawBoundingBox = (
  canvas: HTMLCanvasElement | null,
  startStopPosition: StartStopPosition = {
    start: { x: 1, y: 1 },
    stop: { x: 30, y: 30 },
  }
) => {
  if (!canvas) {
    return;
  }
  fireEvent.mouseDown(canvas, {
    clientX: startStopPosition.start.x,
    clientY: startStopPosition.start.y,
  });
  fireEvent.mouseMove(canvas, {
    clientX: startStopPosition.stop.x,
    clientY: startStopPosition.stop.y,
  });
  fireEvent.mouseUp(canvas, {
    clientX: startStopPosition.stop.x,
    clientY: startStopPosition.stop.y,
    offsetX: startStopPosition.stop.x,
    offsetY: startStopPosition.stop.y,
  });
};
