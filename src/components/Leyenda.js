import React from 'react';
import { 
  AiFillCheckCircle,   // CORRECTO - existe
  AiFillCloseCircle,   // ERROR - existe
  AiFillCompass        // CURSOR - usando compass en lugar de circle
} from 'react-icons/ai';

function Leyenda() {
  const items = [
    { icono: AiFillCheckCircle, color: '#00ff9d', texto: 'CORRECTO' },
    { icono: AiFillCloseCircle, color: '#ff3b3b', texto: 'ERROR' },
    { icono: AiFillCompass, color: '#00e5ff', texto: 'CURSOR', parpadeo: true },
  ];

  return (
    <div style={styles.container}>
      {items.map((item, index) => {
        const Icono = item.icono;
        return (
          <div key={index} style={styles.item}>
            <Icono 
              style={{ 
                ...styles.icono, 
                color: item.color,
                animation: item.parpadeo ? 'parpadeo 1s step-end infinite' : 'none',
              }} 
            />
            <span style={styles.texto}>{item.texto}</span>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    marginTop: '20px',
    padding: '15px',
    background: 'rgba(18, 22, 28, 0.95)',
    border: '1px solid #9147ff',
    borderRadius: '10px',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  icono: {
    fontSize: '20px',
  },
  texto: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '14px',
    color: '#ffffff',
  },
};

export default Leyenda;