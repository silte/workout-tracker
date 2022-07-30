import { ChartOptions, ChartData } from 'chart.js';
import { useMemo, useCallback } from 'react';
import { Chart } from 'react-chartjs-2';

import { WorkoutDataPointDto } from '../../redux/generated/api';
import { secondsToHms } from '../../utils/timeConverter';

interface ChartDataPoint {
  durationStr: string;
  duration: Date;
  heartRate?: number;
  speed?: number;
  altitude?: number;
  cadence?: number;
}

interface WorkoutDetailsChartProps {
  dataPoints: WorkoutDataPointDto[];
  startTime: number;
  startIndex: number;
  endIndex: number;
  setStartIndex(index: number): void;
  setZoomLevel(index: number): void;
}

export const WorkoutDetailsChart = ({
  dataPoints,
  startTime,
  startIndex,
  endIndex,
  setStartIndex,
  setZoomLevel,
}: WorkoutDetailsChartProps): JSX.Element | null => {
  const getWorkoutDurationFromTimestamp = useCallback(
    (timestamp: number) => {
      return secondsToHms((timestamp - startTime) / 1000);
    },
    [startTime]
  );

  const chartData: ChartDataPoint[] = useMemo(
    () =>
      dataPoints.map((dataPoint) => ({
        durationStr: getWorkoutDurationFromTimestamp(
          parseInt(dataPoint.timestamp, 10)
        ),
        duration: new Date(dataPoint.timestamp),
        heartRate: dataPoint.hr,
        speed: dataPoint.speed,
        altitude: dataPoint.altitude,
        cadence: dataPoint.cadence,
      })),
    [dataPoints, getWorkoutDurationFromTimestamp]
  );

  const updateChartPosition = useCallback(
    (min: number, max: number) => {
      setStartIndex(min);
      setZoomLevel(max);
    },
    [setStartIndex, setZoomLevel]
  );

  const options: ChartOptions = {
    animation: false,
    maintainAspectRatio: false,
    layout: {
      autoPadding: false,
      padding: {
        right: -10,
      },
    },
    scales: {
      x: {
        min: startIndex,
        max: endIndex,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          padding: 0,
          color: '#666666',
          font: {
            size: 13,
            family: 'Inter',
            lineHeight: 1.5,
          },
          maxTicksLimit: 15,
        },
      },
      yAltitude: {
        display: false,
      },
      yCadence: {
        display: false,
      },
      yHr: {
        position: 'left',
        grid: {
          color: '#cccccc40',
          drawBorder: false,
        },
        ticks: {
          mirror: true,
          padding: 0,
          callback: function (val, index, ticks) {
            if (index % 2 === 0 || ticks.length - 1 === index) return null;

            return `${Number(val)} bmp`;
          },
        },
      },
      ySpeed: {
        position: 'right',
        grid: {
          display: false,
        },
        ticks: {
          mirror: true,
          padding: 0,
          callback: function (val, index, ticks) {
            if (index % 2 === 0 || ticks.length - 1 === index) return null;

            return `${Number(val)} km/h`;
          },
        },
      },
    },
    elements: {
      point: {
        hitRadius: 32,
        radius: 0,
        hoverBorderWidth: 3,
        hoverRadius: 5,
        hoverBorderColor: '#ffffff',
        hoverBackgroundColor: '#1c64f2',
      },
      line: {
        borderWidth: 2,
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: 'rgb(31 41 55)',
        padding: 16,
        mode: 'index',
        intersect: true,
        position: 'nearest',
        bodySpacing: 6,
        displayColors: false,
        titleSpacing: 0,
        titleFont: {
          size: 16,
          family: 'Inter',
          weight: 'bold',
        },
        bodyFont: {
          size: 16,
          family: 'Inter',
        },
      },
      zoom: {
        limits: {
          x: { minRange: 120 },
        },
        pan: {
          enabled: true,
          mode: 'x',
          onPanComplete: ({ chart }) => {
            updateChartPosition(chart.scales.x.min, chart.scales.x.max);
          },
        },
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.5,
          },
          drag: {
            enabled: true,
            modifierKey: 'ctrl',
            backgroundColor: '#1c64f21A',
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
          onZoomComplete: ({ chart }) => {
            updateChartPosition(chart.scales.x.min, chart.scales.x.max);
          },
        },
      },
    },
  };

  const data: ChartData = useMemo(() => {
    const labels = chartData.map(({ durationStr }) => {
      return durationStr;
    });

    return {
      labels,
      datasets: [
        {
          label: 'Heart rate',
          borderColor: 'rgb(239, 68, 68)', // bg-red-500
          data: chartData.map(({ heartRate }) => heartRate ?? null),
          yAxisID: 'yHr',
        },
        {
          label: 'Speed',
          borderColor: 'rgb(79, 70, 229)', // bg-indigo-700
          data: chartData.map(({ speed }) => speed ?? null),
          yAxisID: 'ySpeed',
        },
        {
          label: 'Altitude',
          borderColor: 'rgb(231, 229, 228)', // bg-stone-200
          data: chartData.map(({ altitude }) => altitude ?? null),
          yAxisID: 'yAltitude',
          fill: true,
        },
        {
          label: 'Cadence',
          borderColor: 'rgb(20, 184, 166)', // bg-teal-500
          data: chartData.map(({ cadence }) => cadence ?? null),
          yAxisID: 'yCadence',
          hidden: true,
        },
      ],
    };
  }, [chartData]);

  if (!chartData?.length) {
    return null;
  }

  return (
    <div className="min-h-[300px] h-[20vh] md:h-auto md:min-h-0 md:aspect-video mt-8">
      <Chart type="line" data={data} options={options} />
    </div>
  );
};
