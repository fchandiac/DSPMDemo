import { useEffect, useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function SOSDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [spectrum, setSpectrum] = useState<number[]>(Array(32).fill(0));
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let dataArray: Uint8Array | null = null;
    let source: MediaStreamAudioSourceNode | null = null;
    let stream: MediaStream | null = null;

    async function startMic() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new window.AudioContext();
        analyser = audioContext.createAnalyser();
        source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.fftSize = 64;
        dataArray = new Uint8Array(analyser.frequencyBinCount);

        function animate() {
          if (analyser && dataArray) {
            analyser.getByteFrequencyData(dataArray);
            // Tomar los valores de frecuencia y normalizarlos para el espectro
            const norm = Array.from(dataArray).map(v => Math.round((v / 255) * 70));
            setSpectrum(norm);
          }
          animationRef.current = requestAnimationFrame(animate);
        }
        animate();
      } catch (err) {
        // Eliminado: setDecibel(0); ya no se usa decibel
      }
    }

    if (open) {
      startMic();
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (audioContext) audioContext.close();
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 700 }}>
        La central de seguridad está escuchando tu micrófono
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
         
          {/* Medidor de espectro de audio real */}
          <Box sx={{ width: '100%', height: 80, bgcolor: '#eee', borderRadius: 2, position: 'relative', mb: 2, display: 'flex', alignItems: 'flex-end', gap: 0.5, px: 1 }}>
            {spectrum.map((value, i) => (
              <Box
                key={i}
                sx={{
                  width: '2%',
                  height: `${Math.max(5, Math.min(100, value))}%`,
                  bgcolor: value > 60 ? 'error.main' : 'primary.main',
                  borderRadius: 1,
                  transition: 'height 0.1s',
                }}
              />
            ))}
          </Box>
           <Box sx={{ width: '100%', mt: 4 }}>
            <Button variant="contained" color="primary" onClick={onClose} sx={{ width: '100%' }}>
              Cerrar
            </Button>
            <Typography align="center" color="textSecondary" sx={{ mt: 2 }}>
              El botón "Cerrar" es para salir de la modalidad SOS y dejar de transmitir audio a la central.
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
