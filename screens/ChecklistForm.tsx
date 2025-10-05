
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Checklist, ChecklistCategory, CheckStatus } from '../types';
import { CHECKLIST_TEMPLATE } from '../constants';
import _ from 'lodash';

const ChecklistForm: React.FC = () => {
    const { vehicleId, id: checklistId } = useParams<{ vehicleId?: string; id?: string }>();
    const navigate = useNavigate();
    const { getVehicleById, addChecklist, updateChecklist, getChecklistById } = useAppContext();
    const isEditing = Boolean(checklistId);
    
    const [checklist, setChecklist] = useState<Checklist | null>(null);
    const vehicle = getVehicleById(isEditing ? checklist?.vehicleId ?? '' : vehicleId ?? '');

    useEffect(() => {
        if (isEditing && checklistId) {
            const existingChecklist = getChecklistById(checklistId);
            if (existingChecklist) {
                setChecklist(existingChecklist);
            } else {
                navigate('/checklists');
            }
        } else if (vehicleId) {
            const vehicle = getVehicleById(vehicleId);
            if (vehicle) {
                setChecklist({
                    id: new Date().toISOString(),
                    vehicleId: vehicleId,
                    driverName: '',
                    startDate: new Date().toISOString(),
                    startOdometer: vehicle.odometer,
                    generalObservation: '',
                    categories: _.cloneDeep(CHECKLIST_TEMPLATE),
                    status: 'Rascunho',
                });
            } else {
                 navigate('/vehicles');
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleId, checklistId, getChecklistById, getVehicleById, navigate, isEditing]);

    if (!checklist || !vehicle) {
        return <div className="text-center p-8">Carregando...</div>;
    }

    const handleItemChange = (categoryIndex: number, itemIndex: number, field: string, value: any) => {
        const newChecklist = { ...checklist };
        (newChecklist.categories[categoryIndex].items[itemIndex] as any)[field] = value;
        setChecklist(newChecklist);
    };

    const handlePhotoUpload = (categoryIndex: number, itemIndex: number, e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleItemChange(categoryIndex, itemIndex, 'photo', reader.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    const handleSubmit = (finalStatus: 'Rascunho' | 'Concluído') => {
        const finalChecklist = {
            ...checklist,
            status: finalStatus,
            endDate: finalStatus === 'Concluído' ? new Date().toISOString() : undefined
        };
        if (isEditing) {
            updateChecklist(finalChecklist);
        } else {
            addChecklist(finalChecklist);
        }
        navigate(`/checklist/${finalChecklist.id}`);
    };

    return (
        <div className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-lg shadow-lg space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Checklist do Veículo</h1>
                <p className="text-lg text-gray-300">{vehicle.brand} {vehicle.model} - {vehicle.plate}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="driverName" className="block text-sm font-medium text-gray-300">Nome do Condutor</label>
                    <input type="text" id="driverName" value={checklist.driverName} onChange={(e) => setChecklist({...checklist, driverName: e.target.value})} className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                 <div>
                    <label htmlFor="startOdometer" className="block text-sm font-medium text-gray-300">Hodômetro Inicial (km)</label>
                    <input type="number" id="startOdometer" value={checklist.startOdometer} onChange={(e) => setChecklist({...checklist, startOdometer: parseInt(e.target.value) || 0})} className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
            </div>

            <div className="space-y-6">
                {checklist.categories.map((category, catIndex) => (
                    <div key={catIndex}>
                        <h2 className="text-xl font-semibold text-white border-b-2 border-slate-700 pb-2 mb-4">{category.title}</h2>
                        <div className="space-y-4">
                            {category.items.map((item, itemIndex) => (
                                <div key={item.id} className="p-4 rounded-md border border-slate-700">
                                    <label className="font-medium text-white">{item.label}</label>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <button onClick={() => handleItemChange(catIndex, itemIndex, 'status', CheckStatus.OK)} className={`px-4 py-1 rounded-full text-sm ${item.status === CheckStatus.OK ? 'bg-green-500 text-white' : 'bg-slate-600 text-gray-200'}`}>OK</button>
                                        <button onClick={() => handleItemChange(catIndex, itemIndex, 'status', CheckStatus.NaoConforme)} className={`px-4 py-1 rounded-full text-sm ${item.status === CheckStatus.NaoConforme ? 'bg-red-500 text-white' : 'bg-slate-600 text-gray-200'}`}>Não Conforme</button>
                                    </div>
                                    {item.status === CheckStatus.NaoConforme && (
                                        <div className="mt-3 space-y-2">
                                            <textarea placeholder="Observação..." value={item.observation} onChange={(e) => handleItemChange(catIndex, itemIndex, 'observation', e.target.value)} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md focus:ring-yellow-500 focus:border-yellow-500" rows={2}></textarea>
                                            <input type="file" accept="image/*" onChange={(e) => handlePhotoUpload(catIndex, itemIndex, e)} className="block w-full text-sm text-gray-400 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"/>
                                            {item.photo && <img src={item.photo} alt="Anexo" className="mt-2 h-24 w-auto rounded-md object-cover"/>}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
             <div>
                <label htmlFor="generalObservation" className="block text-sm font-medium text-gray-300">Observações Gerais</label>
                <textarea id="generalObservation" value={checklist.generalObservation} onChange={(e) => setChecklist({...checklist, generalObservation: e.target.value})} className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" rows={3}></textarea>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-slate-700">
                <button onClick={() => handleSubmit('Rascunho')} className="bg-slate-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-500 transition-colors">
                    Salvar Rascunho
                </button>
                <button onClick={() => handleSubmit('Concluído')} className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors">
                    Finalizar Checklist
                </button>
            </div>
        </div>
    );
};

export default ChecklistForm;