import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function AlertaInfoDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 700 }}>
        ¿Qué es una alerta?
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2, mt: 1 }}>
          Una alerta es una notificación que comunica una situación de urgencia moderada. Se envía de manera inmediata a la central de monitoreo, aunque su atención dependerá de la disponibilidad de recursos. Utilice esta opción para acontecimientos que requieren intervención rápida, pero que no constituyen una emergencia crítica.
        </Typography>
        <Box sx={{ width: '100%', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={onClose} sx={{ width: '100%' }}>
            Cerrar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
