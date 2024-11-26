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
      <h4 className="mb-0">Destination: Dandeli</h4>
      <span className="text-sm text-yellow-200">
        6th to 8th DECEMBER
        <span
          className="ml-1 text-xs"
          dangerouslySetInnerHTML={{ __html: destinationTimer }}
        ></span>
      </span>
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
