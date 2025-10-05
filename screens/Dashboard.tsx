
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Checklist } from '../types';

const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const ClipboardListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;

const ChecklistCard: React.FC<{ checklist: Checklist }> = ({ checklist }) => {
    const { getVehicleById } = useAppContext();
    const vehicle = getVehicleById(checklist.vehicleId);

    return (
        <Link to={`/checklist/${checklist.id}`} className="block bg-slate-800 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-white">{vehicle?.brand} {vehicle?.model} - {vehicle?.plate}</p>
                    <p className="text-sm text-gray-400">Realizado em: {new Date(checklist.startDate).toLocaleDateString()}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${checklist.status === 'Concluído' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {checklist.status}
                </span>
            </div>
        </Link>
    );
};


const Dashboard: React.FC = () => {
    const { vehicles, checklists } = useAppContext();
    const { user } = useAuth();
    const recentChecklists = checklists.slice(-3).reverse();
    const incompleteChecklists = checklists.filter(c => c.status === 'Rascunho').length;

    return (
        <div className="space-y-8">
            <div>
                 <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                 <p className="text-xl text-gray-300 mt-1">Bem-vindo, {user?.name}!</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800 p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-200">Veículos Cadastrados</h3>
                    <p className="text-3xl font-bold text-blue-500">{vehicles.length}</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-200">Checklists Realizados</h3>
                    <p className="text-3xl font-bold text-green-500">{checklists.length}</p>
                </div>
                 <div className="bg-slate-800 p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-200">Checklists Incompletos</h3>
                    <p className="text-3xl font-bold text-yellow-500">{incompleteChecklists}</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/vehicle/new" className="flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 w-full sm:w-auto">
                    <PlusIcon /> Adicionar Novo Veículo
                </Link>
                <Link to="/vehicles" className="flex items-center justify-center bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300 w-full sm:w-auto">
                   <ClipboardListIcon/> Iniciar Novo Checklist
                </Link>
            </div>
            
            {/* Recent Checklists & Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div>
                    <h2 className="text-2xl font-semibold text-white mb-4">Checklists Recentes</h2>
                    <div className="space-y-4">
                        {recentChecklists.length > 0 ? (
                            recentChecklists.map(checklist => <ChecklistCard key={checklist.id} checklist={checklist} />)
                        ) : (
                            <p className="text-gray-400 bg-slate-800 p-4 rounded-lg shadow">Nenhum checklist realizado ainda.</p>
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-white mb-4">Notificações</h2>
                    <div className="bg-slate-800 p-4 rounded-lg shadow">
                       <p className="text-gray-400">Nenhuma notificação nova no momento.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
