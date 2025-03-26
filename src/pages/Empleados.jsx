import React, { useEffect, useState } from 'react';
import { obtenerEmpleados } from '../services/empleadoService';
import ModalAgregar from '../components/ModalAgregar';

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);

  // Cargar empleados desde la API
  const cargarEmpleados = async () => {
    const data = await obtenerEmpleados();
    setEmpleados(data);
    setEmpleadosFiltrados(data); // Mostrar todos los empleados al inicio
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  // Función para buscar empleados
  const handleBuscar = () => {
    const resultado = empleados.filter((empleado) =>
      empleado.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    setEmpleadosFiltrados(resultado);
  };

  // Función para limpiar la búsqueda y mostrar todos los empleados
  const handleLimpiar = () => {
    setBusqueda('');
    setEmpleadosFiltrados(empleados);
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Empleados</h2>

      {/* Campo de búsqueda y botones */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleBuscar}>
          Buscar
        </button>
        <button className="btn btn-secondary" onClick={handleLimpiar}>
          Limpiar
        </button>
      </div>

      {/* Botón para agregar empleados */}
      <ModalAgregar actualizarLista={cargarEmpleados} />

      {/* Tabla de empleados */}
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Dirección</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {empleadosFiltrados.length > 0 ? (
            empleadosFiltrados.map((empleado) => (
              <tr key={empleado.id}>
                <td>{empleado.nombre}</td>
                <td>{empleado.dni}</td>
                <td>{empleado.direccion}</td>
                <td>{empleado.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No se encontraron empleados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Empleados;
