import './css/slickSlider.css';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { store } from './app/store.ts';
import { Provider } from 'react-redux';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
