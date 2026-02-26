import React from 'react';
import { 
  AiOutlineReload,  // NUEVO PASAJE - solo existe como Outline
  AiOutlineRest     // REINICIAR - solo existe como Outline
} from 'react-icons/ai';

function BotonesAccion({ onNuevoPasaje, onReiniciar, juegoActivo }) {
  return (
    <div style={styles.container}>
      <button 
        onClick={onNuevoPasaje}
        disabled={juegoActivo}
        style={{
          ...styles.boton,
          ...styles.botonPrimario,
          opacity: juegoActivo ? 0.5 : 1,
          cursor: juegoActivo ? 'not-allowed' : 'pointer',
        }}
      >
        <AiOutlineReload style={styles.icono} />
        <span style={styles.texto}>NUEVO PASAJE</span>
      </button>
      
      <button 
        onClick={onReiniciar}
        style={{
          ...styles.boton,
          ...styles.botonSecundario,
        }}
      >
        <AiOutlineRest style={styles.icono} />
        <span style={styles.texto}>REINICIAR</span>
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  boton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px 30px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '16px',
    fontWeight: '600',
  },
  botonPrimario: {
    background: 'linear-gradient(135deg, #9147ff, #00e5ff)',
    color: '#ffffff',
    boxShadow: '0 0 20px rgba(145, 71, 255, 0.5)',
  },
  botonSecundario: {
    background: 'linear-gradient(135deg, #ff3b3b, #ffb347)',
    color: '#ffffff',
    boxShadow: '0 0 20px rgba(255, 59, 59, 0.5)',
  },
  icono: {
    fontSize: '18px',
  },
  texto: {
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: '1px',
  },
};

export default BotonesAccion;