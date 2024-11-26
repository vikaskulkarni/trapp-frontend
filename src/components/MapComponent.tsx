import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { ListContainer } from "./Container";

const ResetViewButton: React.FC<{ position: [number, number] }> = ({
  position,
}) => {
  const map = useMap();

  const handleResetView = () => {
    map.setView(position, 12);
  };

  return (
    <button
      onClick={handleResetView}
      style={{
        position: "absolute",
        top: 5,
        right: 10,
        zIndex: 1000,
        textDecoration: "underline",
      }}
    >
      Reset Location
    </button>
  );
};

const MapComponent = () => {
  return (
    <ListContainer>
      <h4>Destination: Dandeli</h4>
      <MapContainer
        center={[15.30414, 74.61303]}
        zoom={12}
        scrollWheelZoom={false}
        className="map-height"
      >
        <TileLayer
          attribution=""
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[15.30414, 74.61303]}>
          <Popup>
            Dandeli <br /> River Rafting.
          </Popup>
        </Marker>
        <ResetViewButton position={[15.30414, 74.61303]} />
      </MapContainer>
    </ListContainer>
  );
};

export default MapComponent;
