import React from 'react';
import { 
  AiFillCrown,      // FÁCIL - existe como Fill
  AiFillGold,       // MEDIO - existe como Fill
  AiFillFire,       // DIFÍCIL - existe como Fill
  AiFillRobot       // EXPERTO - existe como Fill
} from 'react-icons/ai';

function SelectorDificultad({ dificultad, setDificultad }) {
  const dificultades = [
    { id: 'facil', label: 'FÁCIL', icono: AiFillCrown, color: '#00ff9d' },
    { id: 'medio', label: 'MEDIO', icono: AiFillGold, color: '#ffb347' },
    { id: 'dificil', label: 'DIFÍCIL', icono: AiFillFire, color: '#ff3b3b' },
    { id: 'experto', label: 'EXPERTO', icono: AiFillRobot, color: '#9147ff' },
  ];
  
  return (
    <div style={styles.container}>
      <h3 style={styles.titulo}>SELECCIONA DIFICULTAD</h3>
      <div style={styles.botones}>
        {dificultades.map(({ id, label, icono: Icono, color }) => (
          <button
            key={id}
            onClick={() => setDificultad(id)}
            style={{
              ...styles.boton,
              ...(dificultad === id ? styles.botonActivo : {}),
              borderColor: color,
              boxShadow: dificultad === id ? `0 0 20px ${color}` : 'none',
            }}
          >
            <Icono style={{ ...styles.icono, color }} />
            <span style={styles.botonTexto}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'rgba(18, 22, 28, 0.95)',
    border: '2px solid #9147ff',
    borderRadius: '15px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 0 20px rgba(145, 71, 255, 0.2)',
  },
  titulo: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '16px',
    color: '#ffffff',
    marginBottom: '20px',
    textAlign: 'center',
    letterSpacing: '2px',
  },
  botones: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  boton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 24px',
    background: 'transparent',
    border: '2px solid',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: "'Poppins', sans-serif",
  },
  botonActivo: {
    background: 'rgba(145, 71, 255, 0.2)',
    transform: 'scale(1.05)',
  },
  icono: {
    fontSize: '18px',
  },
  botonTexto: {
    fontFamily: "'Orbitron', sans-serif",
  },
};

export default SelectorDificultad;