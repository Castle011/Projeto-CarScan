import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Checklist } from '../types';

const DetailItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="py-2">
    <p className="text-sm font-medium text-gray-400">{label}</p>
    <p className="text-md text-white">{value}</p>
  </div>
);

const ChecklistHistoryItem: React.FC<{ checklist: Checklist }> = ({ checklist }) => (
  <Link to={`/checklist/${checklist.id}`} className="block p-3 rounded-lg hover:bg-slate-700 transition-colors">
    <div className="flex justify-between items-center">
      <div>
        <p className="font-semibold text-white">Checklist de {new Date(checklist.startDate).toLocaleDateString()}</p>
        <p className="text-sm text-gray-400">Condutor: {checklist.driverName}</p>
      </div>
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${checklist.status === 'Concluído' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
        {checklist.status}
      </span>
    </div>
  </Link>
);


const VehicleDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getVehicleById, deleteVehicle, getChecklistsByVehicleId } = useAppContext();

    if (!id) {
        navigate('/vehicles');
        return null;
    }
    
    const vehicle = getVehicleById(id);
    const vehicleChecklists = getChecklistsByVehicleId(id).reverse();

    if (!vehicle) {
        return <div className="text-center text-red-500">Veículo não encontrado.</div>;
    }
    
    const handleDelete = () => {
        if (window.confirm(`Tem certeza que deseja excluir permanentemente o veículo ${vehicle.brand} ${vehicle.model} (${vehicle.plate})? Esta ação também removerá todos os checklists associados.`)) {
            deleteVehicle(id);
            navigate('/vehicles');
        }
    };

    return (
        <div className="bg-slate-800 rounded-lg shadow-xl p-6 md:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                     <h1 className="text-3xl font-bold text-white">{vehicle.brand} {vehicle.model}</h1>
                     <p className="text-gray-300 font-mono bg-slate-700 inline-block px-2 py-1 rounded my-2 text-md">{vehicle.plate}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Link to={`/checklist/new/${vehicle.id}`} className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                        Iniciar Checklist
                    </Link>
                     <Link to={`/vehicle/edit/${vehicle.id}`} className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        Editar
                    </Link>
                    <button onClick={handleDelete} className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                        Excluir
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <img src={vehicle.photo || 'https://picsum.photos/400/300'} alt="Foto do Veículo" className="w-full h-auto rounded-lg shadow-md object-cover" />
                </div>
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-semibold text-white border-b border-slate-700 pb-2 mb-4">Detalhes do Veículo</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
                        <DetailItem label="Ano" value={vehicle.year} />
                        <DetailItem label="Tipo" value={vehicle.type} />
                        <DetailItem label="Cor" value={vehicle.color} />
                        <DetailItem label="Chassi" value={vehicle.chassis} />
                        <DetailItem label="RENAVAM" value={vehicle.renavam} />
                        <DetailItem label="Hodômetro" value={`${vehicle.odometer.toLocaleString('pt-BR')} km`} />
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-white border-b border-slate-700 pb-2 mb-4">Histórico de Checklists</h2>
                <div className="space-y-2">
                    {vehicleChecklists.length > 0 ? (
                        vehicleChecklists.map(c => <ChecklistHistoryItem key={c.id} checklist={c} />)
                    ) : (
                        <p className="text-gray-400 italic">Nenhum checklist realizado para este veículo.</p>
                    )}
                </div>
            </div>
             <div>
                <h2 className="text-2xl font-semibold text-white border-b border-slate-700 pb-2 mb-4">Documentos</h2>
                <p className="text-gray-400 italic">Visualização de documentos (CRLV, CNH) em breve.</p>
             </div>
        </div>
    );
};

export default VehicleDetails;