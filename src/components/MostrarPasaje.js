import React from 'react';
import { AiFillCode } from 'react-icons/ai';

function MostrarPasaje({ texto, entradaUsuario, obtenerCaracterConColor, onClick }) {
  return (
    <div 
      style={styles.container}
      onClick={onClick}
    >
      <div style={styles.header}>
        <AiFillCode style={styles.icono} />
        <span style={styles.headerText}>ESCRIBE AQUÍ</span>
        <AiFillCode style={styles.icono} />
      </div>
      <div style={styles.pasajeContainer}>
        <p style={styles.pasaje}>
          {texto.split('').map((caracter, indice) => 
            obtenerCaracterConColor(caracter, indice)
          )}
          {entradaUsuario.length < texto.length && (
            <span style={styles.cursor}>_</span>
          )}
        </p>
      </div>
      
      {entradaUsuario.length > 0 && (
        <div style={styles.escrituraIndicator}>
          Escribiste: {entradaUsuario.length} / {texto.length} caracteres
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    background: 'rgba(18, 22, 28, 0.95)',
    border: '2px solid #00e5ff',
    borderRadius: '15px',
    padding: '20px',
    marginBottom: '20px',
    cursor: 'text',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 20px rgba(0, 229, 255, 0.2)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '20px',
    padding: '10px',
    borderBottom: '1px solid #00e5ff',
  },
  icono: {
    color: '#00e5ff',
    fontSize: '20px',
    animation: 'neonPulse 2s ease-in-out infinite',
  },
  headerText: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '14px',
    color: '#00e5ff',
    letterSpacing: '2px',
  },
  pasajeContainer: {
    minHeight: '150px',
    padding: '20px',
    background: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '10px',
  },
  pasaje: {
    fontFamily: "'Courier New', monospace",
    fontSize: '1.3rem',
    lineHeight: '1.8',
    color: '#ffffff',
    wordBreak: 'break-word',
  },
  cursor: {
    backgroundColor: '#00e5ff',
    color: '#000000',
    animation: 'parpadeo 1s step-end infinite',
    marginLeft: '2px',
    padding: '0 2px',
  },
  escrituraIndicator: {
    textAlign: 'right',
    marginTop: '10px',
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '12px',
    color: '#00e5ff',
  },
};

export default MostrarPasaje;