
export enum VehicleType {
  Carro = 'Carro',
  Moto = 'Moto',
  Caminhao = 'Caminhão',
}

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  brand: string;
  year: number;
  type: VehicleType;
  color: string;
  chassis: string;
  renavam: string;
  odometer: number;
  photo?: string; // base64 string
}

export enum CheckStatus {
  OK = 'OK',
  NaoConforme = 'Não Conforme',
}

export interface ChecklistItem {
  id: string;
  label: string;
  status: CheckStatus | null;
  observation: string;
  photo?: string; // base64 string
}

export interface ChecklistCategory {
  title: string;
  items: ChecklistItem[];
}

export interface Checklist {
  id: string;
  vehicleId: string;
  driverName: string;
  startDate: string;
  endDate?: string;
  startOdometer: number;
  endOdometer?: number;
  generalObservation: string;
  categories: ChecklistCategory[];
  status: 'Rascunho' | 'Concluído';
}
