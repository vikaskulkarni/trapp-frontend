import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { ListContainer } from "./Container";

const ResetViewButton: React.FC<{ position: [number, number] }> = ({
  position,
}) => {
  const map = useMap();

  const handleResetView = () => {
    map.setView(position, 14);
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
        color: "rgb(37 99 235)",
      }}
    >
      Reset Location
    </button>
  );
};

interface MapComponentProps {
  destinationTimer: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ destinationTimer }) => {
  return (
    <ListContainer>
      <h4 className="mb-0">Destination: V.B.Darbar, Bijapur</h4>
      <span className="text-sm text-yellow-200">
        <span className="flash">22 & 23 FEBRUARY</span>
        <span
          className="ml-1 text-xs"
          dangerouslySetInnerHTML={{ __html: destinationTimer }}
        ></span>
      </span>

      <MapContainer
        center={[16.82717, 75.72399]}
        zoom={14}
        scrollWheelZoom={false}
        className="map-height"
      >
        <TileLayer
          attribution=""
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[16.82717, 75.72399]}>
          <Popup>
            Dandeli <br /> River Rafting.
          </Popup>
        </Marker>
        <ResetViewButton position={[16.82717, 75.72399]} />
      </MapContainer>
    </ListContainer>
  );
};

export default MapComponent;
