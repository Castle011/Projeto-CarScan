
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Vehicle, VehicleType } from '../types';

const InputField: React.FC<{ label: string; name: string; value: string | number; onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; type?: string; required?: boolean; }> = 
({ label, name, value, onChange, type = 'text', required = true }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-300">{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
    </div>
);

const VehicleForm: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const { addVehicle, updateVehicle, getVehicleById } = useAppContext();
    const isEditing = Boolean(id);
    
    const [vehicle, setVehicle] = useState<Omit<Vehicle, 'id'>>({
        plate: '', model: '', brand: '', year: new Date().getFullYear(),
        type: VehicleType.Carro, color: '', chassis: '', renavam: '',
        odometer: 0, photo: undefined
    });

    useEffect(() => {
        if (isEditing && id) {
            const existingVehicle = getVehicleById(id);
            if (existingVehicle) {
                setVehicle(existingVehicle);
            } else {
                navigate('/vehicles');
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, isEditing, getVehicleById, navigate]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        setVehicle(prev => ({ ...prev, [name]: type === 'number' ? parseInt(value, 10) || 0 : value }));
    };

    const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setVehicle(prev => ({ ...prev, photo: reader.result as string }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing && id) {
            updateVehicle({ ...vehicle, id });
        } else {
            addVehicle({ ...vehicle, id: new Date().toISOString() });
        }
        navigate('/vehicles');
    };

    return (
        <div className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-white mb-6">{isEditing ? 'Editar Veículo' : 'Adicionar Novo Veículo'}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Marca" name="brand" value={vehicle.brand} onChange={handleChange} />
                    <InputField label="Modelo" name="model" value={vehicle.model} onChange={handleChange} />
                    <InputField label="Placa" name="plate" value={vehicle.plate} onChange={handleChange} />
                    <InputField label="Ano" name="year" value={vehicle.year} onChange={handleChange} type="number" />
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-300">Tipo</label>
                        <select
                            id="type" name="type" value={vehicle.type} onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            {Object.values(VehicleType).map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>
                    <InputField label="Cor" name="color" value={vehicle.color} onChange={handleChange} />
                    <InputField label="Chassi" name="chassis" value={vehicle.chassis} onChange={handleChange} />
                    <InputField label="RENAVAM" name="renavam" value={vehicle.renavam} onChange={handleChange} />
                    <InputField label="Hodômetro (km)" name="odometer" value={vehicle.odometer} onChange={handleChange} type="number" />
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-300">Foto do Veículo</label>
                     <div className="mt-1 flex items-center space-x-4">
                        {vehicle.photo && <img src={vehicle.photo} alt="Preview" className="h-20 w-20 rounded-md object-cover" />}
                        <input type="file" onChange={handlePhotoChange} accept="image/*" className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                    </div>
                </div>
                <div className="flex justify-end space-x-4">
                    <button type="button" onClick={() => navigate(-1)} className="bg-slate-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-500 transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        {isEditing ? 'Salvar Alterações' : 'Adicionar Veículo'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VehicleForm;