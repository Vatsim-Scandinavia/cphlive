import denmarkRegionData from "../data/denmark-regions.txt?raw";

type GeoPoint = { lat: number; lon: number };
type Point = { x: number; y: number };

export const mapViewBox = { width: 720, height: 440 };

const bounds = { north: 57.8, south: 54.5, west: 7.8, east: 15.4 };
const padding = { x: 14, y: 20 };
const meanLatitude = ((bounds.north + bounds.south) / 2) * (Math.PI / 180);
const longitudeScale = Math.cos(meanLatitude);
const projectedWidth = (bounds.east - bounds.west) * longitudeScale;
const projectedHeight = bounds.north - bounds.south;
const scale = Math.min(
  (mapViewBox.width - padding.x * 2) / projectedWidth,
  (mapViewBox.height - padding.y * 2) / projectedHeight,
);
const contentWidth = projectedWidth * scale;
const contentHeight = projectedHeight * scale;
const offsetX = (mapViewBox.width - contentWidth) / 2;
const offsetY = (mapViewBox.height - contentHeight) / 2;

export const projectGeoPoint = ({ lat, lon }: GeoPoint): Point => ({
  x: offsetX + (lon - bounds.west) * longitudeScale * scale,
  y: offsetY + (bounds.north - lat) * scale,
});

const parseCoordinate = (coordinate: string) => {
  const hemisphere = coordinate[0];
  const parts = coordinate.slice(1).split(".");
  const decimal =
    Number(parts[0]) +
    Number(parts[1]) / 60 +
    Number(`${parts[2]}.${parts[3]}`) / 3600;

  return hemisphere === "S" || hemisphere === "W" ? -decimal : decimal;
};

const coordinatePattern =
  /(N\d{3}\.\d{2}\.\d{2}\.\d{3})\s+(E\d{3}\.\d{2}\.\d{2}\.\d{3})/;

const regions: GeoPoint[][] = [];
let activeRegion: GeoPoint[] | undefined;

for (const line of denmarkRegionData.split(/\r?\n/)) {
  if (line.startsWith("REGIONNAME")) {
    activeRegion = [];
    regions.push(activeRegion);
  }

  const match = line.match(coordinatePattern);
  if (!match || !activeRegion) continue;

  activeRegion.push({
    lat: parseCoordinate(match[1]),
    lon: parseCoordinate(match[2]),
  });
}

const segmentDistanceSquared = (point: Point, start: Point, end: Point) => {
  let x = start.x;
  let y = start.y;
  let dx = end.x - x;
  let dy = end.y - y;

  if (dx !== 0 || dy !== 0) {
    const ratio =
      ((point.x - x) * dx + (point.y - y) * dy) / (dx * dx + dy * dy);

    if (ratio > 1) {
      x = end.x;
      y = end.y;
    } else if (ratio > 0) {
      x += dx * ratio;
      y += dy * ratio;
    }
  }

  dx = point.x - x;
  dy = point.y - y;
  return dx * dx + dy * dy;
};

const simplifyPath = (points: Point[], tolerance = 0.65): Point[] => {
  if (points.length <= 2) return points;

  const first = points[0];
  const last = points[points.length - 1];
  let furthestDistance = 0;
  let splitIndex = 0;

  for (let index = 1; index < points.length - 1; index += 1) {
    const distance = segmentDistanceSquared(points[index], first, last);
    if (distance > furthestDistance) {
      splitIndex = index;
      furthestDistance = distance;
    }
  }

  if (furthestDistance <= tolerance * tolerance) return [first, last];

  const left = simplifyPath(points.slice(0, splitIndex + 1), tolerance);
  const right = simplifyPath(points.slice(splitIndex), tolerance);
  return [...left.slice(0, -1), ...right];
};

export const denmarkRegionPaths = regions
  .filter((region) => region.length >= 3)
  .map((region) => {
    const projected = region.map(projectGeoPoint);
    const finalPoint = projected.at(-1);
    const firstPoint = projected[0];
    const isClosed =
      finalPoint &&
      Math.abs(firstPoint.x - finalPoint.x) < 0.01 &&
      Math.abs(firstPoint.y - finalPoint.y) < 0.01;
    const ring = isClosed ? projected.slice(0, -1) : projected;
    const points = simplifyPath(ring);

    return `${points
      .map(
        ({ x, y }, index) =>
          `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`,
      )
      .join(" ")} Z`;
  });

export const ekch = projectGeoPoint({ lat: 55.6181, lon: 12.656 });
