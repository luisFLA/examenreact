import axios from 'axios';

const API_URL = 'https://674c84c054e1fca9290cd05f.mockapi.io/api/examen/empleado';

export const obtenerEmpleados = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo empleados:', error);
    return [];
  }
};

export const guardarEmpleado = async (empleado) => {
  try {
    const response = await axios.post(API_URL, empleado);
    return response.data;
  } catch (error) {
    console.error('Error guardando empleado:', error);
    throw error;
  }
};
