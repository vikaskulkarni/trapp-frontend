import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { ListContainer } from "./Container";

const MapComponent = () => {
  return (
    <ListContainer>
      <h4 className="text-white">Destination: Dandeli</h4>
      <MapContainer
        center={[15.30414, 74.61303]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "24rem" }}
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
      </MapContainer>
    </ListContainer>
  );
};

export default MapComponent;
