import Container from '../../components/container/container';
import Heading from '../../components/heading/heading';
import Listing from '../../components/listing/listing';
import SEO from '../../components/seo/seo';
import { WorkoutSummaryDto } from '../../redux/generated/api';

import WorkoutItem from './WorkoutItem';

const WorkoutList = ({ workoutList }: IWorkoutList): JSX.Element => (
  <>
    <SEO title="Workout list" />
    <Container className="py-16 overflow-x-auto overflow-y-hidden lg:py-32">
      <Heading headingLevel={1} className="workout-list__title">
        Workout list
      </Heading>
      <Listing<WorkoutSummaryDto, 'workoutKey'>
        arrayOfContent={workoutList}
        listingComponent={WorkoutItem}
        keyFieldName="workoutKey"
      />
    </Container>
  </>
);

interface IWorkoutList {
  workoutList: WorkoutSummaryDto[];
}
export default WorkoutList;
