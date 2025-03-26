import React, { useState } from 'react';
import { agregarEmpleado } from '../services/empleadoService';
import Swal from 'sweetalert2';

const ModalAgregar = ({ actualizarLista }) => {
  const [show, setShow] = useState(false);
  const [empleado, setEmpleado] = useState({
    nombre: '',
    dni: '',
    direccion: '',
    email: '',
  });

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  // Guardar empleado
  const handleGuardar = async () => {
    if (!empleado.nombre || !empleado.dni || !empleado.direccion || !empleado.email) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    const resultado = await agregarEmpleado(empleado);
    if (resultado) {
      Swal.fire('Éxito', 'Empleado agregado correctamente', 'success');
      actualizarLista();
      setShow(false); // Cerrar modal
      setEmpleado({ nombre: '', dni: '', direccion: '', email: '' }); // Limpiar formulario
    } else {
      Swal.fire('Error', 'No se pudo agregar el empleado', 'error');
    }
  };

  return (
    <div>
      {/* Botón para abrir el modal */}
      <button className="btn btn-success mb-3" onClick={() => setShow(true)}>
        Agregar Empleado
      </button>

      {/* Modal de Bootstrap */}
      {show && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar Empleado</h5>
                <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
              </div>
              <div className="modal-body">
                <input type="text" className="form-control mb-2" name="nombre" placeholder="Nombre" onChange={handleChange} value={empleado.nombre} />
                <input type="text" className="form-control mb-2" name="dni" placeholder="DNI" onChange={handleChange} value={empleado.dni} />
                <input type="text" className="form-control mb-2" name="direccion" placeholder="Dirección" onChange={handleChange} value={empleado.direccion} />
                <input type="email" className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange} value={empleado.email} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShow(false)}>Cerrar</button>
                <button className="btn btn-primary" onClick={handleGuardar}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalAgregar;
