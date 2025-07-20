
// @ts-ignore
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import { useEffect } from 'react';
function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom(), { animate: true });
  }, [lat, lng, map]);
  return null;
}
import L from 'leaflet';
// @ts-ignore
import 'leaflet/dist/leaflet.css';
import Box from '@mui/material/Box';

interface MapViewProps {
  latitude?: number;
  longitude?: number;
  onMapClick?: (lat: number, lng: number) => void;
  marker?: { lat: number; lng: number } | null;
}

export default function MapView({ latitude, longitude, onMapClick, marker }: MapViewProps) {
  const lat = marker?.lat || latitude || -36.15;
  const lng = marker?.lng || longitude || -71.83;

  // Icono de posición del usuario (SVG tipo "pin")
  // Usar el color primary de MUI
  const primaryColor = '#1976d2'; // Puedes cambiarlo si tu theme usa otro tono
  const userIcon = L.divIcon({
    html: `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='${primaryColor}'><path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/></svg>`,
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  // Componente para manejar el click en el mapa
  function MapClickHandler() {
    useMapEvent('click', (e) => {
      if (onMapClick) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    });
    return null;
  }

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
      {/* @ts-ignore: React-Leaflet types may not match current React version */}
      <MapContainer center={[lat, lng]} zoom={15} style={{ width: '100%', height: '100%' }} className="hide-leaflet-attribution">
        <RecenterMap lat={lat} lng={lng} />
        {onMapClick && <MapClickHandler />}
        {/* @ts-ignore: React-Leaflet types may not match current React version */}
        <TileLayer
          // @ts-ignore
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Mostrar marcador personalizado si marker está presente, si no, mostrar el de usuario */}
        {marker ? (
          <Marker position={[marker.lat, marker.lng]} icon={userIcon}>
            <Popup>Ubicación seleccionada</Popup>
          </Marker>
        ) : (
          <Marker position={[lat, lng]} icon={userIcon}>
            <Popup>Tu ubicación</Popup>
          </Marker>
        )}
      </MapContainer>
    </Box>
  );
}
