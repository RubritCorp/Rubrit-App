import { useEffect, useRef, useLayoutEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import styles from "./Map.module.css";

const Map: React.FC<{ setMapObject: any }> = ({ setMapObject }) => {
  //especificar el elemento HTML al cual Google maps será embebido
  const googlemap = useRef(null);

  useEffect(() => {
    //Cargando Google Maps JavaScript Api
    console.log("map1", setMapObject);
    console.log("map2", googlemap);

    const loader = new Loader({
      apiKey: "AIzaSyDlRwG9CITQZ2vO0tJrw-GRzuoCfKYjBzM",
      version: "weekly",
    });
    let map;
    loader.load().then(() => {
      //Configuracion de parametros para el embebido de Google maps
      const initialView = {
        center: {
          lat: 34.9988127,
          lng: 135.7674863,
        },
        zoom: 14,
      };
      const buttonsDisabled = {
        fullscreenControl: false, // remove the top-right button
        mapTypeControl: false, // remove the top-left buttons
        streetViewControl: false, // remove the pegman
        zoomControl: false, // remove the bottom-right buttons
      };
      //incrustando Google Maps
      // const google = window.google;
      console.log("map3", google);

      if (null !== googlemap.current) {
        // if (null !== mapE) {
        map = new google.maps.Map(
          googlemap.current as HTMLElement,
          {
            ...initialView,
            ...buttonsDisabled,
            mapId: "bd3589e429b02bbe",
          } as google.maps.MapOptions
        );
        console.log("map4", map);
        setMapObject(map); //NOTA
      }
    });
  }, [setMapObject]);

  return <div ref={googlemap} id="map" className={styles.map} />;
};

// Map.propTypes = {
//   setMapObject: PropTypes.func.isRequired,
// };
export default Map;
