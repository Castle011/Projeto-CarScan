
import React from 'react';

const Settings: React.FC = () => {

    const SettingCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
        <div className="bg-slate-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-white mb-4 border-b border-slate-600 pb-2">{title}</h2>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );

    const Toggle: React.FC<{ label: string; enabled: boolean }> = ({ label, enabled }) => (
        <div className="flex items-center justify-between">
            <span className="text-gray-200">{label}</span>
            <div className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${enabled ? 'bg-blue-600' : 'bg-slate-600'}`}>
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${enabled ? 'translate-x-6' : ''}`}></div>
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-white">Configurações</h1>

            <SettingCard title="Notificações">
                <Toggle label="Lembretes de manutenção" enabled={true} />
                <Toggle label="Alertas de checklist incompleto" enabled={true} />
                <Toggle label="Novidades do app por e-mail" enabled={false} />
            </SettingCard>

            <SettingCard title="Gerenciamento de Checklists">
                <p className="text-gray-300">A capacidade de criar e personalizar seus próprios modelos de checklist estará disponível em breve!</p>
                <button className="bg-slate-600 text-gray-400 font-semibold py-2 px-4 rounded-lg cursor-not-allowed">
                    Gerenciar Modelos
                </button>
            </SettingCard>

             <SettingCard title="Sobre">
                <a href="#" className="block text-blue-400 hover:underline">Termos de Uso</a>
                <a href="#" className="block text-blue-400 hover:underline">Política de Privacidade</a>
                <a href="#" className="block text-blue-400 hover:underline">Enviar Feedback</a>
            </SettingCard>
        </div>
    );
};

export default Settings;