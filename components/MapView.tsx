
// @ts-ignore
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
// @ts-ignore
import 'leaflet/dist/leaflet.css';
import Box from '@mui/material/Box';

export default function MapView({ latitude, longitude }: { latitude?: number; longitude?: number }) {
  const lat = latitude || -36.15;
  const lng = longitude || -71.83;

  // Icono personalizado usando SVG de MUI
  const userIcon = L.divIcon({
    html: `<svg xmlns='http://www.w3.org/2000/svg' height='40' viewBox='0 0 24 24' width='40' fill='#1976d2'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>`,
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
      {/* @ts-ignore: React-Leaflet types may not match current React version */}
      <MapContainer center={[lat, lng]} zoom={15} style={{ width: '100%', height: '100%' }}>
        {/* @ts-ignore: React-Leaflet types may not match current React version */}
        <TileLayer
          // @ts-ignore
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* @ts-ignore: React-Leaflet types may not match current React version */}
        <Marker position={[lat, lng]} icon={userIcon}>
          <Popup>
            Tu ubicación
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
}
