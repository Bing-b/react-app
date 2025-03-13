import './App.scss';
import AutoRouter from './components/AutoRouter';
import GetRoutes from './routes/index';

const App = () => {
  return (
    <AutoRouter>
      <GetRoutes></GetRoutes>
    </AutoRouter>
  );
};

export default App;
