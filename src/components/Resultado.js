import React from 'react';
import { 
  AiFillTrophy, 
  AiFillStar, 
  AiFillCheckCircle, 
  AiFillCloseCircle, 
  AiFillClockCircle,
  AiFillFire
} from 'react-icons/ai';

function Resultado({ mostrar, estadisticas, mejorPuntaje, onCerrar, onReintentar }) {
  if (!mostrar) return null;

  const esRecord = estadisticas.ppm > mejorPuntaje.ppm && mejorPuntaje.ppm > 0;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {esRecord && (
          <div style={styles.fuegoEffect}>
            <AiFillFire size={40} color="#ff4444" style={styles.fuego} />
          </div>
        )}

        <div style={styles.iconoContainer}>
          <AiFillTrophy size={60} color={esRecord ? '#ffd700' : '#9147ff'} style={styles.icono} />
        </div>

        <h2 style={esRecord ? styles.tituloRecord : styles.titulo}>
          {esRecord ? '¡NUEVO RÉCORD!' : 'PRUEBA COMPLETADA'}
        </h2>

        <div style={styles.puntuacionContainer}>
          <span style={styles.puntuacion}>{estadisticas.ppm}</span>
          <span style={styles.puntuacionLabel}>PPM</span>
        </div>

        <div style={styles.grid}>
          <div style={styles.card}>
            <AiFillCheckCircle color="#00ff9d" size={24} />
            <span style={styles.cardLabel}>PRECISIÓN</span>
            <span style={styles.cardValor}>{estadisticas.precision}%</span>
          </div>
          
          <div style={styles.card}>
            <AiFillCheckCircle color="#00ff9d" size={24} />
            <span style={styles.cardLabel}>CORRECTAS</span>
            <span style={styles.cardValor}>{estadisticas.correctas}</span>
          </div>
          
          <div style={styles.card}>
            <AiFillCloseCircle color="#ff3b3b" size={24} />
            <span style={styles.cardLabel}>INCORRECTAS</span>
            <span style={styles.cardValor}>{estadisticas.incorrectas}</span>
          </div>
          
          <div style={styles.card}>
            <AiFillClockCircle color="#00e5ff" size={24} />
            <span style={styles.cardLabel}>TIEMPO</span>
            <span style={styles.cardValor}>{estadisticas.tiempo}s</span>
          </div>
        </div>

        {!mejorPuntaje.fecha && (
          <div style={styles.baseline}>
            <AiFillStar color="#ffd700" />
            <span>¡LÍNEA BASE ESTABLECIDA!</span>
            <AiFillStar color="#ffd700" />
          </div>
        )}

        <div style={styles.botones}>
          <button onClick={onReintentar} style={styles.botonPrimario}>
            INTENTAR DE NUEVO
          </button>
          <button onClick={onCerrar} style={styles.botonSecundario}>
            CERRAR
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)',
  },
  modal: {
    background: 'linear-gradient(135deg, #1a1e24 0%, #0a0c0f 100%)',
    border: '3px solid #9147ff',
    borderRadius: '30px',
    padding: '40px',
    maxWidth: '600px',
    width: '90%',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 0 50px rgba(145, 71, 255, 0.5)',
  },
  fuegoEffect: {
    position: 'absolute',
    top: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    animation: 'float 2s ease-in-out infinite',
  },
  fuego: {
    filter: 'drop-shadow(0 0 20px #ff4444)',
  },
  iconoContainer: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  icono: {
    filter: 'drop-shadow(0 0 20px currentColor)',
    animation: 'float 3s ease-in-out infinite',
  },
  titulo: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '28px',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: '30px',
  },
  tituloRecord: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '32px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #ffd700, #ffb347)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '30px',
    animation: 'textGlow 2s ease-in-out infinite',
  },
  puntuacionContainer: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  puntuacion: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '80px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #9147ff, #00e5ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: '1',
  },
  puntuacionLabel: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '14px',
    color: '#aaaaaa',
    display: 'block',
    marginTop: '5px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    marginBottom: '30px',
  },
  card: {
    background: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid #9147ff',
    borderRadius: '10px',
    padding: '15px',
    textAlign: 'center',
  },
  cardLabel: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '12px',
    color: '#aaaaaa',
    display: 'block',
    marginTop: '5px',
    marginBottom: '5px',
  },
  cardValor: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '24px',
    fontWeight: '700',
    color: '#ffffff',
  },
  baseline: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '15px',
    background: 'rgba(255, 215, 0, 0.1)',
    border: '2px solid #ffd700',
    borderRadius: '10px',
    marginBottom: '30px',
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '14px',
    color: '#ffd700',
  },
  botones: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
  },
  botonPrimario: {
    padding: '15px 30px',
    background: 'linear-gradient(135deg, #9147ff, #00e5ff)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 20px rgba(145, 71, 255, 0.5)',
  },
  botonSecundario: {
    padding: '15px 30px',
    background: 'transparent',
    border: '2px solid #9147ff',
    borderRadius: '10px',
    color: '#ffffff',
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default Resultado;