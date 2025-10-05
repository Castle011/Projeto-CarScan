
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Vehicle, Checklist } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import { initialVehicles, initialChecklists } from './initialData';

interface AppContextType {
  vehicles: Vehicle[];
  addVehicle: (vehicle: Vehicle) => void;
  updateVehicle: (vehicle: Vehicle) => void;
  deleteVehicle: (id: string) => void;
  getVehicleById: (id: string) => Vehicle | undefined;
  checklists: Checklist[];
  addChecklist: (checklist: Checklist) => void;
  updateChecklist: (checklist: Checklist) => void;
  deleteChecklist: (id: string) => void;
  getChecklistById: (id: string) => Checklist | undefined;
  getChecklistsByVehicleId: (vehicleId: string) => Checklist[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vehicles, setVehicles] = useLocalStorage<Vehicle[]>('vehicles', initialVehicles);
  const [checklists, setChecklists] = useLocalStorage<Checklist[]>('checklists', initialChecklists);

  const addVehicle = (vehicle: Vehicle) => {
    setVehicles(prev => [...prev, vehicle]);
  };

  const updateVehicle = (updatedVehicle: Vehicle) => {
    setVehicles(prev => prev.map(v => v.id === updatedVehicle.id ? updatedVehicle : v));
  };

  const deleteVehicle = (id: string) => {
    setVehicles(prev => prev.filter(v => v.id !== id));
    setChecklists(prev => prev.filter(c => c.vehicleId !== id)); // Also remove related checklists
  };
  
  const getVehicleById = (id: string) => vehicles.find(v => v.id === id);

  const addChecklist = (checklist: Checklist) => {
    setChecklists(prev => [...prev, checklist]);
  };

  const updateChecklist = (updatedChecklist: Checklist) => {
    setChecklists(prev => prev.map(c => c.id === updatedChecklist.id ? updatedChecklist : c));
  };

  const deleteChecklist = (id: string) => {
    setChecklists(prev => prev.filter(c => c.id !== id));
  };

  const getChecklistById = (id: string) => checklists.find(c => c.id === id);

  const getChecklistsByVehicleId = (vehicleId: string) => checklists.filter(c => c.vehicleId === vehicleId);

  return (
    <AppContext.Provider value={{
      vehicles,
      addVehicle,
      updateVehicle,
      deleteVehicle,
      getVehicleById,
      checklists,
      addChecklist,
      updateChecklist,
      deleteChecklist,
      getChecklistById,
      getChecklistsByVehicleId,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// This is a separate file for initial data to keep AppContext clean.
// context/initialData.ts
const initialVehicles: Vehicle[] = [];

const initialChecklists: Checklist[] = [];