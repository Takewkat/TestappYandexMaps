import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App';
import { YMaps } from 'react-yandex-maps';

//load: "util.bounds" это для зумирования и центрирования карты

ReactDOM.render(
    <YMaps query={{apikey:'your api-key',  load: "util.bounds" }}>
      <App />
    </YMaps>,
  document.getElementById('root'));

