import React, { useEffect, useState } from 'react';
import { obtenerEmpleados } from '../services/empleadoService';
import ModalAgregar from '../components/ModalAgregar';

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);

  const cargarEmpleados = async () => {
    const data = await obtenerEmpleados();
    setEmpleados(data);
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Lista de Empleados</h2>
      <ModalAgregar actualizarLista={cargarEmpleados} />
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
          {empleados.map((empleado) => (
            <tr key={empleado.id}>
              <td>{empleado.nombre}</td>
              <td>{empleado.dni}</td>
              <td>{empleado.direccion}</td>
              <td>{empleado.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Empleados;
