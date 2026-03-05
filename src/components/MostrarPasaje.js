import React from 'react';
import { AiFillCode } from 'react-icons/ai';

function MostrarPasaje({ texto, entradaUsuario, obtenerCaracterConColor, onClick }) {
  
  // Función para renderizar cada carácter con su color
  const renderizarCaracteres = () => {
    return texto.split('').map((caracter, indice) => {
      
      // Caso 1: Carácter ya escrito (tiene color: verde o rojo)
      if (indice < entradaUsuario.length) {
        return obtenerCaracterConColor(caracter, indice);
      }
      
      // Caso 2: Siguiente carácter a escribir (CURSOR SOBRE LA LETRA O ESPACIO)
      else if (indice === entradaUsuario.length) {
        // Si es un espacio, mostrar un rectángulo especial
        if (caracter === ' ') {
          return (
            <span 
              key={indice} 
              style={{
                backgroundColor: '#00e5ff',
                display: 'inline-block',
                width: '0.6em',        // Ancho aproximado de un espacio
                height: '1.2em',        // Altura similar a las letras
                animation: 'parpadeo 1s step-end infinite',
                margin: '0 1px',
                verticalAlign: 'middle'
              }}
              title="Espacio"
            >
              {/* Vacío - solo el rectángulo */}
            </span>
          );
        } else {
          // Si es una letra normal
          return (
            <span 
              key={indice} 
              style={{
                backgroundColor: '#00e5ff',
                color: '#000000',
                padding: '0 2px',
                animation: 'parpadeo 1s step-end infinite',
                display: 'inline-block'
              }}
            >
              {caracter}
            </span>
          );
        }
      }
      
      // Caso 3: Caracteres futuros (gris)
      else {
        return <span key={indice} style={{ color: '#aaaaaa' }}>{caracter}</span>;
      }
    });
  };

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
          {renderizarCaracteres()}
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
    margin: 0,
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