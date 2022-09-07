import './App.css';
import { FormRegistration } from './components/FormRegistration/FormRegistration';
import { FormAuthorization } from './components/FormAuthorization/FormAuthorization';
import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom';
import { MainPage } from './components/MainPage/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormAuthorization />} />
        <Route path="/Registration" element={<FormRegistration />} />
        <Route path="/squeeze" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
