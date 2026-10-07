import React, { useState } from 'react';
import './App.css';

function App() {
  
  const [estudiantes, setEstudiantes] = useState([]);
  const [opcion, setOpcion] = useState(0);
  const [nombre, setNombre] = useState('');
  const [matricula, setMatricula] = useState('');
  const [materia, setMateria] = useState('');
  const [calificacion, setCalificacion] = useState('');
  const [matriculaBuscar, setMatriculaBuscar] = useState('');
  const [nuevaCalificacion, setNuevaCalificacion] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleGuardar = (e) => {
    e.preventDefault();
    if (!nombre || !matricula || !materia || !calificacion) {
      alert("Por favor completa todos los campos");
      return;
    }
    const nuevoEstudiante = {
      nombre,
      matricula,
      materia,
      calificacion: parseFloat(calificacion)
    };
    
    setEstudiantes([...estudiantes, nuevoEstudiante]);
    setNombre('');
    setMatricula('');
    setMateria('');
    setCalificacion('');
    setMensaje("Estudiante registrado con éxito.");
    setOpcion(0); 
  };

  const handleEditar = (e) => {
    e.preventDefault();
    const indice = estudiantes.findIndex(e => e.matricula === matriculaBuscar);
    if (indice !== -1) {
      const listaActualizada = [...estudiantes];
      listaActualizada[indice].calificacion = parseFloat(nuevaCalificacion);
      setEstudiantes(listaActualizada);
      setMensaje(`Calificación actualizada para la matrícula: ${matriculaBuscar}`);
      setMatriculaBuscar('');
      setNuevaCalificacion('');
      setOpcion(0); 
    } else {
      alert("Matrícula no encontrada");
    }
  };

  const handleEliminar = (e) => {
    e.preventDefault();
    const existe = estudiantes.some(e => e.matricula === matriculaBuscar);
    if (existe) {
      const listaFiltrada = estudiantes.filter(e => e.matricula !== matriculaBuscar);
      setEstudiantes(listaFiltrada);
      setMensaje(`Estudiante con matrícula ${matriculaBuscar} eliminado.`);
      setMatriculaBuscar('');
      setOpcion(0); 
    } else {
      alert("Matrícula no encontrada");
    }
  };

  return (
    <div className="container">
      <h1>Control de Estudiantes</h1>

      {mensaje && <div className="alerta">{mensaje}</div>}

      {/* Opción 5: Salir */}
      {opcion === 5 ? (
        <div className="card">
          <h2>Fin del programa</h2>
          <button onClick={() => { setOpcion(0); setMensaje(''); }}>Volver a Iniciar</button>
        </div>
      ) : (
        <>
          {/* Mostrar menú */}
          <div className="menu">
            <h3>Seleccione una opción:</h3>
            <div className="botones-menu">
              <button onClick={() => { setOpcion(1); setMensaje(''); }}>1. Registrar</button>
              <button onClick={() => { setOpcion(2); setMensaje(''); }}>2. Ver</button>
              <button onClick={() => { setOpcion(3); setMensaje(''); }}>3. Editar</button>
              <button onClick={() => { setOpcion(4); setMensaje(''); }}>4. Eliminar</button>
              <button onClick={() => { setOpcion(5); setMensaje(''); }}>5. Salir</button>
            </div>
          </div>

          {/* VISTAS DE MI DIAGRAMA*/}

          {/* 1. Pedir nombre, matrícula, materia, calificación -> Guardar en lista */}
          {opcion === 1 && (
            <div className="card">
              <h2>Registrar Estudiante</h2>
              <form onSubmit={handleGuardar}>
                <input 
                  type="text" 
                  placeholder="Nombre" 
                  value={nombre} 
                  onChange={(e) => setNombre(e.target.value)} 
                  required 
                />
                <input 
                  type="text" 
                  placeholder="Matrícula" 
                  value={matricula} 
                  onChange={(e) => setMatricula(e.target.value)} 
                  required 
                />
                <input 
                  type="text" 
                  placeholder="Materia" 
                  value={materia} 
                  onChange={(e) => setMateria(e.target.value)} 
                  required 
                />
                <input 
                  type="number" 
                  step="0.1" 
                  placeholder="Calificación" 
                  value={calificacion} 
                  onChange={(e) => setCalificacion(e.target.value)} 
                  required 
                />
                <button type="submit">Guardar en lista</button>
              </form>
            </div>
          )}

          {/* 2. ¿Lista vacía? Sí -> No hay datos / No -> Mostrar todos */}
          {opcion === 2 && (
            <div className="card">
              <h2>Lista de Estudiantes</h2>
              {estudiantes.length === 0 ? (
                <p className="vacio">No hay datos</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Matrícula</th>
                      <th>Nombre</th>
                      <th>Materia</th>
                      <th>Calificación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estudiantes.map((est, index) => (
                      <tr key={index}>
                        <td>{est.matricula}</td>
                        <td>{est.nombre}</td>
                        <td>{est.materia}</td>
                        <td>{est.calificacion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* 3. Editar calificación: Mostrar todos -> Pedir matrícula -> Editar calificación */}
          {opcion === 3 && (
            <div className="card">
              <h2>Editar Calificación</h2>
              {estudiantes.length === 0 ? (
                <p className="vacio">No hay datos para editar</p>
              ) : (
                <>
                  <div className="resumen-lista">
                    <h4>Estudiantes registrados:</h4>
                    <ul>
                      {estudiantes.map((est, idx) => (
                        <li key={idx}>{est.matricula} - {est.nombre} ({est.materia}): Calificación actual = {est.calificacion}</li>
                      ))}
                    </ul>
                  </div>
                  <form onSubmit={handleEditar}>
                    <input 
                      type="text" 
                      placeholder="Pedir matrícula" 
                      value={matriculaBuscar} 
                      onChange={(e) => setMatriculaBuscar(e.target.value)} 
                      required 
                    />
                    <input 
                      type="number" 
                      step="0.1" 
                      placeholder="Nueva calificación" 
                      value={nuevaCalificacion} 
                      onChange={(e) => setNuevaCalificacion(e.target.value)} 
                      required 
                    />
                    <button type="submit">Editar calificación</button>
                  </form>
                </>
              )}
            </div>
          )}

          {/* 4. Buscar y eliminar */}
          {opcion === 4 && (
            <div className="card">
              <h2>Buscar y Eliminar Estudiante</h2>
              {estudiantes.length === 0 ? (
                <p className="vacio">No hay datos para eliminar</p>
              ) : (
                <form onSubmit={handleEliminar}>
                  <input 
                    type="text" 
                    placeholder="Pedir matrícula" 
                    value={matriculaBuscar} 
                    onChange={(e) => setMatriculaBuscar(e.target.value)} 
                    required 
                  />
                  <button type="submit" className="btn-danger">Buscar y eliminar</button>
                </form>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;