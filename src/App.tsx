import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes/app-routes';

function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.home} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  )
}

// TODO: remove Home after defining routes
function Home() {
  return <div></div>
}
export default App;
