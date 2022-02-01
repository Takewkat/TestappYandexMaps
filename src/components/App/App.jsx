import React, { useCallback, useState} from 'react';
import { withYMaps } from 'react-yandex-maps';
import List from '../List/List';
import YaMap from '../Map/Map';
import Search from '../Search/Search';

import './App.css';

// type Point {
//    label: string,
//    coords: [number, number],
//    id: number
// }

let nextID = 1;
function createPoint(label,coords) {
  return {
    label,
    coords,
    id: nextID++,
  }
}

function App({ ymaps}) {

  const [points, setPoints] = useState([])
  //добавление и удаление точки
  const addPoint = useCallback((label, coords) => {
    setPoints((points) => {
      return [...points, createPoint(label, coords)];
    })
  }, []);
  const deletePoint  = (id) => {
    setPoints(points => points.filter(p => p.id !== id));
  };
  //перемещение точки(Placemark) на карте
  const replacePoint = (id, label, coords) => {
    setPoints(points => points.map(
      p => p.id === id ? { ...p, label, coords } : p
    ));
  };
  //перемещение элементов в листе
  const dragPoint = (srcIndex, destIndex) => {
    const items = Array.from(points);
    const [reorderedItem] = items.splice(srcIndex, 1);
    items.splice(destIndex, 0, reorderedItem);
    setPoints(items);
  };

  return (   
    <div className="my-app">
      <div className="textblock">
        <Search 
          addPoint={addPoint} 
          ymaps={ymaps}
        />  
        <List 
          points={points} 
          deletePoint={deletePoint}
          dragPoint={dragPoint}
        />
      </div> 
      <div className="map">  
        <YaMap          
          points={points}
          replacePoint={replacePoint}
          ymaps={ymaps}
        />
      </div> 
    </div>    
  );  
}

export default withYMaps(App, true);