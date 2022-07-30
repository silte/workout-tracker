import { useSetPageInfo } from '../hooks/useSetPageInfo';

const Home = (): JSX.Element => {
  useSetPageInfo({ title: 'Dashboard' });

  return <h1>Workout tracker frontend</h1>;
};

export default Home;
