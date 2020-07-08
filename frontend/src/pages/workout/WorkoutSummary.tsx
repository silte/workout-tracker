import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { Container } from "../../components/container/container";
import { Heading } from "../../components/heading/heading";
import { Listing } from "../../components/listing/listing";
import { Spacer } from "../../components/spacer/spacer";
import { WorkoutItem } from "./WorkoutItem";
import { secondsToHms, formatDateToISO8601 } from "../../utils/timeConverter";
import { getActivityName } from "../../utils/activityInfo";
import {
  metresToKilometres,
  getRoundedMetres,
} from "../../utils/distanceConverter";

import "./WorkoutSummary.scss";
import { sumNumbers } from "../../utils/numberOperations";

interface IWorkoutSummary {
  workoutList: IWorkoutSummaryData[];
  workoutSummaryData: ISummaryData[];
  filterStartDate: any;
  filterEndDate: any;
  setFilterStartDate: any;
  setFilterEndDate: any;
  setIsMultisportExposed: any;
  isMultisportExposed: boolean;
}

const DAY_IN_MS = 86400000;
const TIMEZONE_OFFSET = new Date().getTimezoneOffset() * 60 * 1000;

export const WorkoutSummary = ({
  workoutList,
  workoutSummaryData,
  filterStartDate,
  filterEndDate,
  setFilterStartDate,
  setFilterEndDate,
  setIsMultisportExposed,
  isMultisportExposed,
}: IWorkoutSummary) => {
  const onChangeFilterStartDate = (date: any) =>
    setFilterStartDate(date !== 0 ? new Date(date).getTime() : NaN);
  const onChangeFilterEndDate = (date: any) => {
    console.log(date);
    return setFilterEndDate(
      date !== 0
        ? new Date(formatDateToISO8601(date)).getTime() + 86399999
        : NaN
    );
  };
  const toggleMultisportExpose = () =>
    setIsMultisportExposed((prev: boolean) => !prev);

  const today = new Date();

  const workoutCount = workoutList.length;

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
                selected={filterStartDate}
                onChange={(date: Date) => onChangeFilterStartDate(date)}
                maxDate={today}
                dateFormat="d.M.yyyy"
                placeholderText="Start date"
                className="workout-summary__date-picker-input"
              />
              <DatePicker
                selected={filterEndDate + TIMEZONE_OFFSET}
                onChange={(date: Date) => onChangeFilterEndDate(date)}
                maxDate={today}
                dateFormat="d.M.yyyy"
                placeholderText="End date"
                className="workout-summary__date-picker-input"
              />
            </div>
          </Spacer>
        </Container>
        {workoutCount > 0 ? (
          <>
            <Container>
              <Spacer small>
                <div className="workout-summary__multisport">
                  <button
                    className={`workout-summary__toggle ${
                      isMultisportExposed ? "is-active" : ""
                    }`}
                    onClick={toggleMultisportExpose}
                  >
                    Toggle multisports
                  </button>
                </div>
                <WorkoutTotalSummary workoutSummaryData={workoutSummaryData} />
                <WorkoutAcivitySummary
                  workoutSummaryData={workoutSummaryData}
                />
              </Spacer>
            </Container>
            <Container small>
              <Listing
                arrayOfContent={workoutList.slice(0, 100)}
                listingComponent={WorkoutItem}
                keyFieldName="workoutKey"
              />
            </Container>
          </>
        ) : (
          <Loading />
        )}
      </Spacer>
    </div>
  );
};

const Loading = () => (
  <Container>
    <Spacer large>
      <Spacer small>
        <Heading headingLevel={2}>Loading...</Heading>
      </Spacer>
    </Spacer>
  </Container>
);

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
          zone1{" "}
          {secondsToHms(
            typeof workoutTotalSummaryData.hrIntensity?.zone1 !== "undefined"
              ? workoutTotalSummaryData.hrIntensity?.zone1
              : 0
          )}
          <br />
          zone2{" "}
          {secondsToHms(
            typeof workoutTotalSummaryData.hrIntensity?.zone2 !== "undefined"
              ? workoutTotalSummaryData.hrIntensity?.zone2
              : 0
          )}
          <br />
          zone3{" "}
          {secondsToHms(
            typeof workoutTotalSummaryData.hrIntensity?.zone3 !== "undefined"
              ? workoutTotalSummaryData.hrIntensity?.zone3
              : 0
          )}
          <br />
          zone4{" "}
          {secondsToHms(
            typeof workoutTotalSummaryData.hrIntensity?.zone4 !== "undefined"
              ? workoutTotalSummaryData.hrIntensity?.zone4
              : 0
          )}
          <br />
          zone5{" "}
          {secondsToHms(
            typeof workoutTotalSummaryData.hrIntensity?.zone5 !== "undefined"
              ? workoutTotalSummaryData.hrIntensity?.zone5
              : 0
          )}
          <br />
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
