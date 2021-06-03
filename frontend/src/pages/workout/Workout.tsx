import React, { useMemo, useState } from "react";

import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  ComposedChart,
  Area,
  ResponsiveContainer,
} from "@silte/recharts";

import { ButtonGroup } from "@material-ui/core";
import Container from "../../components/container/container";
import Heading from "../../components/heading/heading";
import Button from "../../components/button/button";
import getActivityName from "../../utils/activityInfo";
import { unixtimeToDate, secondsToHms } from "../../utils/timeConverter";
import {
  metresToKilometres,
  getRoundedMetres,
} from "../../utils/distanceConverter";
import Loader from "../../components/loader/loader";
import SEO from "../../components/seo/seo";

interface IWorkout {
  workout: IWorkoutData;
  chartStartIndex: number;
  chartEndIndex: number;
  setChartStartIndex(index: number): void;
  setChartEndIndex(index: number): void;
}

interface IWorkoutDataPointsChart extends IWorkoutDataPointData {
  timeString?: string;
}

interface BrushStartEndIndex extends IWorkoutDataPointData {
  startIndex: number;
  endIndex: number;
}

interface IDataChart {
  dataPoints: IWorkoutDataPointsChart[];
  isHearRateVisible: boolean;
  isSpeedVisible: boolean;
  isAltitudeVisible: boolean;
  isCadenceVisible: boolean;
  handleSelectionChange(startAndEndIndex: BrushStartEndIndex): void;
  startIndex: number;
  endIndex: number;
}

const DataChart = ({
  dataPoints,
  isHearRateVisible,
  isSpeedVisible,
  isAltitudeVisible,
  isCadenceVisible,
  handleSelectionChange,
  startIndex,
  endIndex,
}: IDataChart) => (
  <div style={{ width: "100%", height: "33vh", minHeight: "450px" }}>
    <ResponsiveContainer>
      <ComposedChart
        width={1500}
        height={800}
        data={dataPoints}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        maxDataPointsToRender={300}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timeString" minTickGap={10} />
        <YAxis domain={["dataMin", "dataMax"]} />
        <YAxis domain={["dataMin", "dataMax"]} yAxisId="altitude" hide />
        <YAxis yAxisId="speed" orientation="right" />
        <YAxis domain={["dataMin", "dataMax"]} yAxisId="cadence" hide />
        <Tooltip />
        <Legend />
        {isAltitudeVisible && (
          <Area
            type="monotone"
            dataKey="altitude"
            yAxisId="altitude"
            stroke="#dedede"
            fill="#dedede"
          />
        )}
        {isHearRateVisible && (
          <Line dot={false} type="monotone" dataKey="hr" stroke="#f42424" />
        )}
        {isSpeedVisible && (
          <Line
            dot={false}
            type="monotone"
            dataKey="speed"
            yAxisId="speed"
            stroke="#8884d8"
          />
        )}
        {isCadenceVisible && (
          <Line
            dot={false}
            type="monotone"
            dataKey="cadence"
            stroke="#82ca9d"
            yAxisId="cadence"
          />
        )}
        <Brush
          dataKey="timeString"
          onChange={handleSelectionChange as never}
          gap={60}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);

const Workout = ({
  workout,
  chartStartIndex,
  chartEndIndex,
  setChartStartIndex,
  setChartEndIndex,
}: IWorkout): JSX.Element => {
  const [isHearRateVisible, setIsHearRateVisible] = useState<boolean>(true);
  const [isSpeedVisible, setIsSpeedVisible] = useState<boolean>(true);
  const [isAltitudeVisible, setIsAltitudeVisible] = useState<boolean>(true);
  const [isCadenceVisible, setIsCadenceVisible] = useState<boolean>(true);

  const toggleBooleanState = (prevStat: boolean) => !prevStat;

  const getWorkoutDurationFromTimestamp = (timestamp: number) => {
    return secondsToHms((timestamp - workout.startTime) / 1000);
  };

  const chartDataPoints: IWorkoutDataPointsChart[] = workout?.dataPoints?.map(
    (dataPoint) => ({
      ...dataPoint,
      timeString: getWorkoutDurationFromTimestamp(
        parseInt(dataPoint.timestamp, 10)
      ),
    })
  );

  const memoDataChart = useMemo(() => {
    const handleChartSelectionChange = ({
      startIndex,
      endIndex,
    }: BrushStartEndIndex) => {
      setChartStartIndex(startIndex);
      setChartEndIndex(endIndex);
    };

    return (
      <DataChart
        dataPoints={chartDataPoints}
        isHearRateVisible={isHearRateVisible}
        isSpeedVisible={isSpeedVisible}
        isAltitudeVisible={isAltitudeVisible}
        isCadenceVisible={isCadenceVisible}
        handleSelectionChange={handleChartSelectionChange}
        startIndex={chartStartIndex}
        endIndex={chartEndIndex}
      />
    );
  }, [
    chartDataPoints,
    isHearRateVisible,
    isSpeedVisible,
    isAltitudeVisible,
    isCadenceVisible,
    chartStartIndex,
    chartEndIndex,
    setChartStartIndex,
    setChartEndIndex,
  ]);

  if (!("activityId" in workout)) {
    return <Loader />;
  }
  return (
    <>
      <SEO title="Workout" />
      <Container className="py-16 lg:py-32">
        <Heading headingLevel={1} className="workout__title">
          {getActivityName(workout.activityId)}{" "}
          {unixtimeToDate(workout.startTime)}
        </Heading>
        <Heading headingLevel={2} accent="Duration">
          {secondsToHms(workout.totalTime)}
        </Heading>
        <Heading headingLevel={2} accent="Distance">
          {metresToKilometres(workout.totalDistance)}
        </Heading>
        <Heading headingLevel={2} accent="Ascent">
          {getRoundedMetres(workout.totalAscent)}
        </Heading>
        <Heading headingLevel={2} accent="Max speed">
          {workout.maxSpeed}
        </Heading>
      </Container>
      <Container>
        <ButtonGroup>
          <Button onClick={() => setIsHearRateVisible(toggleBooleanState)}>
            {isHearRateVisible ? "isActive Toggle HR" : "Toggle HR"}
          </Button>
          <Button onClick={() => setIsAltitudeVisible(toggleBooleanState)}>
            {isAltitudeVisible ? "isActive Toggle Altitude" : "Toggle Altitude"}
          </Button>
          <Button onClick={() => setIsSpeedVisible(toggleBooleanState)}>
            {isSpeedVisible ? "isActive Toggle Speed" : "Toggle Speed"}
          </Button>
          <Button onClick={() => setIsCadenceVisible(toggleBooleanState)}>
            {isCadenceVisible ? "isActive Toggle Cadence" : "Toggle Cadence"}
          </Button>
        </ButtonGroup>
      </Container>
      <div className="py-8 lg:py-16">{memoDataChart}</div>
    </>
  );
};

export default Workout;
