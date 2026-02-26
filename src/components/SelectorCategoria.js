import React from 'react';
import { 
  AiFillAppstore,     // TODOS - existe
  AiFillCode,         // CÓDIGO - existe
  AiFillFileText,     // GENERAL - existe
  AiFillApi,          // REACT - existe
  AiFillDatabase,     // SQL - existe
  AiFillMessage,      // CITAS - existe
  AiFillExperiment,   // CIENCIA - existe
  AiOutlineAudio,     // CANCIONES - solo existe como Outline
  AiFillBook,         // NATURALEZA - existe
  AiFillBulb          // TECNOLOGÍA - existe
} from 'react-icons/ai';

function SelectorCategoria({ categoria, setCategoria }) {
  const categorias = [
    { id: 'todos', label: 'TODOS', icono: AiFillAppstore, color: '#9147ff' },
    { id: 'codigo', label: 'CÓDIGO', icono: AiFillCode, color: '#00e5ff' },
    { id: 'general', label: 'GENERAL', icono: AiFillFileText, color: '#ffffff' },
    { id: 'react', label: 'REACT', icono: AiFillApi, color: '#61dafb' },
    { id: 'sql', label: 'SQL', icono: AiFillDatabase, color: '#f29111' },
    { id: 'citas', label: 'CITAS', icono: AiFillMessage, color: '#00ff9d' },
    { id: 'ciencia', label: 'CIENCIA', icono: AiFillExperiment, color: '#ff3b3b' },
    { id: 'canciones', label: 'CANCIONES', icono: AiOutlineAudio, color: '#ff69b4' },
    { id: 'naturaleza', label: 'NATURALEZA', icono: AiFillBook, color: '#7cfc00' },
    { id: 'tecnologia', label: 'TECH', icono: AiFillBulb, color: '#00ffff' },
  ];

  return (
    <div style={styles.container}>
      <h3 style={styles.titulo}>SELECCIONA CATEGORÍA</h3>
      <div style={styles.cuadricula}>
        {categorias.map(({ id, label, icono: Icono, color }) => (
          <button
            key={id}
            onClick={() => setCategoria(id)}
            style={{
              ...styles.boton,
              ...(categoria === id ? styles.botonActivo : {}),
              borderColor: color,
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
    border: '2px solid #00e5ff',
    borderRadius: '15px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 0 20px rgba(0, 229, 255, 0.2)',
  },
  titulo: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '16px',
    color: '#ffffff',
    marginBottom: '20px',
    textAlign: 'center',
    letterSpacing: '2px',
  },
  cuadricula: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '10px',
  },
  boton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px',
    background: 'transparent',
    border: '2px solid',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: '#ffffff',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '12px',
  },
  botonActivo: {
    background: 'rgba(0, 229, 255, 0.1)',
    transform: 'scale(1.02)',
    boxShadow: '0 0 15px currentColor',
  },
  icono: {
    fontSize: '14px',
  },
  botonTexto: {
    fontFamily: "'Orbitron', sans-serif",
  },
};

export default SelectorCategoria;