import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Container from "../../components/container/container";
import Heading from "../../components/heading/heading";
import Listing from "../../components/listing/listing";
import Button from "../../components/button/button";
import WorkoutItem from "./WorkoutItem";
import {
  secondsToHms,
  formatDateToISO8601,
  getFirstDayOfWeek,
  getLastDayOfWeek,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getFirstDayOfNextWeek,
  getFirstDayOfPreviousWeek,
  getFirstDayOfNextMonth,
  getFirstDayOfPreviousMonth,
} from "../../utils/timeConverter";
import getActivityName from "../../utils/activityInfo";
import {
  metresToKilometres,
  getRoundedMetres,
} from "../../utils/distanceConverter";

import { sumNumbers } from "../../utils/numberOperations";
import Loader from "../../components/loader/loader";
import Hero from "../../components/hero/hero";
import ButtonGroup from "../../components/button/button.group";
import SEO from "../../components/seo/seo";

interface IWorkoutSummaryProps {
  workoutList: IWorkoutSummary[];
  workoutSummaryData: ISummaryData[];
  filterStartDate: number;
  filterEndDate: number;
  setFilterStartDate: React.Dispatch<React.SetStateAction<number>>;
  setFilterEndDate: React.Dispatch<React.SetStateAction<number>>;
  setIsMultisportExposed: React.Dispatch<React.SetStateAction<boolean>>;
  isMultisportExposed: boolean;
}

const TIMEZONE_OFFSET = new Date().getTimezoneOffset() * 60 * 1000;

const WorkoutTotalSummary = ({
  workoutSummaryData,
}: {
  workoutSummaryData: ISummaryData[];
}) => {
  const workoutTotalSummaryData = workoutSummaryData.reduce(
    ({ totalAscent, totalDuration, totalDistance, hrIntensity }, current) => ({
      activityId: -1,
      totalAscent: totalAscent + current.totalAscent,
      totalDuration: totalDuration + current.totalDuration,
      totalDistance: totalDistance + current.totalDistance,
      hrIntensity: {
        zone1: sumNumbers(hrIntensity?.zone1, current.hrIntensity?.zone1),
        zone2: sumNumbers(hrIntensity?.zone2, current.hrIntensity?.zone2),
        zone3: sumNumbers(hrIntensity?.zone3, current.hrIntensity?.zone3),
        zone4: sumNumbers(hrIntensity?.zone4, current.hrIntensity?.zone4),
        zone5: sumNumbers(hrIntensity?.zone5, current.hrIntensity?.zone5),
      },
    })
  );

  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <li className="py-9 px-6 bg-blue-600 rounded-md">
        <Heading
          headingLevel={2}
          accent="Duration"
          headingSize="m"
          color="white"
          accentColor="white"
        >
          {secondsToHms(workoutTotalSummaryData.totalDuration)}
        </Heading>
      </li>
      <li className="py-9 px-6 bg-blue-600 rounded-md">
        <Heading
          headingLevel={2}
          accent="Distance"
          headingSize="m"
          color="white"
          accentColor="white"
        >
          {metresToKilometres(workoutTotalSummaryData.totalDistance)}
        </Heading>
      </li>
      <li className="py-9 px-6 bg-blue-600 rounded-md">
        <Heading
          headingLevel={2}
          accent="Ascent"
          headingSize="m"
          color="white"
          accentColor="white"
        >
          {getRoundedMetres(workoutTotalSummaryData.totalAscent)}
        </Heading>
      </li>
      <li className="py-9 px-6 bg-blue-600 rounded-md">
        <Heading
          headingLevel={2}
          accent="Hr zones"
          headingSize="m"
          color="white"
          accentColor="white"
        >
          <Heading
            headingLevel={3}
            accent="zone 1"
            headingSize="s"
            color="white"
            accentColor="white"
          >
            {secondsToHms(workoutTotalSummaryData.hrIntensity?.zone1)}
          </Heading>
          <Heading
            headingLevel={3}
            accent="zone 2"
            headingSize="s"
            color="white"
            accentColor="white"
          >
            {secondsToHms(workoutTotalSummaryData.hrIntensity?.zone2)}
          </Heading>
          <Heading
            headingLevel={3}
            accent="zone 3"
            headingSize="s"
            color="white"
            accentColor="white"
          >
            {secondsToHms(workoutTotalSummaryData.hrIntensity?.zone3)}
          </Heading>
          <Heading
            headingLevel={3}
            accent="zone 4"
            headingSize="s"
            color="white"
            accentColor="white"
          >
            {secondsToHms(workoutTotalSummaryData.hrIntensity?.zone4)}
          </Heading>
          <Heading
            headingLevel={3}
            accent="zone 5"
            headingSize="s"
            color="white"
            accentColor="white"
          >
            {secondsToHms(workoutTotalSummaryData.hrIntensity?.zone5)}
          </Heading>
        </Heading>
      </li>
    </ul>
  );
};

const WorkoutAcivitySummary = ({
  workoutSummaryData,
  className = "",
}: {
  workoutSummaryData: ISummaryData[];
  className?: string;
}) => (
  <ul className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
    {workoutSummaryData.map(
      ({ activityId, totalDistance, totalDuration, totalAscent }) => (
        <li
          key={activityId}
          className="py-9 px-6 bg-gray-50 rounded-md border-solid border-gray-100 border-1"
        >
          <Heading headingLevel={2} headingSize="m">
            {getActivityName(activityId)}
          </Heading>
          <Heading headingLevel={3} accent="Duration" headingSize="m">
            {secondsToHms(totalDuration)}
          </Heading>
          <Heading headingLevel={3} accent="Distance" headingSize="m">
            {metresToKilometres(totalDistance)}
          </Heading>
          <Heading headingLevel={3} accent="Ascent" headingSize="m">
            {getRoundedMetres(totalAscent)}
          </Heading>
        </li>
      )
    )}
  </ul>
);

const WorkoutSummary = ({
  workoutList,
  workoutSummaryData,
  filterStartDate,
  filterEndDate,
  setFilterStartDate,
  setFilterEndDate,
  setIsMultisportExposed,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isMultisportExposed,
}: IWorkoutSummaryProps): React.ReactElement => {
  const onChangeFilterStartDate = (date: Date | number) =>
    setFilterStartDate(
      typeof date !== "number" ? new Date(date).getTime() : NaN
    );

  const onChangeFilterEndDate = (date: Date | number) => {
    // eslint-disable-next-line no-console
    console.log(date);
    return setFilterEndDate(
      typeof date !== "number"
        ? new Date(formatDateToISO8601(date)).getTime() + 86399999
        : NaN
    );
  };
  const toggleMultisportExpose = () =>
    setIsMultisportExposed((prev: boolean) => !prev);

  const setWeekByStartDate = (date: Date) => {
    const monday = getFirstDayOfWeek(date);
    const sunday = getLastDayOfWeek(date);
    setFilterStartDate(monday.getTime());
    setFilterEndDate(sunday.getTime());
  };

  const setMonthByStartDate = (date: Date) => {
    const firstDayOfMonth = getFirstDayOfMonth(date);
    const lastDayOfMonth = getLastDayOfMonth(date);
    setFilterStartDate(firstDayOfMonth.getTime());
    setFilterEndDate(lastDayOfMonth.getTime());
  };

  const getStartDate = (): Date => {
    return Number.isNaN(filterStartDate)
      ? new Date()
      : new Date(filterStartDate);
  };

  const selectWeek = () => {
    const baseDayForWeek = getStartDate();
    setWeekByStartDate(baseDayForWeek);
  };

  const selectNextWeek = () => {
    const baseDayForWeek = getStartDate();
    setWeekByStartDate(getFirstDayOfNextWeek(baseDayForWeek));
  };

  const selectPreviousWeek = () => {
    const baseDayForWeek = getStartDate();
    setWeekByStartDate(getFirstDayOfPreviousWeek(baseDayForWeek));
  };

  const selectMonth = () => {
    const baseDayForMonth = getStartDate();
    setMonthByStartDate(baseDayForMonth);
  };

  const selectNextMonth = () => {
    const baseDayForMonth = getStartDate();
    const firstDayOfNextMonth = getFirstDayOfNextMonth(baseDayForMonth);
    setMonthByStartDate(firstDayOfNextMonth);
  };

  const selectPreviousMonth = () => {
    const baseDayForMonth = getStartDate();
    const firstDayOfPreviousMonth = getFirstDayOfPreviousMonth(baseDayForMonth);
    setMonthByStartDate(firstDayOfPreviousMonth);
  };

  const today = new Date();
  const workoutCount = workoutList.length;
  const isNextWeekFuture = new Date() < getFirstDayOfNextWeek(getStartDate());
  const isNextMonthFuture = new Date() < getFirstDayOfNextMonth(getStartDate());

  return (
    <>
      <SEO title="Workout Summary" />
      <Hero
        accent="Summary of"
        label={`${workoutCount} ${
          workoutCount > 1 || workoutCount === 0 ? "Workouts" : "Workout"
        }`}
      >
        View summary of your all workouts
      </Hero>

      <Container className="mt-9">
        <h2 className="text-l leading-7 text-gray-900">Filters</h2>
        <ButtonGroup>
          <DatePicker
            selected={
              !Number.isNaN(filterStartDate) ? new Date(filterStartDate) : null
            }
            onChange={(date: Date) => onChangeFilterStartDate(date)}
            maxDate={today}
            dateFormat="d.M.yyyy"
            placeholderText="Start date"
          />
          <DatePicker
            selected={
              !Number.isNaN(filterEndDate)
                ? new Date(filterEndDate + TIMEZONE_OFFSET)
                : null
            }
            onChange={(date: Date) => onChangeFilterEndDate(date)}
            maxDate={today}
            dateFormat="d.M.yyyy"
            placeholderText="End date"
          />
        </ButtonGroup>
        <ButtonGroup className="mt-6">
          <Button onClick={selectPreviousWeek}>Previous</Button>
          <Button onClick={selectWeek}>Week</Button>
          <Button onClick={selectNextWeek}>
            {isNextWeekFuture ? "disabled Next" : "Next"}
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mt-6">
          <Button onClick={selectPreviousMonth}>Previous</Button>
          <Button onClick={selectMonth}>Month</Button>
          <Button onClick={selectNextMonth}>
            {isNextMonthFuture ? "disabled Next" : "Next"}
          </Button>
        </ButtonGroup>
      </Container>
      {workoutCount > 0 ? (
        <>
          <Container className="mt-12">
            <div className="flex justify-end mb-3">
              <Button onClick={toggleMultisportExpose}>
                Toggle multisports
              </Button>
            </div>
            <WorkoutTotalSummary workoutSummaryData={workoutSummaryData} />
            <WorkoutAcivitySummary
              workoutSummaryData={workoutSummaryData}
              className="mt-6"
            />
          </Container>
          <Container className="mt-6">
            <Listing<IWorkoutSummary, "workoutKey">
              arrayOfContent={workoutList.slice(0, 100)}
              listingComponent={WorkoutItem}
              keyFieldName="workoutKey"
            />
          </Container>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default WorkoutSummary;
