import { useEffect, useRef, useLayoutEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import styles from "./Map.module.css";

const Map: React.FC<{ location: any; coverage?: number }> = ({
  location,
  coverage,
}) => {
  //especificar el elemento HTML al cual Google maps será embebido
  const googlemap = useRef(null);
  const [mapObject, setMapObject] = useState<any>(null);

  //marker
  const marker: any = useRef(null);

  //error
  const accuracyCircle: any = useRef(null);
  const rangeCircle: any = useRef(null);

  // const setUserLocation = (userLocation: any) => {
  //   mapObject?.setCenter({ lat: userLocation.lat, lng: userLocation.lng });

  //   const svgMarker = {
  //     path: "M19,70.15c-4.75,1-9.66,1.1-14.42-3.79C1.4,63.1-.19,58.23,0,53.13c12.17,14.15,27-3.34,9-12.43,8.69-4.12,16.89-.25,21.24,7.76,2.06,3.78,3.29,5.76,4.86,7.11a8.58,8.58,0,0,0,.9.69A8.1,8.1,0,0,1,39.8,51.8,7.14,7.14,0,0,1,43.05,51c3.18,0,7.14,1.9,7.81,5.14h0a1.61,1.61,0,0,1,.44-.06h2.31a1.5,1.5,0,0,1,.37,0,5.6,5.6,0,0,1,5,4.59,1.65,1.65,0,0,1,.71-.16H62a1.5,1.5,0,0,1,.37,0c3.31.51,4.65,2.55,5.12,5.12l.26,0h2.31a1.5,1.5,0,0,1,.37,0c3.8.59,5.29,3.08,5.87,6.08,7-1.07,14.57-5.27,22,2.33a17.78,17.78,0,0,1,4.57,13.23c-12.17-14.15-27,3.34-9,12.43-7.47,3.54-14.59,1.17-19.2-4.66a30.06,30.06,0,0,1-2.34,4.92c-.38.62-.77,1.26-1.27,2.14a.16.16,0,0,0,0,.07,19.77,19.77,0,0,1-1.3,2h1.6a2.51,2.51,0,0,1,2.5,2.5v13.61a2.51,2.51,0,0,1-2.5,2.5H35.13a2.51,2.51,0,0,1-2.5-2.5V106.77a2.51,2.51,0,0,1,2.5-2.5H36a18,18,0,0,1-.9-3.79L22.64,80.07,22.58,80a22.48,22.48,0,0,1-2.5-4.24,12.37,12.37,0,0,1-1.08-4,10.22,10.22,0,0,1,0-1.57Zm92-33.29a2,2,0,0,0-.37-.74,1.51,1.51,0,0,0-.57-.46,1.61,1.61,0,0,0-.7-.22,2.62,2.62,0,0,0-.76.09l-.06,0-7.36,2.24a3,3,0,0,1-3.63-1.55c-.38-.64-.75-1.27-1.2-2s-1-1.38-1.39-2S94,31,93.4,30.38s-1-1.14-1.69-1.83A3.09,3.09,0,0,1,91.22,25l3.91-7.35a1.63,1.63,0,0,0,.13-1.46,2.07,2.07,0,0,0-.31-.65,1.82,1.82,0,0,0-.61-.49l-9.26-4.93a2.81,2.81,0,0,0-.68-.26,2.72,2.72,0,0,0-.82.11,1.31,1.31,0,0,0-.61.33,1.82,1.82,0,0,0-.49.61l-3.6,6.75a3.13,3.13,0,0,1-3.69,1.52c-.82-.21-1.59-.41-2.27-.55s-1.54-.28-2.36-.39a23.32,23.32,0,0,0-2.4-.19c-.84-.06-1.62,0-2.37-.06a3,3,0,0,1-3-2.18l-2.5-8.1c0-.06,0-.06,0-.1a2.52,2.52,0,0,0-.3-.66,2.09,2.09,0,0,0-1.26-.61,1.94,1.94,0,0,0-.82.11L48,9.48a1.9,1.9,0,0,0-.74.36,1.71,1.71,0,0,0-.47.57,1.5,1.5,0,0,0-.21.71,2.29,2.29,0,0,0,.09.75l0,.05,2.25,7.35a3.08,3.08,0,0,1-1.56,3.64c-.64.37-1.27.74-2,1.2s-1.38.95-2,1.39-1.3,1-1.91,1.54-1.15,1-1.83,1.7a3.1,3.1,0,0,1-3.59.48l-7.34-3.91a1.88,1.88,0,0,0-.75-.23,3.3,3.3,0,0,0-.69.07,1.31,1.31,0,0,0-.61.32,1.75,1.75,0,0,0-.49.62l-.4.74a24.3,24.3,0,0,0-6.73-.35l1.78-3.35a8.61,8.61,0,0,1,2-2.49,8.51,8.51,0,0,1,2.81-1.5,8.08,8.08,0,0,1,3.18-.33,8.57,8.57,0,0,1,3,1l5.43,2.9.4-.33c.7-.61,1.45-1.19,2.2-1.78s1.56-1.18,2.3-1.66l.26-.19-1.5-5.05a7.44,7.44,0,0,1-.33-3.17,7.84,7.84,0,0,1,.92-3.06,7.75,7.75,0,0,1,2-2.46,8.26,8.26,0,0,1,2.82-1.5L56.28.41l0,0A8.58,8.58,0,0,1,59.43,0a7.71,7.71,0,0,1,3.06.92A8.54,8.54,0,0,1,65,3a7.27,7.27,0,0,1,1.39,2.81l1.83,5.88a2.12,2.12,0,0,0,.43,0c.9.05,1.83.16,2.81.25s1.87.28,2.81.46a1,1,0,0,1,.39.1l2.46-4.63a7.84,7.84,0,0,1,4.82-3.92l.06,0a7.71,7.71,0,0,1,3.11-.31,8.44,8.44,0,0,1,3,.89l9.25,4.94a8.58,8.58,0,0,1,2.49,2,7.68,7.68,0,0,1,1.5,2.82,8,8,0,0,1,.33,3.17,8.31,8.31,0,0,1-1,3l-2.9,5.44c.11.11.23.28.34.39.6.71,1.19,1.45,1.77,2.2s1.19,1.56,1.66,2.3l.19.27,5.05-1.51a7.43,7.43,0,0,1,3.17-.32,8,8,0,0,1,3.06.91,7.67,7.67,0,0,1,2.46,2l0,.08a8.26,8.26,0,0,1,1.5,2.82l3,9.91.05,0a8.8,8.8,0,0,1,.35,3.13,7.87,7.87,0,0,1-.92,3.06,8.54,8.54,0,0,1-2,2.46A7.31,7.31,0,0,1,114.63,55l-5.88,1.83c0,.15,0,.32,0,.47,0,.91-.15,1.83-.24,2.71,0,0,0,.11,0,.15A26.84,26.84,0,0,1,108,63l-.07.34,4.67,2.49a7.52,7.52,0,0,1,2.47,2,8,8,0,0,1,1.45,2.79l0,.07a7.66,7.66,0,0,1,.31,3.1,8.25,8.25,0,0,1-.9,3l-.74,1.39-1.32-.71a25.71,25.71,0,0,0-4.34-7.75c-.14-.19-.29-.37-.45-.55a27.07,27.07,0,0,0-7.55-6.25c.09-.37.18-.75.26-1.13.13-.75.28-1.54.37-2.42,0,0,0-.11,0-.15.11-.81.17-1.54.23-2.27s.09-1.59.07-2.37a3,3,0,0,1,2.18-3l8.09-2.5s.07,0,.11,0a2.31,2.31,0,0,0,.65-.3,1.52,1.52,0,0,0,.41-.55,1.77,1.77,0,0,0,.21-.71,1.94,1.94,0,0,0-.11-.82L111,36.8l0,.06Zm-34-3.09a21.79,21.79,0,0,1,3.93,2.64,23.11,23.11,0,0,1,3.3,3.33,29.87,29.87,0,0,1,2.5,3.79,21.32,21.32,0,0,1,1.72,4.13,20.05,20.05,0,0,1,.86,4.44,20.89,20.89,0,0,1,0,4.54c0,.11,0,.19,0,.26a23,23,0,0,1-.68,3.77c-1.64.16-3.27.42-4.88.71l-1.48-.79c.13-.34.24-.69.35-1.05a18.63,18.63,0,0,0,.64-3.14.8.8,0,0,1,0-.22,17.14,17.14,0,0,0,0-3.44,17.56,17.56,0,0,0-.62-3.23,14.89,14.89,0,0,0-1.28-3,18.34,18.34,0,0,0-1.91-2.87A16.74,16.74,0,0,0,77,41.19a18.31,18.31,0,0,0-6.2-3.3,18.63,18.63,0,0,0-3.14-.64.57.57,0,0,1-.22,0,18.76,18.76,0,0,0-3.44,0,17.57,17.57,0,0,0-3.23.63,14.89,14.89,0,0,0-3,1.28,18.26,18.26,0,0,0-2.87,1.9,17.35,17.35,0,0,0-2.43,2.42c-.23.27-.46.56-.68.87l-5.46-2.91a20.4,20.4,0,0,1,1.42-1.9A22.63,22.63,0,0,1,51,36.26a28.91,28.91,0,0,1,3.79-2.51A24.63,24.63,0,0,1,59,32a22,22,0,0,1,4.39-.88,21.63,21.63,0,0,1,4.55,0c.1,0,.19.05.25,0a23.26,23.26,0,0,1,4.35.84,26.43,26.43,0,0,1,4.39,1.79l0,0Zm-37.89,24h0v.1h0l0,0V58h0v.21h0v.11h0v.11h0v.34h0V59h0v.12h0v.23h0v.13h0v.13h0V60h0v.13h0v.14h0v.25h0V79a1.68,1.68,0,1,1-3.35,0v-3.1h0a1.84,1.84,0,0,1-.25-.17L31.8,73.16l-4.34-3.57A6.52,6.52,0,0,0,26,68.66H24.87a2.57,2.57,0,0,0-1.45.06,1.46,1.46,0,0,0-.79.81h-.1a5.44,5.44,0,0,0-.2,2.11,8.87,8.87,0,0,0,.81,2.9A18.68,18.68,0,0,0,25.26,78s.07.1.1.16l12.7,20.76a1.68,1.68,0,0,1,.28.76h0a11.41,11.41,0,0,0,1.31,4.59H65a11,11,0,0,0,3.08-3.63.47.47,0,0,1,.06-.09c.36-.62.84-1.41,1.31-2.18a29.64,29.64,0,0,0,2.86-6.82v0l0-.06,0-.1,0-.06v0l0-.1,0-.07v0l0-.1.06-.2,0-.1h0l0-.09,0-.1v0l0-.07,0-.1v-.1l0-.1V90l0-.1,0-.09h0l0-.1,0-.1h0l0-.08,0-.1v0l0-.07,0-.1v-.1l0-.1,0-.07v0l0-.1,0-.08v0l0-.09,0-.1h0l0-.09,0-.1v-.1l0-.09v-.29l0-.1v-.1l0-.09v-.1h0v-.09l0-.1v-.84h0v-1l-.13-5.7a1.94,1.94,0,0,1,0-.24c0-.08,0-.62,0-1.34v-.18h0V76.84h0v-.19h0V75.36h0v-.19h0V74.1h0v-.17h0v-.18h0v-.19l0-.09v-.64l0-.08,0-.09,0-.09h0v-.09l0-.07h0l0-.09v-.08l0-.09V72a3.67,3.67,0,0,0-2.89-3H67.74c0,.47,0,.93,0,1.4h0v0h0v0h0v0h0v.1h0v0h0v.08h0V71h0v0h0v0h0v.1h0v0h0v0h0v0h0v.07h0v0h0v0h0v0h0v0h0v.05h0v0h0v0h0v0h0v0h0v.05h0v0h0v0h0v0h0v0h0v0h0v0h0v0h0v.05c-.06.93-.11,1.84-.11,2.7a1.68,1.68,0,0,1-3.36,0c0-.86.07-1.86.13-2.9v-.33h0v-.17h0v-.15h0v-.33h0v-.17h0v-.15h0v-.17h0V70.2h0v-.34h0v-.33h0V69.2h0V69c0-2.52-.45-4.71-2.48-5.08H59.7a1.37,1.37,0,0,1-.36,0c0,.94,0,1.92-.08,2.87v1c-.06.93-.11,1.83-.11,2.69a1.68,1.68,0,1,1-3.36,0c0-.86.07-1.86.13-2.9v-.17h0v-.15h0v-.16h0v-.17h0v-.17h0v-.17h0v-.32h0v-.16h0v-.17h0v-.14h0v-.17h0v-.17h0v-.07c.08-2.84-.23-5.46-2.47-5.87H51.29a1.49,1.49,0,0,1-.43-.06v6.49a1.68,1.68,0,0,1-3.36,0v-8.2c0-2.32-2.3-3.32-4.45-3.32a3.85,3.85,0,0,0-1.74.42,5,5,0,0,0-2.26,3ZM35.29,70l-1.58-.65a19.89,19.89,0,0,0-2.2-.75l2.41,2,1.37,1.12V70Z",
  //     fillColor: "blue",
  //     fillOpacity: 0.6,
  //     strokeWeight: 0,
  //     rotation: 0,
  //     scale: 2,
  //   };

  //   //marker
  //   if (marker.current) {
  //     marker.current.setMap(null);
  //   }

  //   marker.current = new google.maps.Marker({
  //     icon: {
  //       url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
  //       // This marker is 20 pixels wide by 32 pixels high.
  //       size: new google.maps.Size(32, 32),
  //       // The origin for this image is (0, 0).
  //       origin: new google.maps.Point(0, 0),
  //       // The anchor for this image is the base of the flagpole at (0, 32).
  //       anchor: new google.maps.Point(0, 32),
  //     },
  //     position: { lat: userLocation.lat, lng: userLocation.lng },
  //     // label: "Hola",
  //   });
  //   marker.current.setMap(mapObject);

  //   accuracyCircle?.current?.setMap(mapObject);
  //   rangeCircle.current = new google.maps.Circle({
  //     center: { lat: userLocation.lat, lng: userLocation.lng },
  //     fillColor: "#000000",
  //     fillOpacity: 0.4,
  //     radius: 1000, // rangeCoverage
  //     strokeColor: "#4285f4",
  //     strokeOpacity: 0.4,
  //     strokeWeight: 1,
  //     zIndex: 1,
  //   });

  //   rangeCircle.current.setMap(mapObject);
  // };

  useEffect(() => {
    //Cargando Google Maps JavaScript Api
    // console.log("map1", setMapObject);
    // console.log("map2", googlemap);

    const loader = new Loader({
      apiKey: "AIzaSyDlRwG9CITQZ2vO0tJrw-GRzuoCfKYjBzM",
      version: "weekly",
    });
    let map;
    loader.load().then(() => {
      //Configuracion de parametros para el embebido de Google maps
      const initialView = {
        center: {
          lat: location.lat,
          lng: location.lng,
        },
        zoom: 10,
      };
      const buttonsDisabled = {
        fullscreenControl: true, // remove the top-right button
        mapTypeControl: false, // remove the top-left buttons
        streetViewControl: false, // remove the pegman
        zoomControl: false, // remove the bottom-right buttons
      };
      //incrustando Google Maps
      // const google = window.google;

      if (null !== googlemap.current) {
        // if (null !== mapE) {
        map = new google.maps.Map(
          googlemap.current as HTMLElement,
          {
            ...initialView,
            ...buttonsDisabled,
            // mapId: "bd3589e429b02bbe",
          } as google.maps.MapOptions
        );

        setMapObject(map); //NOTA
        //setUserLocation(initialView.center);
      }
      //marker
    });
  }, []);
  useEffect(() => {
    if (mapObject) {
      if (marker.current) {
        marker.current.setMap(null);
      }

      const dot = {
        fillColor: "#2EB67D",
        fillOpacity: 1,
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeColor: "#2EB67D",
        strokeWeight: 1,
      };
      const initialView = {
        center: {
          lat: location.lat,
          lng: location.lng,
        },
        zoom: 20,
      };

      marker.current = new google.maps.Marker({
        icon: dot,
        position: {
          lat: initialView.center.lat,
          lng: initialView.center.lng,
        },
        // label: "Hola",
      });
      marker.current.setMap(mapObject);

      // if (accuracyCircle.current) {
      //   accuracyCircle.current.setMap(null);
      // }

      rangeCircle.current = new google.maps.Circle({
        center: { lat: initialView.center.lat, lng: initialView.center.lng },
        fillColor: "#000000",
        fillOpacity: 0.4,
        radius: coverage ? 1000 * coverage : null, // rangeCoverage
        strokeColor: "#4285f4",
        strokeOpacity: 0.4,
        strokeWeight: 1,
        zIndex: 1,
      });

      rangeCircle.current.setMap(mapObject);
    }
  }, [mapObject]);
  return <div ref={googlemap} id="map" className={styles.map} />;
};

// Map.propTypes = {
//   setMapObject: PropTypes.func.isRequired,
// };
export default Map;