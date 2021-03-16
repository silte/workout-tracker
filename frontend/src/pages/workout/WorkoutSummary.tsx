import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Container from "../../components/container/container";
import Heading from "../../components/heading/heading";
import Listing from "../../components/listing/listing";
import Spacer from "../../components/spacer/spacer";
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

import "./WorkoutSummary.scss";
import { sumNumbers } from "../../utils/numberOperations";
import ButtonGroup from "../../components/button/buttonGroup";
import Loader from "../../components/loader/loader";

interface IWorkoutSummary {
  workoutList: IWorkoutSummaryData[];
  workoutSummaryData: ISummaryData[];
  filterStartDate: number;
  filterEndDate: number;
  setFilterStartDate: React.Dispatch<React.SetStateAction<number>>;
  setFilterEndDate: React.Dispatch<React.SetStateAction<number>>;
  setIsMultisportExposed: React.Dispatch<React.SetStateAction<boolean>>;
  isMultisportExposed: boolean;
}

const DAY_IN_MS = 86400000;
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
    <ul className="listing col--3 workout-summary-data workout-summary-data--total">
      <li className="listing__item workout-summary-data__item">
        <Heading headingLevel={2} label="Duration" className="h3">
          {secondsToHms(workoutTotalSummaryData.totalDuration)}
        </Heading>
      </li>
      <li className="listing__item workout-summary-data__item">
        <Heading headingLevel={2} label="Distance" className="h3">
          {metresToKilometres(workoutTotalSummaryData.totalDistance)}
        </Heading>
      </li>
      <li className="listing__item workout-summary-data__item">
        <Heading headingLevel={2} label="Ascent" className="h3">
          {getRoundedMetres(workoutTotalSummaryData.totalAscent)}
        </Heading>
      </li>
      <li className="listing__item workout-summary-data__item">
        <Heading headingLevel={2} label="Hr zones" className="h3">
          <Heading headingLevel={3} label="zone 1">
            {secondsToHms(workoutTotalSummaryData.hrIntensity?.zone1)}
          </Heading>
          <Heading headingLevel={3} label="zone 2">
            {secondsToHms(workoutTotalSummaryData.hrIntensity?.zone2)}
          </Heading>
          <Heading headingLevel={3} label="zone 3">
            {secondsToHms(workoutTotalSummaryData.hrIntensity?.zone3)}
          </Heading>
          <Heading headingLevel={3} label="zone 4">
            {secondsToHms(workoutTotalSummaryData.hrIntensity?.zone4)}
          </Heading>
          <Heading headingLevel={3} label="zone 5">
            {secondsToHms(workoutTotalSummaryData.hrIntensity?.zone5)}
          </Heading>
        </Heading>
      </li>
    </ul>
  );
};

const WorkoutAcivitySummary = ({
  workoutSummaryData,
}: {
  workoutSummaryData: ISummaryData[];
}) => (
  <ul className="listing col--3 workout-summary-data workout-summary-data--activity">
    {workoutSummaryData.map(
      ({ activityId, totalDistance, totalDuration, totalAscent }) => (
        <li
          key={activityId}
          className="listing__item workout-summary-data__item"
        >
          <Heading headingLevel={2} className="h4">
            {getActivityName(activityId)}
          </Heading>
          <Heading headingLevel={3} label="Duration" className="h4">
            {secondsToHms(totalDuration)}
          </Heading>
          <Heading headingLevel={3} label="Distance" className="h4">
            {metresToKilometres(totalDistance)}
          </Heading>
          <Heading headingLevel={3} label="Ascent" className="h4">
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
}: IWorkoutSummary): JSX.Element => {
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
    <div className="workout-summary">
      <Spacer large>
        <Container>
          <Spacer small>
            <Heading
              headingLevel={1}
              className="workout-summary__title"
              label="Summary of"
            >
              {workoutCount}{" "}
              {workoutCount > 1 || workoutCount === 0 ? "Workouts" : "Workout"}
            </Heading>
            <Heading headingLevel={3}>Filters</Heading>
            <div className="workout-summary__date-picker">
              <DatePicker
                selected={new Date(filterStartDate)}
                onChange={(date: Date) => onChangeFilterStartDate(date)}
                maxDate={today}
                dateFormat="d.M.yyyy"
                placeholderText="Start date"
                className="workout-summary__date-picker-input"
              />
              <DatePicker
                selected={new Date(filterEndDate + TIMEZONE_OFFSET)}
                onChange={(date: Date) => onChangeFilterEndDate(date)}
                maxDate={today}
                dateFormat="d.M.yyyy"
                placeholderText="End date"
                className="workout-summary__date-picker-input"
              />
            </div>
          </Spacer>
          <Spacer>
            <ButtonGroup>
              <Button onClick={selectPreviousWeek}>Previous</Button>
              <Button onClick={selectWeek}>Week</Button>
              <Button onClick={selectNextWeek}>
                {isNextWeekFuture ? "disabled Next" : "Next"}
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button onClick={selectPreviousMonth}>Previous</Button>
              <Button onClick={selectMonth}>Month</Button>
              <Button onClick={selectNextMonth}>
                {isNextMonthFuture ? "disabled Next" : "Next"}
              </Button>
            </ButtonGroup>
          </Spacer>
        </Container>
        {workoutCount > 0 ? (
          <>
            <Container>
              <Spacer small>
                <div className="workout-summary__multisport">
                  <Button onClick={toggleMultisportExpose}>
                    Toggle multisports
                  </Button>
                </div>
                <WorkoutTotalSummary workoutSummaryData={workoutSummaryData} />
                <WorkoutAcivitySummary
                  workoutSummaryData={workoutSummaryData}
                />
              </Spacer>
            </Container>
            <Container>
              <Listing
                arrayOfContent={workoutList.slice(0, 100)}
                listingComponent={WorkoutItem}
                keyFieldName="workoutKey"
              />
            </Container>
          </>
        ) : (
          <Loader />
        )}
      </Spacer>
    </div>
  );
};

export default WorkoutSummary;
