import { describe, expect, it, Mock } from "vitest";
import "konva/lib/shapes/Text";
import "konva/lib/shapes/Image";
import "konva/lib/shapes/Transformer";
import "konva/lib/shapes/Label";
import "konva/lib/shapes/Rect";
import "konva/lib/Stage";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/setup/setup";
import { render } from "@testing-library/react";
import { DrawBox } from "./DrawBox";
import {
  BOX_GROUP_SELECTOR,
  drawBoundingBox,
  renderWithKonva,
} from "./testUtils";
import { StartStopPosition } from "./coordinates";
import Konva from "konva";
import stages = Konva.stages;
let user: UserEvent;

global.URL.createObjectURL = vi.fn();

describe("DrawBox should", () => {
  beforeEach(() => {
    user = userEvent.setup();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("draw groups on canvas", async () => {
    const { container } = render(<DrawBox />);
    const canvas = container.querySelectorAll("canvas");
    const stage = window.Konva.stages[0];
    expect(canvas).toBeDefined();

    const boxStartStopPosition: StartStopPosition = {
      start: { x: 30, y: 30 },
      stop: { x: 60, y: 70 },
    };
    drawBoundingBox(canvas[0], boxStartStopPosition);
    expect(stage).toBeDefined();

    const box1 = window.Konva.stages[0].find(BOX_GROUP_SELECTOR);
    expect(box1).toHaveLength(1);
    const boxRect = box1[0].find("Rect")[0];
    expect(boxRect.width()).toEqual(30);
    expect(boxRect.height()).toEqual(40);

    drawBoundingBox(canvas[0], boxStartStopPosition);
    const boundingBoxes = window.Konva.stages[0].find(BOX_GROUP_SELECTOR);

    expect(window.Konva.stages[0].find(BOX_GROUP_SELECTOR)).toHaveLength(1);
  });
});
