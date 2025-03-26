import React, { useState } from 'react';
import Entrada from './Entrada';
import Swal from 'sweetalert2';
import { guardarEmpleado } from '../services/empleadoService';

const ModalAgregar = ({ actualizarLista }) => {
  const [form, setForm] = useState({
    nombre: '',
    dni: '',
    direccion: '',
    email: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.dni || !form.direccion || !form.email) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }
    try {
      await guardarEmpleado(form);
      Swal.fire('Éxito', 'Empleado agregado correctamente', 'success');
      setForm({ nombre: '', dni: '', direccion: '', email: '' });
      actualizarLista();
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar el empleado', 'error');
    }
  };

  return (
    <>
      <button
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modalAgregar"
      >
        Agregar Empleado
      </button>

      <div className="modal fade" id="modalAgregar" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Agregar Empleado</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <Entrada label="Nombre" type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ingrese nombre" />
                <Entrada label="DNI" type="text" name="dni" value={form.dni} onChange={handleChange} placeholder="Ingrese DNI" />
                <Entrada label="Dirección" type="text" name="direccion" value={form.direccion} onChange={handleChange} placeholder="Ingrese dirección" />
                <Entrada label="Email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Ingrese email" />
                <button type="submit" className="btn btn-success">Guardar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAgregar;
