import axios from 'axios';

const API_URL = 'https://674c84c054e1fca9290cd05f.mockapi.io/api/examen/empleado';

export const obtenerEmpleados = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    return [];
  }
};

export const agregarEmpleado = async (empleado) => {
  try {
    await axios.post(API_URL, empleado);
    return true;
  } catch (error) {
    console.error('Error al agregar empleado:', error);
    return false;
  }
};
