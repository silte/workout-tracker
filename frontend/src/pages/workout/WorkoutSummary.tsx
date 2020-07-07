import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { Container } from "../../components/container/container";
import { Heading } from "../../components/heading/heading";
import { Listing } from "../../components/listing/listing";
import { Spacer } from "../../components/spacer/spacer";
import { WorkoutItem } from "./WorkoutItem";
import { secondsToHms } from "../../utils/timeConverter";
import { getActivityName } from "../../utils/activityInfo";
import {
  metresToKilometres,
  getRoundedMetres,
} from "../../utils/distanceConverter";

import "./WorkoutSummary.scss";

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
  const onChangeFilterEndDate = (date: any) =>
    setFilterEndDate(date !== 0 ? new Date(date).getTime() : NaN);
  const toggleMultisportExpose = () =>
    setIsMultisportExposed((prev: boolean) => !prev);

  const today = new Date();
  const yesterday = new Date(today.getTime() - DAY_IN_MS);

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
                onChange={(date) => onChangeFilterStartDate(date)}
                maxDate={yesterday}
                dateFormat="d.M.yyyy"
                placeholderText="Start date"
                className="workout-summary__date-picker-input"
              />
              <DatePicker
                selected={filterEndDate}
                onChange={(date) => onChangeFilterEndDate(date)}
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
    ({ totalAscent, totalDuration, totalDistance }, current) => ({
      activityId: -1,
      totalAscent: totalAscent + current.totalAscent,
      totalDuration: totalDuration + current.totalDuration,
      totalDistance: totalDistance + current.totalDistance,
    }),
    { totalAscent: 0, totalDuration: 0, totalDistance: 0 } as ISummaryData
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
