import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { 
  AiFillDashboard,
  AiFillCheckCircle,
  AiFillClockCircle,
  AiFillTrophy
} from 'react-icons/ai';

function CuadriculaStats({ ppm, precision, tiempo, mejor }) {
  // Detectar tamaño de pantalla
  const isMobile = useMediaQuery({ maxWidth: 480 });
  const isTablet = useMediaQuery({ minWidth: 481, maxWidth: 768 });
  
  const stats = [
    { label: 'PPM', value: ppm, icono: AiFillDashboard, color: '#9147ff' },
    { label: 'PRECISIÓN', value: `${precision}%`, icono: AiFillCheckCircle, color: '#00ff9d' },
    { label: 'TIEMPO', value: `${tiempo}s`, icono: AiFillClockCircle, color: '#00e5ff' },
    { label: 'MEJOR', value: mejor || '—', icono: AiFillTrophy, color: '#ffb347' },
  ];

  // Estilos responsive
  const styles = {
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'),
      gap: isMobile ? '8px' : (isTablet ? '10px' : '15px'),
      marginBottom: '30px',
    },
    card: {
      background: 'rgba(18, 22, 28, 0.95)',
      border: '2px solid #9147ff',
      borderRadius: '15px',
      padding: isMobile ? '12px 20px' : '20px',
      textAlign: isMobile ? 'left' : 'center',
      display: isMobile ? 'flex' : 'block',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 0 20px rgba(145, 71, 255, 0.2)',
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: isMobile ? 0 : '15px',
    },
    icono: {
      fontSize: isMobile ? '20px' : '24px',
    },
    label: {
      fontFamily: "'Orbitron', sans-serif",
      fontSize: isMobile ? '12px' : '14px',
      color: '#ffffff',
    },
    valor: {
      fontFamily: "'Orbitron', sans-serif",
      fontSize: isMobile ? '24px' : '32px',
      fontWeight: '700',
      textShadow: '0 0 20px currentColor',
    },
  };

  return (
    <div style={styles.grid}>
      {stats.map((stat, index) => {
        const Icono = stat.icono;
        return (
          <div key={index} style={styles.card}>
            <div style={styles.cardHeader}>
              <Icono style={{ ...styles.icono, color: stat.color }} />
              <span style={styles.label}>{stat.label}</span>
            </div>
            <div style={{ ...styles.valor, color: stat.color }}>{stat.value}</div>
          </div>
        );
      })}
    </div>
  );
}

export default CuadriculaStats;