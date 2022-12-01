import React from "react";

// This encodes some approximation of
// the surface scanned by typical scan types
const surfaceApproximator = {
  "flat horizontal": ({ width, length, height }) => width * length,
  "rugged terrain": ({ width, length, height }) => width * length * 1.5,
  "simple building": ({ width, length, height }) =>
    width * length + (width * height) / 2 + (height * length) / 2,
  indoor: ({ width, length, height }) =>
    width * length + width * height * 2 + height * length * 2,
  "single facade": ({ width, length, height }) => (width * height) / 2,
  tower: ({ width, length, height }) =>
    (width * length) / 3 + height * 2 * 3 * Math.PI,
  "simple shape": ({ width, length, height }) =>
    (5 * (width * length * height) ** (2 / 3)) / 2,
  "complex shape": ({ width, length, height }) =>
    (15 * (width * length * height) ** (2 / 3)) / 2,
  "dense fractal shape": ({ width, length, height }) =>
    (width * length * height) / 2
};

// This computes a multiplicative coefficient applied to the photo count
// based on the number of passes.
const photoPassesRatioApproximator = {
  "1pass": 1.3,
  "2pass optim": 1.7,
  "2pass": 2.2,
  "3pass optim": 2.5,
  "3pass": 3.0
};

const compute = ({
  scanType,
  passes,
  width,
  length,
  height,
  gsd,
  overlap,
  sidelap
}) => {
  const sceneSurface = surfaceApproximator[scanType]({ width, length, height });
  const sceneMpx = sceneSurface / (1e6 * (gsd * 0.001) ** 2);
  const cameraMpx = 12;
  const effectiveCameraMpx =
    cameraMpx * (1 - overlap / 100) * (1 - sidelap / 100);
  const photoPassesRatio = photoPassesRatioApproximator[passes];
  const photoCount = (photoPassesRatio * sceneMpx) / effectiveCameraMpx;
  const photoSizeMB = 10;
  const totalSizeGB = (photoCount * photoSizeMB) / 1e3;
  const secondsPerPhoto = 2;
  const totalMinutes = (photoCount * secondsPerPhoto) / 60;
  const minutesPerBattery = 18;
  const totalBatteries = totalMinutes / minutesPerBattery;
  return {
    input: { scanType, width, length, height, gsd, overlap, sidelap },
    intermediateValues: {
      sceneSurface,
      sceneMpx,
      cameraMpx,
      effectiveCameraMpx,
      photoPassesRatio,
      photoCount,
      photoSizeMB,
      secondsPerPhoto,
      totalMinutes,
      minutesPerBattery,
      totalBatteries
    },
    output: {
      photoCount: `${Math.ceil(photoCount)} photos`,
      totalData: `${parseFloat(totalSizeGB.toFixed(2))} GB`,
      totalDuration:
        Math.ceil(totalMinutes) >= 60
          ? `${Math.floor(Math.ceil(totalMinutes) / 60)} hours ${
              Math.ceil(totalMinutes) % 60
            } minutes`
          : `${Math.ceil(totalMinutes) % 60} minutes`,
      totalBatteries: `${Math.ceil(totalBatteries)} batteries`
    }
  };
};

export const Estimator = (props) => {
  const result = compute(props);
  return (
    <div style={{ margin: "1rem 0" }}>
      <dl>
        <dt>Number of Photos</dt>
        <dd>{result.output.photoCount}</dd>
        <dt>Number of Batteries</dt>
        <dd>{result.output.totalBatteries}</dd>
        <dt>Data volume</dt>
        <dd>{result.output.totalData}</dd>
        <dt>Total duration</dt>
        <dd>{result.output.totalDuration}</dd>
      </dl>
      <details>
        <summary>Details</summary>
        <pre
          style={{
            background: "#f6f8fa",
            fontSize: ".65rem",
            padding: ".5rem"
          }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      </details>
    </div>
  );
};
