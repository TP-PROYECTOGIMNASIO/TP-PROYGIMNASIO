import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";

const HUVISUALLIZARINICIOSEGN = () => {
  const [clients, setClients] = useState([]);
  const [loadingPlan, setLoadingPlan] = useState(false); // Para el botón Empezar Plan
  const [loadingRegister, setLoadingRegister] = useState(false); // Para el botón Registrar Ejercicios
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/empleados/hu-tp-35');
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
        setClients([]);
      }
    };

    fetchClients();
  }, []);

  const handlePlanClick = async () => {
    if (clients.length === 0) {
      alert('No hay clientes disponibles.');
    } else {
      setLoadingPlan(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula un tiempo de carga
      navigate('/listar-clientes');
    }
  };

  const handleRegisterClick = async () => {
    setLoadingRegister(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula un tiempo de carga
    navigate('/ListaEjercicios'); // Cambia la ruta según sea necesario
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-end p-10 relative">
      <img
        src="/wasa.jpeg"
        alt="Imagen de fondo"
        className="absolute left-0 bottom-0 w-full h-full object-cover z-0"
      />

      <div className="w-full max-w-4xl relative z-10">
        <h1 className="text-4xl font-bold mb-12 text-red-600 text-center">
          ¡Bienvenido Fisioterapeuta!
        </h1>

        <div className="grid grid-cols-2 gap-12">
          <div className="text-left"></div>
          <div className="text-left">
            <div className="flex flex-col gap-4 p-4 rounded-b-lg">
              <button
                onClick={handlePlanClick}
                className={`bg-gray-100 text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center ${loadingPlan ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loadingPlan}
              >
                <div className="flex flex-col items-start">
                  <h3 className="text-3xl text-red-600">EMPEZAR PLAN</h3>
                  <h1 className="text-3xl text-red-600">TRATAMIENTO</h1>
                </div>
                {loadingPlan ? (
                  <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 ml-4"></div>
                ) : (
                  <FaChevronRight className="text-red-600 text-3xl ml-4" />
                )}
              </button>

              <button
                onClick={handleRegisterClick}
                className={`bg-gray-100 text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center ${loadingRegister ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loadingRegister}
              >
                <div className="flex flex-col items-start">
                  <h3 className="text-3xl text-red-600">REGISTRAR</h3>
                  <h1 className="text-3xl text-red-600">EJERCICIOS</h1>
                </div>
                {loadingRegister ? (
                  <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 ml-4"></div>
                ) : (
                  <FaChevronRight className="text-red-600 text-3xl ml-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HUVISUALLIZARINICIOSEGN;




