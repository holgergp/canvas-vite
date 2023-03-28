export interface BoxCoordinates {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Coordinates {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
export interface StartStopPosition {
  start: { x: number; y: number };
  stop: { x: number; y: number };
}

export const INITIAL_COORDINATES: Coordinates = {
  x1: -9999,
  y1: -9999,
  x2: -9999,
  y2: -9999,
};
const getUpperXFromCoordinate = (coordinates: Coordinates) =>
  Math.min(coordinates.x1, coordinates.x2);

const getUpperYFromCoordinate = (coordinates: Coordinates) =>
  Math.min(coordinates.y1, coordinates.y2);

const getWidthFromCoordinate = (coordinates: Coordinates) =>
  Math.abs(coordinates.x2 - coordinates.x1);

const getHeightFromCoordinate = (coordinates: Coordinates) =>
  Math.abs(coordinates.y2 - coordinates.y1);

export const getBoundingBoxCoordinatesFromCoordinate = (
  coordinates: Coordinates
) => ({
  x: getUpperXFromCoordinate(coordinates),
  y: getUpperYFromCoordinate(coordinates),
  width: getWidthFromCoordinate(coordinates),
  height: getHeightFromCoordinate(coordinates),
});
export const calculateBoundingBoxCoordinatesFromStartStopPosition = (
  position: StartStopPosition
): BoxCoordinates => {
  let top: number;
  let right: number;
  let bottom: number;
  let left: number;

  if (position.start.x > position.stop.x) {
    left = position.stop.x;
    right = position.start.x;
  } else {
    left = position.start.x;
    right = position.stop.x;
  }

  if (position.start.y > position.stop.y) {
    top = position.stop.y;
    bottom = position.start.y;
  } else {
    top = position.start.y;
    bottom = position.stop.y;
  }

  return {
    x: left,
    y: top,
    height: bottom - top,
    width: right - left,
  };
};
