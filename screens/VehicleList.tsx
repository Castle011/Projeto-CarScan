
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Vehicle } from '../types';

const VehicleCard: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => (
    <div className="bg-slate-800 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
        <img className="w-full h-48 object-cover" src={vehicle.photo || 'https://picsum.photos/400/300'} alt={`${vehicle.brand} ${vehicle.model}`} />
        <div className="p-4">
            <h3 className="text-xl font-bold text-white">{vehicle.brand} {vehicle.model}</h3>
            <p className="text-gray-300 font-mono bg-slate-700 inline-block px-2 py-1 rounded my-2 text-sm">{vehicle.plate}</p>
            <p className="text-sm text-gray-400">{vehicle.type} - {vehicle.year}</p>
            <div className="mt-4 flex space-x-2">
                 <Link to={`/checklist/new/${vehicle.id}`} className="flex-1 text-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors text-sm font-semibold">
                    Iniciar Checklist
                </Link>
                <Link to={`/vehicle/${vehicle.id}`} className="flex-1 text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm font-semibold">
                    Ver Detalhes
                </Link>
            </div>
        </div>
    </div>
);


const VehicleList: React.FC = () => {
    const { vehicles } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredVehicles = useMemo(() => {
        if (!searchTerm) return vehicles;
        return vehicles.filter(v => 
            v.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.brand.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [vehicles, searchTerm]);
    
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold text-white">Meus Veículos</h1>
                 <input 
                    type="text"
                    placeholder="Pesquisar por placa, modelo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-72 px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <Link to="/vehicle/new" className="w-full md:w-auto text-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-300">
                    Adicionar Veículo
                </Link>
            </div>

            {filteredVehicles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredVehicles.map(vehicle => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-slate-800 rounded-lg shadow">
                    <h2 className="text-xl font-medium text-gray-200">Nenhum veículo encontrado.</h2>
                    <p className="text-gray-400 mt-2">Comece adicionando um novo veículo à sua frota.</p>
                </div>
            )}
        </div>
    );
};

export default VehicleList;