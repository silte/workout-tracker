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

import { Container } from "../../components/container/container";
import { Heading } from "../../components/heading/heading";
import { Spacer } from "../../components/spacer/spacer";
import { Button } from "../../components/button/button";
import { getActivityName } from "../../utils/activityInfo";
import { unixtimeToDate, secondsToHms } from "../../utils/timeConverter";
import {
  metresToKilometres,
  getRoundedMetres,
} from "../../utils/distanceConverter";
import { ButtonGroup } from "@material-ui/core";
import { useWindowWidth } from '../../containers/workout/windowSize';

interface IWorkout {
  workout: IWorkoutData;
  chartStartIndex: number;
  chartEndIndex: number;
  setChartStartIndex: any
  setChartEndIndex: any
}

interface IWorkoutDataPointsChart extends IWorkoutDataPointData {
  timeString?: string;
}

interface BrushStartEndIndex extends IWorkoutDataPointData {
  startIndex: number;
  endIndex: number;
}

export const Workout = ({ workout, chartStartIndex, chartEndIndex, setChartStartIndex, setChartEndIndex }: IWorkout) => {
  const [isHearRateVisible, setIsHearRateVisible] = useState<boolean>(true);
  const [isSpeedVisible, setIsSpeedVisible] = useState<boolean>(true);
  const [isAltitudeVisible, setIsAltitudeVisible] = useState<boolean>(true);
  const [isCadenceVisible, setIsCadenceVisible] = useState<boolean>(true);

  const toggleBooleanState = (prevStat: boolean) => !prevStat;


  const windowWidth = useWindowWidth()

  const getWorkoutDurationFromTimestamp = (timestamp: number) => {
    return secondsToHms((timestamp - workout.startTime) / 1000);
  };

  const chartDataPoints: IWorkoutDataPointsChart[] = workout?.dataPoints?.map(
    (dataPoint) => ({
      ...dataPoint,
      timeString: getWorkoutDurationFromTimestamp(
        parseInt(dataPoint.timestamp)
      ),
    })
  );

  const handleChartSelectionChange = ({startIndex, endIndex}: BrushStartEndIndex) => {
    setChartStartIndex(startIndex);
    setChartEndIndex(endIndex);
  }

  const memoDataChart = useMemo(() =>         <DataChart 
  dataPoints={chartDataPoints}
  isHearRateVisible={isHearRateVisible}
  isSpeedVisible={isSpeedVisible}
  isAltitudeVisible={isAltitudeVisible}
  isCadenceVisible={isCadenceVisible}
  handleSelectionChange={handleChartSelectionChange}
  startIndex={chartStartIndex}
  endIndex={chartEndIndex}
  />
, [workout, windowWidth, isHearRateVisible, isSpeedVisible, isAltitudeVisible, isCadenceVisible])

if (!("activityId" in workout)) {
  return <h1>Loading...</h1>;
}

  // </>), [workout, windowWidth, isHearRateVisible, isSpeedVisible, isAltitudeVisible, isCadenceVisible]) (


  return (
    <>
      <Container small className="workout">
        <Spacer large>
          <Heading headingLevel={1} className="workout__title">
            {getActivityName(workout.activityId)}{" "}
            {unixtimeToDate(workout.startTime)}
          </Heading>
          <Heading headingLevel={2} label="Duration">
            {secondsToHms(workout.totalTime)}
          </Heading>
          <Heading headingLevel={2} label="Distance">
            {metresToKilometres(workout.totalDistance)}
          </Heading>
          <Heading headingLevel={2} label="Ascent">
            {getRoundedMetres(workout.totalAscent)}
          </Heading>
          <Heading headingLevel={2} label="Max speed">
            {workout.maxSpeed}
          </Heading>
        </Spacer>
      </Container>
      <Container medium className="workout__toggle-buttons">
        <ButtonGroup>
          <Button
            isActive={isHearRateVisible}
            onClick={() => setIsHearRateVisible(toggleBooleanState)}
          >
            Toggle HR
          </Button>
          <Button
            isActive={isAltitudeVisible}
            onClick={() => setIsAltitudeVisible(toggleBooleanState)}
          >
            Toggle Altitude
          </Button>
          <Button
            isActive={isSpeedVisible}
            onClick={() => setIsSpeedVisible(toggleBooleanState)}
          >
            Toggle Speed
          </Button>
          <Button
            isActive={isCadenceVisible}
            onClick={() => setIsCadenceVisible(toggleBooleanState)}
          >
            Toggle Cadence
          </Button>
        </ButtonGroup>
      </Container>
      <Spacer>
        {memoDataChart}
      </Spacer>
    </>
  );
};

interface IDataChart {
  dataPoints: IWorkoutDataPointsChart[];
  isHearRateVisible: boolean;
  isSpeedVisible: boolean;
  isAltitudeVisible: boolean;
  isCadenceVisible: boolean;
  handleSelectionChange: any;
  startIndex: number;
  endIndex: number;
}

const DataChart = ({dataPoints, isHearRateVisible, isSpeedVisible, isAltitudeVisible, isCadenceVisible, handleSelectionChange, startIndex, endIndex}: IDataChart) => 

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
      <YAxis
        domain={["dataMin", "dataMax"]}
        yAxisId="altitude"
        hide={true}
      />
      <YAxis yAxisId="speed" orientation="right" />
      <YAxis
        domain={["dataMin", "dataMax"]}
        yAxisId="cadence"
        hide={true}
      />
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
        <Line
          dot={false}
          type="monotone"
          dataKey="hr"
          stroke="#f42424"
        />
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
      <Brush dataKey="timeString" onChange={handleSelectionChange} gap={60} startIndex={startIndex} endIndex={endIndex} />
    </ComposedChart>
  </ResponsiveContainer>
</div>
