import React, {useCallback, useRef, useEffect} from "react";
import {Map, Placemark, Polyline} from 'react-yandex-maps';

const DEFAULT_ZOOM = 9;

function YaMap({ ymaps, points, replacePoint }) {  
  //чертим линии маршрута - polyline
  const coordList = points.map(p => p.coords);
  // центрированиие и зум
  const ref = useRef();
  useEffect(() => {
    //return это выход из хука
    if (!ref.current) { return }

    const map = ref.current.getMap();
    const r = ymaps.util.bounds.getCenterAndZoom(
      ref.current.geometry.getBounds(),
      map.container.getSize()
    );      
    map.setCenter(r.center, points.length > 1 ? r.zoom : DEFAULT_ZOOM);
  }, [ymaps, points, ref.current]);

  //перемещение точки на карте
  const onDragend = useCallback((id, e) => {    
    const coords = e.get('target').geometry.getCoordinates()
    ymaps.geocode(coords)
      .then((result) => { //получение адреса - обратное геокодирование
        const label = result.geoObjects.get(0).getAddressLine();
        replacePoint(id, label, coords )
      })
  }, [ ymaps ]);

  return (
    <Map
      defaultState={{
        center: [55.751574, 37.573856],
        zoom: 9,
        controls: ['zoomControl', 'fullscreenControl']
      }}    
      modules={[
        "geocode",
        "control.SearchControl",
        "SuggestView", 
        'control.ZoomControl',
        'control.FullscreenControl'
      ]}
      onLoad={console.log}
      width='90%'
      height='100%'
    >      
      <Polyline
        geometry={coordList}
        instanceRef={ref}  //зум и центр карты
        options={{
          balloonCloseButton: false,
          strokeColor: '#000',
          strokeWidth: 4,
          strokeOpacity: 0.5,
        }}
      />
      { points.map(p => 
        <Placemark
          key={p.id}
          geometry={p.coords}
          defaultGeometry={p.coords} 
          modules={['geoObject.addon.balloon']}
          properties={{
            balloonContentBody: p.label,
          }}
          options={{
            draggable: true,
          }}          
          onDragend={(e)=> onDragend(p.id, e)}
        />
      )}
    </Map>
  );
}

export default YaMap;
