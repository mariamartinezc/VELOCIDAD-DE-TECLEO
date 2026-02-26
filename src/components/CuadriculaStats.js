import React from 'react';
import { 
  AiFillDashboard,     // PPM - existe como Fill
  AiFillCheckCircle,   // PRECISIÓN - existe como Fill
  AiFillClockCircle,   // TIEMPO - existe como Fill
  AiFillTrophy         // MEJOR - existe como Fill
} from 'react-icons/ai';

function CuadriculaStats({ ppm, precision, tiempo, mejor }) {
  const stats = [
    { label: 'PPM', value: ppm, icono: AiFillDashboard, color: '#9147ff' },
    { label: 'PRECISIÓN', value: `${precision}%`, icono: AiFillCheckCircle, color: '#00ff9d' },
    { label: 'TIEMPO', value: `${tiempo}s`, icono: AiFillClockCircle, color: '#00e5ff' },
    { label: 'MEJOR', value: mejor || '—', icono: AiFillTrophy, color: '#ffb347' },
  ];

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

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '15px',
    marginBottom: '30px',
  },
  card: {
    background: 'rgba(18, 22, 28, 0.95)',
    border: '2px solid',
    borderColor: '#9147ff',
    borderRadius: '15px',
    padding: '20px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 20px rgba(145, 71, 255, 0.2)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '15px',
  },
  icono: {
    fontSize: '24px',
  },
  label: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '14px',
    color: '#ffffff',
  },
  valor: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '32px',
    fontWeight: '700',
    textShadow: '0 0 20px currentColor',
  },
};

export default CuadriculaStats;