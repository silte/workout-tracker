import { ButtonGroup } from '@material-ui/core';
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
} from '@silte/recharts';
import { useMemo, useState } from 'react';

import { Button } from '../../components/button/button';
import { Container } from '../../components/container/container';
import { DescriptionList } from '../../components/description-list/description-list';
import { DescriptionListItem } from '../../components/description-list/description-list.item';
import { Loader } from '../../components/loader/loader';
import { useSetPageInfo } from '../../hooks/useSetPageInfo';
import { WorkoutDataPointDto, WorkoutDto } from '../../redux/generated/api';
import getActivityName from '../../utils/activityInfo';
import {
  metresToKilometres,
  getRoundedMetres,
} from '../../utils/distanceConverter';
import { unixtimeToDate, secondsToHms } from '../../utils/timeConverter';

interface IWorkout {
  workout: WorkoutDto;
  chartStartIndex: number;
  chartEndIndex: number;
  setChartStartIndex(index: number): void;
  setChartEndIndex(index: number): void;
}

interface IWorkoutDataPointDtosChart extends WorkoutDataPointDto {
  timeString?: string;
}

interface BrushStartEndIndex extends WorkoutDataPointDto {
  startIndex: number;
  endIndex: number;
}

interface IDataChart {
  dataPoints: IWorkoutDataPointDtosChart[];
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
  <div style={{ width: '100%', height: '33vh', minHeight: '450px' }}>
    <ResponsiveContainer>
      <ComposedChart
        width={1500}
        height={800}
        data={dataPoints}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        maxDataPointsToRender={300}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timeString" minTickGap={10} />
        <YAxis domain={['dataMin', 'dataMax']} />
        <YAxis domain={['dataMin', 'dataMax']} yAxisId="altitude" hide />
        <YAxis yAxisId="speed" orientation="right" />
        <YAxis domain={['dataMin', 'dataMax']} yAxisId="cadence" hide />
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
  const isLoading = !('workoutKey' in workout);
  useSetPageInfo({
    title: isLoading
      ? 'Workout'
      : `${getActivityName(workout.activityId)} - ${unixtimeToDate(
          workout.startTime
        )}`,
    backLink: '/workout/summary',
  });

  const [isHearRateVisible, setIsHearRateVisible] = useState<boolean>(true);
  const [isSpeedVisible, setIsSpeedVisible] = useState<boolean>(true);
  const [isAltitudeVisible, setIsAltitudeVisible] = useState<boolean>(true);
  const [isCadenceVisible, setIsCadenceVisible] = useState<boolean>(true);

  const toggleBooleanState = (prevStat: boolean) => !prevStat;

  const getWorkoutDurationFromTimestamp = (timestamp: number) => {
    return secondsToHms((timestamp - workout.startTime) / 1000);
  };

  const chartDataPoints: IWorkoutDataPointDtosChart[] =
    workout?.dataPoints?.map((dataPoint) => ({
      ...dataPoint,
      timeString: getWorkoutDurationFromTimestamp(
        parseInt(dataPoint.timestamp, 10)
      ),
    }));

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

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Container className="py-8">
      <DescriptionList>
        <DescriptionListItem label="Duration" isLarge>
          {secondsToHms(workout.totalTime)}
        </DescriptionListItem>
        <DescriptionListItem label="Distance">
          {metresToKilometres(workout.totalDistance ?? NaN)}
        </DescriptionListItem>
        <DescriptionListItem label="Ascent">
          {getRoundedMetres(workout.totalAscent)}
        </DescriptionListItem>
        <DescriptionListItem label="Max speed">
          {workout.maxSpeed}
        </DescriptionListItem>
      </DescriptionList>

      <ButtonGroup className="mt-8">
        <Button
          onClick={() => setIsHearRateVisible(toggleBooleanState)}
          accentColor={isHearRateVisible ? 'blue' : 'plain'}
        >
          Toggle HR
        </Button>
        <Button
          onClick={() => setIsAltitudeVisible(toggleBooleanState)}
          accentColor={isAltitudeVisible ? 'blue' : 'plain'}
        >
          Toggle Altitude
        </Button>
        <Button
          onClick={() => setIsSpeedVisible(toggleBooleanState)}
          accentColor={isSpeedVisible ? 'blue' : 'plain'}
        >
          Toggle Speed
        </Button>
        <Button
          onClick={() => setIsCadenceVisible(toggleBooleanState)}
          accentColor={isCadenceVisible ? 'blue' : 'plain'}
        >
          Toggle Cadence
        </Button>
      </ButtonGroup>
      <div className="py-8">{memoDataChart}</div>
    </Container>
  );
};

export default Workout;
