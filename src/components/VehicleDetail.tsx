import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVehicleStore } from '@/store/vehicleStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Container, StatsCard } from '@/components/ui/layout';
import { LoadingSpinner, ErrorState } from '@/components/ui/states';
import { 
  ArrowLeft, 
  Car, 
  Fuel, 
  Gauge, 
  MapPin, 
  Clock, 
  Calendar,
  ExternalLink,
  Copy,
  Activity,
  Route,
  RefreshCw,
  Settings
} from 'lucide-react';

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedVehicle, vehicles, loading, error, fetchVehicleDetail } = useVehicleStore();

  useEffect(() => {
    if (id) {
      fetchVehicleDetail(parseInt(id));
    }
  }, [id, fetchVehicleDetail]);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      full: date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      relative: (() => {
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
        if (diffInMinutes < 1) return 'Just updated';
        if (diffInMinutes < 60) return `Updated ${diffInMinutes}m ago`;
        if (diffInMinutes < 1440) return `Updated ${Math.floor(diffInMinutes / 60)}h ago`;
        return `Updated ${Math.floor(diffInMinutes / 1440)}d ago`;
      })()
    };
  };

  const getFuelLevelConfig = (level: number) => {
    if (level > 70) return { color: 'green', status: 'Excellent', bg: 'bg-green-500' };
    if (level > 50) return { color: 'blue', status: 'Good', bg: 'bg-blue-500' };
    if (level > 30) return { color: 'yellow', status: 'Fair', bg: 'bg-yellow-500' };
    if (level > 10) return { color: 'orange', status: 'Low', bg: 'bg-orange-500' };
    return { color: 'red', status: 'Critical', bg: 'bg-red-500' };
  };

  const getSpeedStatus = (speed: number) => {
    if (speed === 0) return { status: 'Stationary', color: 'gray' };
    if (speed < 30) return { status: 'Slow', color: 'blue' };
    if (speed < 60) return { status: 'Moderate', color: 'green' };
    if (speed < 90) return { status: 'Fast', color: 'yellow' };
    return { status: 'Very Fast', color: 'red' };
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const vehicleInfo = vehicles.find(v => v.id === parseInt(id || '0'));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Container className="py-6 sm:py-8">
          <div className="flex items-center space-x-4 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
              className="shadow-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Fleet
            </Button>
          </div>
          <LoadingSpinner text="Loading vehicle details..." />
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Container className="py-6 sm:py-8">
          <div className="flex items-center space-x-4 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
              className="shadow-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Fleet
            </Button>
          </div>
          <ErrorState
            title="Failed to load vehicle details"
            message={error.message}
            onRetry={() => id && fetchVehicleDetail(parseInt(id))}
          />
        </Container>
      </div>
    );
  }

  if (!selectedVehicle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Container className="py-6 sm:py-8">
          <div className="flex items-center space-x-4 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
              className="shadow-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Fleet
            </Button>
          </div>
          <ErrorState
            title="Vehicle not found"
            message="The requested vehicle could not be found. It may have been removed or the ID is incorrect."
          />
        </Container>
      </div>
    );
  }

  const fuelConfig = getFuelLevelConfig(selectedVehicle.fuel_level);
  const speedStatus = getSpeedStatus(selectedVehicle.speed);
  const timeData = formatDateTime(selectedVehicle.timestamp);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Container className="py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Fleet
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                  {vehicleInfo?.name || `Vehicle #${selectedVehicle.vehicleId}`}
                </h1>
                <p className="text-gray-600 flex items-center space-x-2">
                  <span>ID: #{selectedVehicle.vehicleId}</span>
                  {vehicleInfo && (
                    <>
                      <span>•</span>
                      <Badge variant="outline" className="ml-2">
                        {vehicleInfo.status}
                      </Badge>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => id && fetchVehicleDetail(parseInt(id))}
              className="shadow-sm"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="shadow-sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <StatsCard
            title="Current Speed"
            value={`${selectedVehicle.speed} km/h`}
            description={speedStatus.status}
            icon={<Gauge className="h-6 w-6" />}
            color={speedStatus.color as any}
          />
          <StatsCard
            title="Fuel Level"
            value={`${selectedVehicle.fuel_level.toFixed(1)}%`}
            description={fuelConfig.status}
            icon={<Fuel className="h-6 w-6" />}
            color={fuelConfig.color as any}
          />
          <StatsCard
            title="Distance Traveled"
            value={`${selectedVehicle.odometer.toLocaleString()} km`}
            description="Total odometer reading"
            icon={<Route className="h-6 w-6" />}
            color="blue"
          />
          <StatsCard
            title="Last Update"
            value={timeData.relative}
            description={timeData.full}
            icon={<Clock className="h-6 w-6" />}
            color="gray"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Location Information */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <span>Location & Navigation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="text-sm font-medium text-gray-600 block mb-1">
                        Latitude
                      </label>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-mono text-gray-900">
                          {selectedVehicle.latitude.toFixed(6)}°
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(selectedVehicle.latitude.toString())}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="text-sm font-medium text-gray-600 block mb-1">
                        Longitude
                      </label>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-mono text-gray-900">
                          {selectedVehicle.longitude.toFixed(6)}°
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(selectedVehicle.longitude.toString())}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-blue-600" />
                        Quick Actions
                      </h4>
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start"
                          onClick={() => {
                            const url = `https://www.google.com/maps?q=${selectedVehicle.latitude},${selectedVehicle.longitude}`;
                            window.open(url, '_blank');
                          }}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open in Google Maps
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start"
                          onClick={() => {
                            const coords = `${selectedVehicle.latitude},${selectedVehicle.longitude}`;
                            copyToClipboard(coords);
                          }}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Coordinates
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start"
                          onClick={() => {
                            const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedVehicle.latitude},${selectedVehicle.longitude}`;
                            window.open(url, '_blank');
                          }}
                        >
                          <Route className="h-4 w-4 mr-2" />
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fuel Status */}
          <div>
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-gray-100">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Fuel className="h-5 w-5 text-orange-600" />
                  <span>Fuel Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - selectedVehicle.fuel_level / 100)}`}
                        className={`transition-all duration-1000 ${
                          fuelConfig.color === 'green' ? 'text-green-500' :
                          fuelConfig.color === 'blue' ? 'text-blue-500' :
                          fuelConfig.color === 'yellow' ? 'text-yellow-500' :
                          fuelConfig.color === 'orange' ? 'text-orange-500' :
                          'text-red-500'
                        }`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${
                          fuelConfig.color === 'green' ? 'text-green-600' :
                          fuelConfig.color === 'blue' ? 'text-blue-600' :
                          fuelConfig.color === 'yellow' ? 'text-yellow-600' :
                          fuelConfig.color === 'orange' ? 'text-orange-600' :
                          'text-red-600'
                        }`}>
                          {selectedVehicle.fuel_level.toFixed(0)}%
                        </div>
                        <div className="text-xs text-gray-500">Fuel</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className={`font-semibold ${
                      fuelConfig.color === 'green' ? 'text-green-600' :
                      fuelConfig.color === 'blue' ? 'text-blue-600' :
                      fuelConfig.color === 'yellow' ? 'text-yellow-600' :
                      fuelConfig.color === 'orange' ? 'text-orange-600' :
                      'text-red-600'
                    }`}>
                      {fuelConfig.status}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedVehicle.fuel_level > 20 
                        ? 'Fuel level is adequate' 
                        : 'Consider refueling soon'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Telemetry */}
        <div className="mt-8">
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-100">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Calendar className="h-5 w-5 text-gray-600" />
                <span>Detailed Telemetry Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-600 block mb-1">Vehicle ID</label>
                  <p className="text-lg font-semibold text-gray-900">#{selectedVehicle.vehicleId}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-600 block mb-1">Current Speed</label>
                  <p className="text-lg font-semibold text-blue-600">{selectedVehicle.speed} km/h</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-600 block mb-1">Fuel Level</label>
                  <p className={`text-lg font-semibold ${
                    fuelConfig.color === 'green' ? 'text-green-600' :
                    fuelConfig.color === 'blue' ? 'text-blue-600' :
                    fuelConfig.color === 'yellow' ? 'text-yellow-600' :
                    fuelConfig.color === 'orange' ? 'text-orange-600' :
                    'text-red-600'
                  }`}>
                    {selectedVehicle.fuel_level.toFixed(1)}%
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-600 block mb-1">Odometer Reading</label>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedVehicle.odometer.toLocaleString()} km
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-600 block mb-1">GPS Coordinates</label>
                  <p className="text-lg font-mono text-gray-900 text-sm">
                    {selectedVehicle.latitude.toFixed(6)}, {selectedVehicle.longitude.toFixed(6)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-600 block mb-1">Last Updated</label>
                  <p className="text-lg font-semibold text-gray-900 text-sm">
                    {timeData.full}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default VehicleDetail;
