
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ChecklistItem, CheckStatus } from '../types';

const ChecklistDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getChecklistById, getVehicleById, deleteChecklist } = useAppContext();

    const checklist = getChecklistById(id ?? '');
    const vehicle = getVehicleById(checklist?.vehicleId ?? '');

    if (!checklist || !vehicle) {
        return (
            <div className="text-center p-8">
                <p className="text-red-500">Checklist ou veículo não encontrado.</p>
                <button onClick={() => navigate('/checklists')} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Voltar ao Histórico</button>
            </div>
        );
    }
    
    const printReport = () => {
        window.print();
    };

    const handleDelete = () => {
        if (window.confirm('Tem certeza que deseja excluir este checklist? Esta ação não pode ser desfeita.')) {
            if(id) {
                deleteChecklist(id);
                navigate('/checklists');
            }
        }
    };

    const DetailHeader: React.FC<{ label: string; value: string }> = ({ label, value }) => (
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="font-semibold text-white">{value}</p>
        </div>
    );
    
    const ItemDetail: React.FC<{ item: ChecklistItem }> = ({ item }) => (
        <div className="py-3 border-b border-slate-700 last:border-b-0">
            <div className="flex justify-between items-start">
                <p className="font-medium text-white">{item.label}</p>
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${item.status === CheckStatus.OK ? 'bg-green-900 text-green-200' : item.status === CheckStatus.NaoConforme ? 'bg-red-900 text-red-200' : 'bg-slate-600 text-gray-200'}`}>
                    {item.status ?? 'Não verificado'}
                </span>
            </div>
            {item.status === CheckStatus.NaoConforme && (
                <div className="mt-2 pl-4 border-l-2 border-red-500">
                    <p className="text-sm text-gray-300"><span className="font-semibold">Observação:</span> {item.observation || 'N/A'}</p>
                    {item.photo && (
                        <div className="mt-2">
                            <p className="text-sm font-semibold text-gray-300">Anexo:</p>
                            <img src={item.photo} alt={`Anexo de ${item.label}`} className="mt-1 h-32 w-auto rounded-md object-cover border border-slate-600"/>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-lg shadow-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Detalhes do Checklist</h1>
                    <p className="text-gray-400">Realizado em {new Date(checklist.startDate).toLocaleString('pt-BR')}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Link to={`/checklist/edit/${checklist.id}`} className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors">
                        Editar
                    </Link>
                    <button onClick={printReport} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        Gerar PDF
                    </button>
                    <button onClick={handleDelete} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
                        Excluir
                    </button>
                </div>
            </div>

            <div className="p-4 border border-slate-700 rounded-lg bg-slate-700 mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">Resumo</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DetailHeader label="Veículo" value={`${vehicle.brand} ${vehicle.model}`} />
                    <DetailHeader label="Placa" value={vehicle.plate} />
                    <DetailHeader label="Condutor" value={checklist.driverName} />
                    <DetailHeader label="Status" value={checklist.status} />
                </div>
            </div>

            <div className="space-y-6">
                {checklist.categories.map((category, index) => (
                    <div key={index}>
                        <h3 className="text-lg font-bold text-white bg-slate-700 p-3 rounded-t-lg">{category.title}</h3>
                        <div className="p-3 border border-slate-700 rounded-b-lg">
                           {category.items.map(item => <ItemDetail key={item.id} item={item} />)}
                        </div>
                    </div>
                ))}
            </div>

            {checklist.generalObservation && (
                <div className="mt-6">
                    <h3 className="text-lg font-bold text-white">Observações Gerais</h3>
                    <p className="mt-2 p-3 bg-slate-700 border border-slate-600 rounded-lg text-gray-200">{checklist.generalObservation}</p>
                </div>
            )}
        </div>
    );
};

export default ChecklistDetails;