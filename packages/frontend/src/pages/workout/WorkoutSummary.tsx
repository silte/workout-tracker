import { ChangeEvent, useMemo } from 'react';

import { Button } from '../../components/button/button';
import { ButtonGroup } from '../../components/button/button.group';
import { Container } from '../../components/container/container';
import { DescriptionList } from '../../components/description-list/description-list';
import { DescriptionListItem } from '../../components/description-list/description-list.item';
import { Details } from '../../components/details/details';
import { Heading } from '../../components/heading/heading';
import { Input } from '../../components/input/input';
import { Loader } from '../../components/loader/loader';
import { WorkoutStackedList } from '../../components/workout-stacked-list/workout-stacked-list';
import { PagerOptions } from '../../hooks/usePager';
import { useSetPageInfo } from '../../hooks/useSetPageInfo';
import { WorkoutSummaryDto } from '../../redux/generated/api';
import getActivityName from '../../utils/activityInfo';
import {
  metresToKilometres,
  getRoundedMetres,
} from '../../utils/distanceConverter';
import { inputDateFormat } from '../../utils/formatDate';
import { sumNumbers } from '../../utils/numberOperations';
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
  unixtimeToDate,
} from '../../utils/timeConverter';

interface IWorkoutSummaryProps {
  workoutList: WorkoutSummaryDto[];
  workoutSummaryData: ISummaryData[];
  filterStartDate: number;
  filterEndDate: number;
  setFilterStartDate: React.Dispatch<React.SetStateAction<number>>;
  setFilterEndDate: React.Dispatch<React.SetStateAction<number>>;
  setIsMultisportExposed: React.Dispatch<React.SetStateAction<boolean>>;
  isMultisportExposed: boolean;
}

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
    <>
      <DescriptionList>
        <DescriptionListItem label="Duration" isLarge>
          {secondsToHms(workoutTotalSummaryData.totalDuration)}
        </DescriptionListItem>
        <DescriptionListItem label="Distance">
          {metresToKilometres(workoutTotalSummaryData.totalDistance)}
        </DescriptionListItem>
        <DescriptionListItem label="Ascent">
          {getRoundedMetres(workoutTotalSummaryData.totalAscent)}
        </DescriptionListItem>
      </DescriptionList>

      <DescriptionList label="Hr zones" className="mt-6">
        <DescriptionListItem label="zone 1">
          {secondsToHms(workoutTotalSummaryData.hrIntensity?.zone1)}
        </DescriptionListItem>
        <DescriptionListItem label="zone 2">
          {secondsToHms(workoutTotalSummaryData.hrIntensity?.zone2)}
        </DescriptionListItem>
        <DescriptionListItem label="zone 3">
          {secondsToHms(workoutTotalSummaryData.hrIntensity?.zone3)}
        </DescriptionListItem>
        <DescriptionListItem label="zone 4">
          {secondsToHms(workoutTotalSummaryData.hrIntensity?.zone4)}
        </DescriptionListItem>
        <DescriptionListItem label="zone 5">
          {secondsToHms(workoutTotalSummaryData.hrIntensity?.zone5)}
        </DescriptionListItem>
      </DescriptionList>
    </>
  );
};

const WorkoutAcivitySummary = ({
  workoutSummaryData,
  className = '',
}: {
  workoutSummaryData: ISummaryData[];
  className?: string;
}) => (
  <ul className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
    {workoutSummaryData.map(
      ({ activityId, totalDistance, totalDuration, totalAscent }) => (
        <li key={activityId}>
          <DescriptionList label={getActivityName(activityId)}>
            <DescriptionListItem label="Duration" isWide>
              {secondsToHms(totalDuration)}
            </DescriptionListItem>
            <DescriptionListItem label="Distance" isWide>
              {metresToKilometres(totalDistance)}
            </DescriptionListItem>
            <DescriptionListItem label="Ascent" isWide>
              {getRoundedMetres(totalAscent)}
            </DescriptionListItem>
          </DescriptionList>
        </li>
      )
    )}
  </ul>
);

type WorkoutListingProps = { workouts: WorkoutSummaryDto[] };

const WorkoutListing = ({ workouts }: WorkoutListingProps) =>
  useMemo(() => {
    const workoutList = workouts.map((workout) => ({
      additionalInfo: metresToKilometres(workout.totalDistance),
      additionalInfoLabel: 'Distance',
      duration: secondsToHms(workout.totalTime),
      date: unixtimeToDate(workout.startTime),
      label: getActivityName(workout.activityId),
      link: `/workout/${workout.workoutKey}`,
      id: workout._id,
    }));

    return (
      <WorkoutStackedList
        rows={workoutList}
        isPagerHidden
        pagerOptions={{} as PagerOptions}
      />
    );
  }, [workouts]);

const WorkoutSummary = ({
  workoutList,
  workoutSummaryData,
  filterStartDate,
  filterEndDate,
  setFilterStartDate,
  setFilterEndDate,
  setIsMultisportExposed,
  isMultisportExposed,
}: IWorkoutSummaryProps): React.ReactElement => {
  useSetPageInfo({ title: 'Workout Summary' });

  const onChangeFilterStartDate = (date: Date | number) =>
    setFilterStartDate(
      typeof date !== 'number' ? new Date(date).getTime() : NaN
    );

  const onChangeFilterEndDate = (date: Date | number) => {
    // eslint-disable-next-line no-console
    console.log(date);
    return setFilterEndDate(
      typeof date !== 'number'
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
      <Container className="mt-9">
        <div className="grid gap-y-4 gap-x-4 sm:grid-cols-2">
          <Input
            id="startDate"
            type="date"
            max={inputDateFormat(today)}
            value={
              filterStartDate ? inputDateFormat(new Date(filterStartDate)) : ''
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onChangeFilterStartDate(new Date(e.target.value));
            }}
            isDate
          >
            Start date
          </Input>
          <Input
            id="endDate"
            type="date"
            max={inputDateFormat(today)}
            value={
              filterEndDate ? inputDateFormat(new Date(filterEndDate)) : ''
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onChangeFilterEndDate(new Date(e.target.value));
            }}
            isDate
          >
            End date
          </Input>
        </div>
        <div className="flex gap-4">
          <ButtonGroup className="mt-6">
            <Button onClick={selectPreviousWeek}>Previous</Button>
            <Button onClick={selectWeek}>Week</Button>
            <Button onClick={selectNextWeek} isDisabled={isNextWeekFuture}>
              Next
            </Button>
          </ButtonGroup>
          <ButtonGroup className="mt-6">
            <Button onClick={selectPreviousMonth}>Previous</Button>
            <Button onClick={selectMonth}>Month</Button>
            <Button onClick={selectNextMonth} isDisabled={isNextMonthFuture}>
              Next
            </Button>
          </ButtonGroup>
        </div>
      </Container>
      {workoutCount > 0 ? (
        <>
          <Container className="mt-12">
            <Heading
              ctaElement={
                <Button
                  accentColor={isMultisportExposed ? 'blue' : 'plain'}
                  onClick={toggleMultisportExpose}
                >
                  Toggle multisports
                </Button>
              }
            >
              Summary of selected {workoutList.length} workouts
            </Heading>
            <Details label="Overall summary" isOpen>
              <WorkoutTotalSummary workoutSummaryData={workoutSummaryData} />
            </Details>
            <Details label="Activity summary">
              <WorkoutAcivitySummary workoutSummaryData={workoutSummaryData} />
            </Details>
          </Container>
          <Container className="mt-6">
            <WorkoutListing workouts={workoutList} />
          </Container>
        </>
      ) : (
        <Loader className="mt-8" />
      )}
    </>
  );
};

export default WorkoutSummary;
