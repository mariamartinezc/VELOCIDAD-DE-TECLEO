# VELOCIDAD-DE-TECLEO
Aplicación interactiva para practicar velocidad de escritura. Incluye 4 niveles de dificultad, 10 categorías de pasajes (código, React, SQL, citas, ciencia, etc.), estadísticas en tiempo real

## Demo en vivo

La aplicación está desplegada en Vercel. Puedes probarla directamente desde aquí:

**[https://velocidad-de-tecleo-maria.vercel.app/](https://velocidad-de-tecleo-maria.vercel.app/)**

¡No necesitas instalar nada! Solo haz clic y empieza a escribir.

---

## Características

- **4 niveles de dificultad**: Fácil , Medio , Difícil , Experto 
- **10 categorías de pasajes**: TODOS, CÓDIGO, GENERAL, REACT, SQL, CITAS, CIENCIA, CANCIONES, NATURALEZA, TECH
- **Más de 70 pasajes** organizados por nivel
- **Estadísticas en tiempo real**: PPM (palabras por minuto), precisión (%), tiempo transcurrido
- **Feedback visual inmediato**: 
  - **Verde**: Caracteres correctos
  - **Rojo**: Errores (subrayados)
  - **Cursor parpadeante**: Siguiente carácter
- **Persistencia de datos**: Mejor puntaje guardado en tu navegador
- **Celebración interactiva**: Confetti al batir tu récord personal
- **Diseño responsive**: Funciona en móviles, tablets y desktop
- **Manejo de scroll**: Solución personalizada para evitar que la página se desplace al escribir

---
## Tecnologías Utilizadas

| Tecnología | Uso en el proyecto |
|------------|-------------------|
| **React 18** | Biblioteca principal para construir la interfaz |
| **React Hooks** | `useState`, `useEffect`, `useRef` para manejo de estado y efectos |
| **Axios** | Carga de pasajes desde archivo JSON |
| **React Icons (Ant Design)** | Iconografía profesional (AiFillCrown, AiFillCode, AiFillFire, etc.) |
| **Canvas Confetti** | Efectos de celebración al batir récords |
| **CSS3** | Estilos personalizados con animaciones (`neonPulse`, `float`, `parpadeo`) |
| **Git & GitHub** | Control de versiones |
| **Vercel** | Despliegue y hosting |

---
## Estructura del Proyecto
```
src/
├── components/
│   ├── PruebaVelocidad.js          # Componente principal (toda la lógica)
│   ├── SelectorDificultad.js       # Botones de dificultad
│   ├── SelectorCategoria.js        # Botones de categoría
│   ├── BotonesAccion.js            # Botones "NUEVO PASAJE" y "REINICIAR"
│   ├── CuadriculaStats.js          # Estadísticas (PPM, precisión, tiempo, mejor)
│   ├── MostrarPasaje.js            # Área de texto con colores
│   ├── Leyenda.js                  # Explicación de colores
│   └── Resultado.js                # Modal de resultados
├── App.js                           # Renderiza el componente principal
├── index.js                         # Punto de entrada
└── index.css                        # Estilos globales y animaciones
```
---

## Cómo Jugar

1. **Selecciona dificultad**: Fácil, Medio, Difícil o Experto
2. **Elige categoría**: Código, React, SQL, Citas, etc.
3. **Haz clic en el área de texto** o empieza a escribir directamente
4. **Escribe el pasaje** lo más rápido y preciso que puedas
5. **Las letras se colorean** automáticamente:
   - Verde = correctas
   - Rojo = errores
   - Cursor parpadeante = siguiente carácter
6. **Estadísticas en tiempo real**: PPM, precisión y tiempo
7. **Al terminar**, verás tus resultados
8. **¡Confetti!** si logras batir tu récord personal

---

## Equipo

| Integrante | Rol | Contribución |
|------------|-----|--------------|
| **Maria Martinez** | Desarrolladora | Código, lógica, diseño, despliegue |
| **Fernando Martinez** (15 años) | QA Tester | Pruebas, detección de errores, validación de funcionalidades |

> Fernando prueba cada funcionalidad de la aplicación para asegurarse de que todo funcione correctamente. Gracias a su trabajo, el proyecto tiene menos errores y mejor experiencia de usuario.

---
## Soluciones Técnicas Implementadas

### Scroll al escribir
**Problema**: El input oculto hacía que la página se desplazara al recibir foco.
**Solución**: Sistema que guarda y restaura la posición del scroll:
```javascript
const scrollPos = window.pageYOffset;
inputRef.current.focus({ preventScroll: true });
window.scrollTo(0, scrollPos);

---
