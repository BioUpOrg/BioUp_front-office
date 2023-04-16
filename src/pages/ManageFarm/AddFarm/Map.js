import React, { useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, FeatureGroup , useMapEvents} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import osm from "./osm-providers";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const MapPage = ({ onMapClick , onAreaChange  }) => {
  const [center, setCenter] = useState({ lat: 33.8869, lng: 9.5375 });
  const ZOOM_LEVEL = 12;
  const mapRef = useRef();

  const _created = (e) => {
    const type = e.layerType;
    const layer = e.layer;
  
    if (type === "polygon" || type === "rectangle" || type === "circle") {
      const area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
      console.log("Area:", area);
      onAreaChange(area);
    }
  };
  function handleClick(e) {
    onMapClick(e.latlng);
  }
  return (
    <>

      <div className="row">
        <div className="col text-center">
          <div className="col">
            <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
              <FeatureGroup>
                <EditControl
                  position="topright"
                  onCreated={_created}
                  draw={
                    {
                       rectangle: false,
                    circle: false,
                    circlemarker: false,
                    marker: false,
                    polyline: false, 
                    }
                  }
                />
              </FeatureGroup>
              <TileLayer
                url={osm.maptiler.url}
                attribution={osm.maptiler.attribution}
              />
              <ClickHandler onClick={handleClick} />
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );

  function ClickHandler({ onClick }) {
    useMapEvents({
      click(e) {
        onClick(e);
      },
    });

    return null;
  }
};
export default MapPage;

