import './css/slickSlider.css';
import './css/dropdownFadeInAnimation.css';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { store } from './app/store.ts';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
