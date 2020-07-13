import React from "react";

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
} from "recharts";

import { Container } from "../../components/container/container";
import { Heading } from "../../components/heading/heading";
import { Spacer } from "../../components/spacer/spacer";
import { getActivityName } from "../../utils/activityInfo";
import { unixtimeToDate, secondsToHms } from "../../utils/timeConverter";
import {
  metresToKilometres,
  getRoundedMetres,
} from "../../utils/distanceConverter";

const DATA_POINTS_IN_CHART = 500;

interface IWorkout {
  workout: IWorkoutData;
}

export const Workout = ({ workout }: IWorkout) => {
  if (!("activityId" in workout)) {
    return <h1>Loading...</h1>;
  }

  const formatXAxisTick = (tickTime: number) => {
    return secondsToHms((tickTime - workout.startTime) / 1000);
  };
  const every_nth = (arr: any[], nth: number) =>
    arr.filter((e, i) => i % nth === nth - 1);

  const dataPointCountDivider = Math.floor(
    workout.dataPoints.length / DATA_POINTS_IN_CHART
  );
  const chartData = every_nth(workout.dataPoints, dataPointCountDivider);

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
      <Container>
        <Spacer>
          <div style={{ width: "100%", height: "33vh" }}>
            <ResponsiveContainer>
              <ComposedChart
                width={1500}
                height={800}
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={formatXAxisTick}
                  minTickGap={10}
                />
                <YAxis />
                <YAxis yAxisId="altitude" />
                <YAxis yAxisId="speed" orientation="right" />
                <YAxis yAxisId="cadence" orientation="right" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="altitude"
                  yAxisId="altitude"
                  stroke="#dedede"
                  fill="#dedede"
                />
                <Line
                  dot={false}
                  type="monotone"
                  dataKey="hr"
                  stroke="#f42424"
                />
                <Line
                  dot={false}
                  type="monotone"
                  dataKey="speed"
                  yAxisId="speed"
                  stroke="#8884d8"
                />
                <Line
                  dot={false}
                  type="monotone"
                  dataKey="cadence"
                  stroke="#82ca9d"
                  yAxisId="cadence"
                />
                <Brush />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Spacer>
      </Container>
    </>
  );
};
