import { create } from 'zustand';
import { Vehicle, VehicleTelemetry, ApiError } from '@/types/vehicle';

interface VehicleState {
  vehicles: Vehicle[];
  selectedVehicle: VehicleTelemetry | null;
  loading: boolean;
  error: ApiError | null;
  
  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: ApiError | null) => void;
  setVehicles: (vehicles: Vehicle[]) => void;
  setSelectedVehicle: (vehicle: VehicleTelemetry | null) => void;
  
  // API calls
  fetchVehicles: () => Promise<void>;
  fetchVehicleDetail: (id: number) => Promise<void>;
}

// Mock API endpoints - replace with actual API URLs
// const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API

export const useVehicleStore = create<VehicleState>((set) => ({
  vehicles: [],
  selectedVehicle: null,
  loading: false,
  error: null,

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setVehicles: (vehicles) => set({ vehicles }),
  setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),

  fetchVehicles: async () => {
    set({ loading: true, error: null });
    
    try {
      // Mock data for demonstration - replace with actual API call
      const mockVehicles: Vehicle[] = [
        {
          id: 1,
          name: "Toyota Avanza",
          status: "ACTIVE",
          speed: 60,
          updated_at: "2025-07-23T10:00:00Z"
        },
        {
          id: 2,
          name: "Honda Civic",
          status: "ACTIVE",
          speed: 45,
          updated_at: "2025-07-23T09:45:00Z"
        },
        {
          id: 3,
          name: "Mitsubishi Xpander",
          status: "MAINTENANCE",
          speed: 0,
          updated_at: "2025-07-22T15:30:00Z"
        },
        {
          id: 4,
          name: "Suzuki Ertiga",
          status: "INACTIVE",
          speed: 0,
          updated_at: "2025-07-21T08:15:00Z"
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ vehicles: mockVehicles, loading: false });
    } catch (error) {
      set({ 
        error: { 
          message: error instanceof Error ? error.message : 'Failed to fetch vehicles',
          status: 500
        }, 
        loading: false 
      });
    }
  },

  fetchVehicleDetail: async (id: number) => {
    set({ loading: true, error: null });
    
    try {
      // Mock data for demonstration - replace with actual API call
      const mockTelemetry: Record<number, VehicleTelemetry> = {
        1: {
          vehicleId: 1,
          odometer: 123456.78,
          fuel_level: 70.2,
          timestamp: "2025-07-23T10:00:00Z",
          latitude: -6.12,
          longitude: 106.85,
          speed: 60
        },
        2: {
          vehicleId: 2,
          odometer: 89432.15,
          fuel_level: 45.8,
          timestamp: "2025-07-23T09:45:00Z",
          latitude: -6.15,
          longitude: 106.88,
          speed: 45
        },
        3: {
          vehicleId: 3,
          odometer: 156789.32,
          fuel_level: 20.1,
          timestamp: "2025-07-22T15:30:00Z",
          latitude: -6.18,
          longitude: 106.82,
          speed: 0
        },
        4: {
          vehicleId: 4,
          odometer: 67543.98,
          fuel_level: 85.6,
          timestamp: "2025-07-21T08:15:00Z",
          latitude: -6.21,
          longitude: 106.79,
          speed: 0
        }
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const vehicleDetail = mockTelemetry[id];
      if (!vehicleDetail) {
        throw new Error('Vehicle not found');
      }

      set({ selectedVehicle: vehicleDetail, loading: false });
    } catch (error) {
      set({ 
        error: { 
          message: error instanceof Error ? error.message : 'Failed to fetch vehicle details',
          status: 404
        }, 
        loading: false 
      });
    }
  }
}));
