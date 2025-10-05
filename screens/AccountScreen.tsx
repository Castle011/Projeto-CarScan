import React from 'react';
import { useAuth } from '../context/AuthContext';

const AccountScreen: React.FC = () => {
    const { user, logout, deleteAccount } = useAuth();

    if (!user) {
        return null; // Or a loading spinner
    }

    const handleDeleteAccount = () => {
        if (window.confirm('Tem certeza que deseja excluir sua conta permanentemente? Esta ação não pode ser desfeita.')) {
            deleteAccount(user.email);
        }
    };
    
    const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
        <div className="bg-slate-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-white mb-4 border-b border-slate-600 pb-2">{title}</h2>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-white">Minha Conta</h1>

            <Card title="Informações do Perfil">
                <div>
                    <label className="block text-sm font-medium text-gray-300">Nome</label>
                    <input type="text" value={user.name} disabled className="mt-1 w-full p-2 bg-slate-700 border border-slate-600 text-gray-400 rounded-md" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-300">Email</label>
                    <input type="email" value={user.email} disabled className="mt-1 w-full p-2 bg-slate-700 border border-slate-600 text-gray-400 rounded-md" />
                </div>
                <button onClick={() => alert('Funcionalidade de mudança de senha em breve!')} className="text-blue-400 hover:underline">
                    Mudar senha
                </button>
            </Card>
            
            <Card title="Ações da Conta">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-gray-200">Sair da sua conta em todos os dispositivos.</p>
                    <button 
                        onClick={logout} 
                        className="mt-2 sm:mt-0 bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-500 transition-colors"
                    >
                        Sair
                    </button>
                </div>
                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-slate-700">
                    <div className='pr-4'>
                        <p className="font-medium text-red-400">Excluir sua conta</p>
                        <p className="text-sm text-gray-400">Esta ação é permanente e removerá todos os seus dados.</p>
                    </div>
                    <button 
                        onClick={handleDeleteAccount} 
                        className="mt-2 sm:mt-0 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Excluir Conta
                    </button>
                </div>
            </Card>

        </div>
    );
};

export default AccountScreen;
