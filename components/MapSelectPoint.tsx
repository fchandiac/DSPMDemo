"use client";
import { MapContainer, TileLayer, Marker, useMapEvent } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Box from '@mui/material/Box';

interface MapSelectPointProps {
  marker?: { lat: number; lng: number } | null;
  onSelect: (lat: number, lng: number) => void;
}

export default function MapSelectPoint({ marker, onSelect }: MapSelectPointProps) {
  const [selected, setSelected] = useState(marker);

  // Icono personalizado
  const pinIcon = L.divIcon({
    html: `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='#1976d2'><path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/></svg>`,
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  function MapClickHandler() {
    useMapEvent('click', (e) => {
      setSelected({ lat: e.latlng.lat, lng: e.latlng.lng });
      onSelect(e.latlng.lat, e.latlng.lng);
    });
    return null;
  }

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
      <MapContainer center={[selected?.lat || -36.15, selected?.lng || -71.83]} zoom={15} style={{ width: '100%', height: '100%' }} className="hide-leaflet-attribution">
        <MapClickHandler />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selected && (
          <Marker position={[selected.lat, selected.lng]} icon={pinIcon} />
        )}
      </MapContainer>
    </Box>
  );
}
