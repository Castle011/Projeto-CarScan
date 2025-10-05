
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Checklist } from '../types';

const ChecklistRow: React.FC<{ checklist: Checklist }> = ({ checklist }) => {
    const { getVehicleById } = useAppContext();
    const vehicle = getVehicleById(checklist.vehicleId);

    return (
        <tr className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700">
            <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                {new Date(checklist.startDate).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 text-gray-300">
                {vehicle ? `${vehicle.brand} ${vehicle.model}` : 'Veículo não encontrado'}
            </td>
            <td className="px-6 py-4 text-gray-300">
                {vehicle?.plate}
            </td>
            <td className="px-6 py-4 text-gray-300">
                {checklist.driverName || 'N/A'}
            </td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${checklist.status === 'Concluído' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {checklist.status}
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <Link to={`/checklist/${checklist.id}`} className="font-medium text-blue-500 hover:underline">
                    Ver Detalhes
                </Link>
            </td>
        </tr>
    );
};

const ChecklistHistory: React.FC = () => {
    const { checklists, vehicles } = useAppContext();
    const [filterVehicle, setFilterVehicle] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterDriver, setFilterDriver] = useState('');

    const drivers = useMemo(() => {
        const driverNames = checklists.map(c => c.driverName).filter(Boolean);
        return [...new Set(driverNames)];
    }, [checklists]);

    const filteredChecklists = useMemo(() => {
        return checklists
            .filter(c => filterVehicle ? c.vehicleId === filterVehicle : true)
            .filter(c => filterStatus ? c.status === filterStatus : true)
            .filter(c => filterDriver ? c.driverName === filterDriver : true)
            .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    }, [checklists, filterVehicle, filterStatus, filterDriver]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Meus Checklists Criados</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-800 rounded-lg shadow">
                 <select value={filterVehicle} onChange={e => setFilterVehicle(e.target.value)} className="w-full p-2 bg-slate-700 border border-slate-600 text-white rounded-md focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Todos os Veículos</option>
                    {vehicles.map(v => <option key={v.id} value={v.id}>{v.brand} {v.model} ({v.plate})</option>)}
                </select>
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="w-full p-2 bg-slate-700 border border-slate-600 text-white rounded-md focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Todos os Status</option>
                    <option value="Concluído">Concluído</option>
                    <option value="Rascunho">Rascunho</option>
                </select>
                <select value={filterDriver} onChange={e => setFilterDriver(e.target.value)} className="w-full p-2 bg-slate-700 border border-slate-600 text-white rounded-md focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Todos os Condutores</option>
                    {drivers.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs text-gray-300 uppercase bg-slate-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">Data</th>
                            <th scope="col" className="px-6 py-3">Veículo</th>
                            <th scope="col" className="px-6 py-3">Placa</th>
                            <th scope="col" className="px-6 py-3">Condutor</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3"><span className="sr-only">Ações</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredChecklists.length > 0 ? (
                            filteredChecklists.map(c => <ChecklistRow key={c.id} checklist={c} />)
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-400 bg-slate-800">
                                    Nenhum checklist encontrado com os filtros selecionados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChecklistHistory;