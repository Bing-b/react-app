import { ConfigProvider, theme } from 'antd';
import { useState } from 'react';
import './App.scss';
import AutoRouter from './components/AutoRouter';
import GetRoutes from './routes/index';

const { defaultAlgorithm, darkAlgorithm } = theme;

const App = () => {
  const [isDark, setIsDark] = useState(true);

  return (
    <ConfigProvider
      theme={{ algorithm: isDark ? darkAlgorithm : defaultAlgorithm }}
    >
      <AutoRouter>
        <GetRoutes></GetRoutes>
      </AutoRouter>
    </ConfigProvider>
  );
};

export default App;
