import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import GraphQLPage from './pages/GraphQLPage';
import MyTasksPage from './pages/MyTasksPage';
import WeatherPage from './pages/WeatherPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeatherPage />}>
            <Route index element={<WeatherPage />} />
          </Route>
          <Route path="/tasks" element={<MyTasksPage />}>
            <Route index element={<MyTasksPage />} />
          </Route>
          <Route path="/graphql" element={<GraphQLPage />}>
            <Route index element={<GraphQLPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
