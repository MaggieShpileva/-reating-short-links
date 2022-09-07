import './App.css';
import { FormRegistration } from './components/FormRegistration/FormRegistration';
import { FormAuthorization } from './components/FormAuthorization/FormAuthorization';
import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom';
import { MainPage } from './components/MainPage/MainPage';
import { store } from './components/redux/store/ConfigeStore';
import { Provider } from 'react-redux';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<FormAuthorization />} />
          <Route path="/Registration" element={<FormRegistration />} />
          <Route path="/squeeze" element={<MainPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
