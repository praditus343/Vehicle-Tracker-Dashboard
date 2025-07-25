export interface Vehicle {
  id: number;
  name: string;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  speed: number;
  updated_at: string;
}

export interface VehicleTelemetry {
  vehicleId: number;
  odometer: number;
  fuel_level: number;
  timestamp: string;
  latitude: number;
  longitude: number;
  speed: number;
}

export interface ApiError {
  message: string;
  status: number;
}
