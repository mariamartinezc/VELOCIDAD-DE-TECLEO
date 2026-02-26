import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import confetti from 'canvas-confetti';

// Importar iconos de Ant Design
import { 
  AiFillThunderbolt, 
  AiFillCode, 
  AiFillFire,
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillClockCircle,
  AiFillTrophy,
  AiFillStar,
  AiFillExperiment,
  AiFillDatabase,
  AiFillApi,
  AiFillRobot,
  AiFillCrown,
  AiFillGold,
  AiFillBulb,
  AiFillBook,
  AiFillMessage,
  AiOutlineAudio
} from 'react-icons/ai';

// Importar subcomponentes
import SelectorDificultad from './SelectorDificultad';
import SelectorCategoria from './SelectorCategoria';
import BotonesAccion from './BotonesAccion';
import CuadriculaStats from './CuadriculaStats';
import MostrarPasaje from './MostrarPasaje';
import Leyenda from './Leyenda';
import Resultado from './Resultado';

function PruebaVelocidad() {
    // ========== 1. ESTADOS (useState) ==========
    const [pasajes, setPasajes] = useState(null);
    const [pasajeActual, setPasajeActual] = useState('');
    const [entradaUsuario, setEntradaUsuario] = useState('');
    const [juegoActivo, setJuegoActivo] = useState(false);
    const [juegoTerminado, setJuegoTerminado] = useState(false);
    const [dificultad, setDificultad] = useState('facil');
    const [categoria, setCategoria] = useState('todos');
    const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
    const [mostrarResultados, setMostrarResultados] = useState(false);
    const [estadisticas, setEstadisticas] = useState({
        ppm: 0,
        precision: 100,
        correctas: 0,
        incorrectas: 0,
        total: 0,
        tiempo: 0
    });
    const [mejorPuntaje, setMejorPuntaje] = useState(() => {
        const guardado = localStorage.getItem('mejorPuntaje');
        return guardado ? JSON.parse(guardado) : { ppm: 0, fecha: null };
    });

    // ========== 2. REFERENCIAS (useRef) ==========
    const inputRef = useRef(null);
    const tiempoInicioRef = useRef(null);
    const temporizadorRef = useRef(null);
    const containerRef = useRef(null);

    // ========== 3. FUNCIONES (PRIMERO LAS FUNCIONES) ==========
    
    const enfocarInput = () => {
        if (inputRef.current && !juegoTerminado) {
            const scrollPos = window.pageYOffset;
            inputRef.current.focus({ preventScroll: true });
            window.scrollTo(0, scrollPos);
        }
    };

    const calcularEstadisticas = () => {
        const tiempoMinutos = (Date.now() - tiempoInicioRef.current) / 60000;
        const palabras = entradaUsuario.length / 5;
        const ppm = Math.round(palabras / Math.max(tiempoMinutos, 0.01));
        
        let correctas = 0;
        let incorrectas = 0;
        
        for (let i = 0; i < entradaUsuario.length; i++) {
            if (i < pasajeActual.length) {
                if (entradaUsuario[i] === pasajeActual[i]) {
                    correctas++;
                } else {
                    incorrectas++;
                }
            }
        }
        
        const precision = entradaUsuario.length > 0 
            ? Math.round((correctas / entradaUsuario.length) * 100) 
            : 100;
        
        setEstadisticas({
            ppm,
            precision,
            correctas,
            incorrectas,
            total: entradaUsuario.length,
            tiempo: tiempoTranscurrido
        });
    };

    const reiniciarPrueba = () => {
        setJuegoActivo(false);
        setJuegoTerminado(false);
        setEntradaUsuario('');
        setTiempoTranscurrido(0);
        tiempoInicioRef.current = null;
        clearInterval(temporizadorRef.current);
        setEstadisticas({
            ppm: 0,
            precision: 100,
            correctas: 0,
            incorrectas: 0,
            total: 0,
            tiempo: 0
        });
        setMostrarResultados(false);
        setTimeout(enfocarInput, 100);
    };

    const iniciarPrueba = () => {
        setJuegoActivo(true);
        tiempoInicioRef.current = Date.now();
    };

    const terminarPrueba = () => {
        setJuegoActivo(false);
        setJuegoTerminado(true);
        clearInterval(temporizadorRef.current);
        
        if (estadisticas.ppm > mejorPuntaje.ppm) {
            const nuevoRecord = {
                ppm: estadisticas.ppm,
                fecha: new Date().toISOString()
            };
            setMejorPuntaje(nuevoRecord);
            localStorage.setItem('mejorPuntaje', JSON.stringify(nuevoRecord));
            
            if (mejorPuntaje.ppm > 0) {
                confetti({
                    particleCount: 150,
                    spread: 90,
                    origin: { y: 0.6 },
                    colors: ['#9147ff', '#00e5ff', '#ff3b3b', '#00ff9d']
                });
            }
        }
        
        setMostrarResultados(true);
    };

    const manejarInput = (e) => {
        const valor = e.target.value;
        const scrollPos = window.pageYOffset;
        
        if (!juegoActivo && !juegoTerminado && valor.length > 0) {
            iniciarPrueba();
        }
        
        setEntradaUsuario(valor);
        
        window.requestAnimationFrame(() => {
            window.scrollTo(0, scrollPos);
        });
    };

    const cargarNuevoPasaje = () => {
        if (!pasajes) return;
        
        const pasajesPorDificultad = pasajes.pasajes[dificultad] || [];
        
        let pasajesFiltrados = pasajesPorDificultad;
        if (categoria !== 'todos') {
            pasajesFiltrados = pasajesPorDificultad.filter(p => p.categoria === categoria);
        }
        
        if (pasajesFiltrados.length > 0) {
            const indice = Math.floor(Math.random() * pasajesFiltrados.length);
            setPasajeActual(pasajesFiltrados[indice].texto);
            reiniciarPrueba();
        }
    };

    const obtenerCaracterConColor = (caracter, indice) => {
        if (indice >= entradaUsuario.length) {
            return <span key={indice} style={{ color: '#aaaaaa' }}>{caracter}</span>;
        }
        
        if (entradaUsuario[indice] === caracter) {
            return <span key={indice} style={{ 
                color: '#00ff9d',
                textShadow: '0 0 10px rgba(0, 255, 157, 0.5)'
            }}>{caracter}</span>;
        } else {
            return <span key={indice} style={{ 
                color: '#ff3b3b',
                textShadow: '0 0 10px rgba(255, 59, 59, 0.5)',
                textDecoration: 'underline wavy'
            }}>{caracter}</span>;
        }
    };

    // ========== 4. useEffect (DESPUÉS DE LAS FUNCIONES) ==========
    
    // SOLUCION PARA EL SCROLL
    useEffect(() => {
        const prevenirScroll = (e) => {
            if (document.activeElement === inputRef.current) {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
                
                window.requestAnimationFrame(() => {
                    window.scrollTo(scrollLeft, scrollTop);
                });
            }
        };

        window.addEventListener('scroll', prevenirScroll, { passive: false });
        
        return () => {
            window.removeEventListener('scroll', prevenirScroll);
        };
    }, []);

    // Efecto para enfocar al inicio
    useEffect(() => {
        enfocarInput();
    }, [enfocarInput]);

    // Efecto para mantener scroll al escribir
    useEffect(() => {
        if (juegoActivo) {
            const scrollPos = window.pageYOffset;
            window.scrollTo(0, scrollPos);
        }
    }, [entradaUsuario, juegoActivo]);

    // Efecto para cargar pasajes
    useEffect(() => {
        console.log("Cargando pasajes...");
        Axios.get('/data/pasajes.json')
            .then((response) => {
                console.log("Pasajes recibidos:", response.data);
                setPasajes(response.data);
                const pasajesFacil = response.data.pasajes.facil;
                if (pasajesFacil && pasajesFacil.length > 0) {
                    const indice = Math.floor(Math.random() * pasajesFacil.length);
                    setPasajeActual(pasajesFacil[indice].texto);
                }
            })
            .catch((error) => console.log("Error cargando pasajes:", error));
    }, []);

    // Efecto del temporizador
    useEffect(() => {
        if (juegoActivo && !juegoTerminado) {
            temporizadorRef.current = setInterval(() => {
                setTiempoTranscurrido(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(temporizadorRef.current);
    }, [juegoActivo, juegoTerminado]);

    // Efecto para calcular estadísticas
    useEffect(() => {
        if (tiempoInicioRef.current && juegoActivo) {
            calcularEstadisticas();
        }
    }, [entradaUsuario, juegoActivo, calcularEstadisticas]);

    // Efecto para verificar si terminó
    useEffect(() => {
        if (juegoActivo && entradaUsuario.length >= pasajeActual.length) {
            terminarPrueba();
        }
    }, [entradaUsuario, juegoActivo, pasajeActual, terminarPrueba]);

    // ========== 5. RENDERIZADO CONDICIONAL ==========
    
    if (!pasajes) {
        return (
            <div style={styles.cargandoContainer}>
                <div style={styles.cargandoContent}>
                    <AiFillCode size={60} color="#9147ff" style={styles.cargandoIcono} />
                    <h3 style={styles.cargandoTexto}>CARGANDO JUEGO...</h3>
                    <div style={styles.cargandoBar}>
                        <div style={styles.cargandoBarFill}></div>
                    </div>
                </div>
            </div>
        );
    }

    // ========== 6. JSX (RETURN) ==========
    
    return (
        <div ref={containerRef} style={styles.container}>
            <input
                ref={inputRef}
                type="text"
                value={entradaUsuario}
                onChange={manejarInput}
                onFocus={(e) => {
                    const scrollPos = window.pageYOffset;
                    window.requestAnimationFrame(() => {
                        window.scrollTo(0, scrollPos);
                    });
                }}
                style={styles.hiddenInput}
                autoFocus
                disabled={juegoTerminado}
            />

            <div style={styles.header}>
                <div style={styles.headerContent}>
                    <AiFillThunderbolt size={50} color="#9147ff" style={styles.headerIcon} />
                    <div>
                        <h1 style={styles.titulo}> VELOCIDAD DE TECLEO </h1>
                        <p style={styles.subtitulo}>Presiona cualquier tecla para comenzar • Edición para jugadores</p>
                    </div>
                    <AiFillCode size={50} color="#00e5ff" style={styles.headerIcon} />
                </div>
                
                <div style={styles.banner}>
                    <AiFillFire style={styles.bannerIcon} />
                    <span style={styles.bannerText}>¡PON A PRUEBA TUS REFLEJOS!</span>
                    <AiFillFire style={styles.bannerIcon} />
                </div>
            </div>

            <SelectorDificultad 
                dificultad={dificultad} 
                setDificultad={setDificultad} 
            />
            
            <SelectorCategoria 
                categoria={categoria} 
                setCategoria={setCategoria} 
            />
            
            <BotonesAccion 
                onNuevoPasaje={cargarNuevoPasaje}
                onReiniciar={reiniciarPrueba}
                juegoActivo={juegoActivo}
            />

            <CuadriculaStats 
                ppm={estadisticas.ppm}
                precision={estadisticas.precision}
                tiempo={tiempoTranscurrido}
                mejor={mejorPuntaje.ppm}
            />

            <MostrarPasaje 
                texto={pasajeActual}
                entradaUsuario={entradaUsuario}
                obtenerCaracterConColor={obtenerCaracterConColor}
                onClick={enfocarInput}
            />

            <Leyenda />

            {!juegoActivo && !juegoTerminado && (
                <div style={styles.startMessage}>
                    <AiFillCode style={styles.icono} />
                    --PRESIONE CUALQUIER TECLA PARA COMENZAR--  
                    <AiFillCode style={styles.icono} />
                </div>
            )}

            <Resultado 
                mostrar={mostrarResultados}
                estadisticas={estadisticas}
                mejorPuntaje={mejorPuntaje}
                onCerrar={() => setMostrarResultados(false)}
                onReintentar={() => {
                    setMostrarResultados(false);
                    reiniciarPrueba();
                    cargarNuevoPasaje();
                }}
            />

            <footer style={styles.footer}>
                <p style={styles.footerText}> --Desarrollado por Maria Martinez & Fernando Martinez · 2026--</p>
            </footer>
        </div>
    );
}

// ========== 7. ESTILOS (fuera del componente) ==========

const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #08090c 0%, #0a0c0f 100%)',
        color: '#ffffff',
        padding: '20px',
        fontFamily: "'Poppins', sans-serif",
        position: 'relative',
        overflowX: 'hidden',
    },
    hiddenInput: {
        opacity: 0,
        position: 'fixed',
        top: '-100px',
        left: 0,
        height: 0,
        width: 0,
        pointerEvents: 'none',
    },
    header: {
        textAlign: 'center',
        marginBottom: '40px',
        padding: '30px',
        background: 'rgba(18, 22, 28, 0.95)',
        border: '2px solid #9147ff',
        borderRadius: '20px',
        boxShadow: '0 0 30px rgba(145, 71, 255, 0.3)',
        position: 'relative',
        overflow: 'hidden',
    },
    headerContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '30px',
        marginBottom: '20px',
    },
    headerIcon: {
        filter: 'drop-shadow(0 0 20px currentColor)',
        animation: 'float 3s ease-in-out infinite',
    },
    titulo: {
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 'clamp(24px, 5vw, 42px)',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #9147ff, #00e5ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 0 30px rgba(145, 71, 255, 0.5)',
        marginBottom: '10px',
    },
    subtitulo: {
        fontFamily: "'Orbitron', sans-serif",
        fontSize: '14px',
        color: '#aaaaaa',
        letterSpacing: '2px',
    },
    banner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '15px',
        padding: '15px',
        background: 'linear-gradient(135deg, #9147ff20, #00e5ff20)',
        borderRadius: '10px',
        border: '1px solid #00e5ff',
        boxShadow: '0 0 20px rgba(0, 229, 255, 0.2)',
    },
    bannerIcon: {
        color: '#00e5ff',
        fontSize: '20px',
        animation: 'neonPulse 2s ease-in-out infinite',
    },
    bannerText: {
        fontFamily: "'Orbitron', sans-serif",
        fontSize: '16px',
        fontWeight: '600',
        color: '#ffffff',
    },
    startMessage: {
        textAlign: 'center',
        marginTop: '40px',
        fontFamily: "'Orbitron', sans-serif",
        fontSize: '18px',
        fontWeight: '700',
        color: '#00e5ff',
        textShadow: '0 0 20px #00e5ff',
        animation: 'neonPulse 1.5s ease-in-out infinite',
        letterSpacing: '4px',
    },
    footer: {
        textAlign: 'center',
        marginTop: '60px',
        padding: '20px',
        borderTop: '2px solid #9147ff',
    },
    footerText: {
        fontFamily: "'Orbitron', sans-serif",
        fontSize: '12px',
        color: '#9147ff',
        letterSpacing: '2px',
    },
    cargandoContainer: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #08090c 0%, #0a0c0f 100%)',
    },
    cargandoContent: {
        textAlign: 'center',
        padding: '40px',
    },
    cargandoIcono: {
        animation: 'rotate 2s linear infinite',
        marginBottom: '20px',
    },
    cargandoTexto: {
        fontFamily: "'Orbitron', sans-serif",
        fontSize: '24px',
        color: '#9147ff',
        marginBottom: '20px',
    },
    cargandoBar: {
        width: '300px',
        height: '4px',
        background: '#1a1e24',
        borderRadius: '2px',
        overflow: 'hidden',
    },
    cargandoBarFill: {
        width: '60%',
        height: '100%',
        background: 'linear-gradient(90deg, #9147ff, #00e5ff)',
        animation: 'neonPulse 1s ease-in-out infinite',
    },
};

export default PruebaVelocidad;