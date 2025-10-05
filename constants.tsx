
import React from 'react';
import { ChecklistCategory } from './types';

export const CHECKLIST_TEMPLATE: ChecklistCategory[] = [
  {
    title: 'Pneus',
    items: [
      { id: 'pneu_dianteiro_esquerdo', label: 'Pneu Dianteiro Esquerdo', status: null, observation: '' },
      { id: 'pneu_dianteiro_direito', label: 'Pneu Dianteiro Direito', status: null, observation: '' },
      { id: 'pneu_traseiro_esquerdo', label: 'Pneu Traseiro Esquerdo', status: null, observation: '' },
      { id: 'pneu_traseiro_direito', label: 'Pneu Traseiro Direito', status: null, observation: '' },
      { id: 'estepe', label: 'Estepe', status: null, observation: '' },
    ],
  },
  {
    title: 'Iluminação',
    items: [
      { id: 'farois_baixos', label: 'Faróis Baixos', status: null, observation: '' },
      { id: 'farois_altos', label: 'Faróis Altos', status: null, observation: '' },
      { id: 'luzes_freio', label: 'Luzes de Freio', status: null, observation: '' },
      { id: 'setas', label: 'Setas (Pisca-alerta)', status: null, observation: '' },
    ],
  },
  {
    title: 'Documentação',
    items: [
      { id: 'crlv', label: 'CRLV', status: null, observation: '' },
      { id: 'cnh_condutor', label: 'CNH do Condutor', status: null, observation: '' },
    ],
  },
  {
    title: 'Níveis de Fluidos',
    items: [
      { id: 'nivel_oleo', label: 'Nível de Óleo do Motor', status: null, observation: '' },
      { id: 'nivel_agua_radiador', label: 'Nível de Água do Radiador', status: null, observation: '' },
      { id: 'fluido_freio', label: 'Fluido de Freio', status: null, observation: '' },
    ],
  },
];
