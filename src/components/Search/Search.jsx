import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './Search.css';

const SEARCH_ID = "location-search";

function Search({ ymaps, addPoint }) {
  //очистка поля поиска 
  const [value, setValue] = useState("");
   //инициализация поиска
  useEffect(() => {
    const searchControl = new ymaps.control.SearchControl({
      options: {
        provider: "yandex#map"
      }
    });
    const suggestView = new ymaps.SuggestView(SEARCH_ID);
    suggestView.events.add("select", (e) => {
      searchControl
      .search(e.get("item").value)
      .then((data) => {
        const label = data.metaData.geocoder.request;
        const coords = data.geoObjects.get(0).geometry.getCoordinates();
        addPoint(label, coords);
        setValue("");
      })
      .catch((e) => console.log(e));
    });
  }, []) 

  return (
    <input id={SEARCH_ID} 
    placeholder="Адрес" type="text" className="search"
    value={value}
    onChange={(e) => setValue(e.target.value)}
  />  
  );
}

export default Search;

Search.propTypes = {
  addPoint: PropTypes.func.isRequired,
};