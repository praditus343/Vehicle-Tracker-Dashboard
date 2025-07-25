import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVehicleStore } from '@/store/vehicleStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Container, StatsCard } from '@/components/ui/layout';
import { ErrorState, EmptyState, TableSkeleton } from '@/components/ui/states';
import { 
  Car, 
  Clock, 
  Gauge, 
  Activity,
  Wrench,
  Pause,
  Eye,
  TrendingUp,
  MapPin
} from 'lucide-react';

const VehicleList = () => {
  const navigate = useNavigate();
  const { vehicles, loading, error, fetchVehicles } = useVehicleStore();

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: <Activity className="h-3 w-3" />,
          label: 'Active'
        };
      case 'INACTIVE':
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <Pause className="h-3 w-3" />,
          label: 'Inactive'
        };
      case 'MAINTENANCE':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: <Wrench className="h-3 w-3" />,
          label: 'Maintenance'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <Pause className="h-3 w-3" />,
          label: status
        };
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate statistics
  const activeVehicles = vehicles.filter(v => v.status === 'ACTIVE').length;
  const averageSpeed = vehicles.length > 0 
    ? Math.round(vehicles.reduce((sum, v) => sum + v.speed, 0) / vehicles.length)
    : 0;
  const maintenanceCount = vehicles.filter(v => v.status === 'MAINTENANCE').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Container className="py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <Car className="h-8 w-8 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                  Vehicle Tracker
                </h1>
                <p className="mt-1 text-sm sm:text-base text-gray-600 line-clamp-2">
                  Monitor your fleet in real-time
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
            <Card>
              <CardContent className="p-6">
                <TableSkeleton />
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Container className="py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <Car className="h-8 w-8 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                  Vehicle Tracker
                </h1>
                <p className="mt-1 text-sm sm:text-base text-gray-600 line-clamp-2">
                  Monitor your fleet in real-time
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <ErrorState
              title="Failed to load vehicles"
              message={error.message}
              onRetry={fetchVehicles}
            />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Container className="py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <Car className="h-8 w-8 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                Vehicle Tracker
              </h1>
              <p className="mt-1 text-sm sm:text-base text-gray-600 line-clamp-2">
                Monitor your fleet in real-time
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Vehicles</p>
              <p className="text-2xl font-bold text-blue-600">{vehicles.length}</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatsCard
            title="Active Vehicles"
            value={activeVehicles}
            description={`${vehicles.length} total vehicles`}
            icon={<Activity className="h-6 w-6" />}
            color="green"
            trend="up"
            trendValue={`${Math.round((activeVehicles/vehicles.length)*100)}%`}
          />
          <StatsCard
            title="Average Speed"
            value={`${averageSpeed} km/h`}
            description="Fleet average"
            icon={<Gauge className="h-6 w-6" />}
            color="blue"
          />
          <StatsCard
            title="Maintenance"
            value={maintenanceCount}
            description="Vehicles in service"
            icon={<Wrench className="h-6 w-6" />}
            color={maintenanceCount > 0 ? "yellow" : "gray"}
          />
          <StatsCard
            title="Fleet Status"
            value="Online"
            description="All systems operational"
            icon={<TrendingUp className="h-6 w-6" />}
            color="green"
          />
        </div>

        {/* Vehicle Table */}
        <div className="mt-8">
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-white border-b border-gray-100">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>Fleet Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {vehicles.length === 0 ? (
                <EmptyState
                  title="No vehicles found"
                  message="Start by adding vehicles to your fleet to see them here."
                  icon={<Car className="h-8 w-8 text-gray-400" />}
                />
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden sm:block overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold text-gray-900">Vehicle</TableHead>
                          <TableHead className="font-semibold text-gray-900">Status</TableHead>
                          <TableHead className="font-semibold text-gray-900">Speed</TableHead>
                          <TableHead className="font-semibold text-gray-900">Last Update</TableHead>
                          <TableHead className="font-semibold text-gray-900 text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {vehicles.map((vehicle, index) => {
                          const statusConfig = getStatusConfig(vehicle.status);
                          return (
                            <TableRow 
                              key={vehicle.id} 
                              className={`hover:bg-gray-50 transition-colors ${
                                index !== vehicles.length - 1 ? 'border-b border-gray-100' : ''
                              }`}
                            >
                              <TableCell className="font-medium py-4">
                                <div className="flex items-center space-x-3">
                                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Car className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-gray-900">{vehicle.name}</p>
                                    <p className="text-sm text-gray-500">ID: #{vehicle.id}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant="outline" 
                                  className={`${statusConfig.color} font-medium`}
                                >
                                  <span className="flex items-center space-x-1">
                                    {statusConfig.icon}
                                    <span>{statusConfig.label}</span>
                                  </span>
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Gauge className="h-4 w-4 text-blue-500" />
                                  <span className="font-semibold">{vehicle.speed}</span>
                                  <span className="text-sm text-gray-500">km/h</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2 text-gray-600">
                                  <Clock className="h-4 w-4" />
                                  <span className="text-sm font-medium">
                                    {formatDateTime(vehicle.updated_at)}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  size="sm"
                                  onClick={() => navigate(`/vehicles/${vehicle.id}`)}
                                  className="bg-blue-600 hover:bg-blue-700 shadow-sm"
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="block sm:hidden space-y-4 p-4">
                    {vehicles.map((vehicle) => {
                      const statusConfig = getStatusConfig(vehicle.status);
                      return (
                        <Card key={vehicle.id} className="shadow-sm border border-gray-200">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <Car className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900">{vehicle.name}</h3>
                                  <p className="text-sm text-gray-500">ID: #{vehicle.id}</p>
                                </div>
                              </div>
                              <Badge 
                                variant="outline" 
                                className={`${statusConfig.color} font-medium`}
                              >
                                <span className="flex items-center space-x-1">
                                  {statusConfig.icon}
                                  <span>{statusConfig.label}</span>
                                </span>
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-2">
                                <Gauge className="h-4 w-4 text-blue-500" />
                                <span className="font-semibold">{vehicle.speed} km/h</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Clock className="h-4 w-4" />
                                <span className="text-sm">{formatDateTime(vehicle.updated_at)}</span>
                              </div>
                            </div>
                            
                            <Button
                              size="sm"
                              onClick={() => navigate(`/vehicles/${vehicle.id}`)}
                              className="w-full bg-blue-600 hover:bg-blue-700"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default VehicleList;
