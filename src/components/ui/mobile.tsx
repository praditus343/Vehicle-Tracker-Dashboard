import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Home, 
  Car, 
  BarChart3, 
  Settings, 
  Menu,
  Bell
} from 'lucide-react';

interface MobileNavProps {
  className?: string;
}

export const MobileNav: React.FC<MobileNavProps> = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      icon: Home,
      label: 'Dashboard',
      path: '/',
      active: location.pathname === '/'
    },
    {
      icon: Car,
      label: 'Vehicles',
      path: '/',
      active: location.pathname === '/'
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      path: '/analytics',
      active: location.pathname === '/analytics'
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/settings',
      active: location.pathname === '/settings'
    }
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 md:hidden ${className}`}>
      <Card className="m-4 mb-6 shadow-lg border-0 glass">
        <div className="flex items-center justify-around p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.path}
                variant={item.active ? "default" : "ghost"}
                size="sm"
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center h-16 w-16 p-2 ${
                  item.active 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

interface MobileHeaderProps {
  title: string;
  showNotifications?: boolean;
  onMenuClick?: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ 
  title, 
  showNotifications = true,
  onMenuClick 
}) => {
  return (
    <div className="sticky top-0 z-40 md:hidden">
      <Card className="m-4 mb-0 shadow-md border-0 glass">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="p-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <h1 className="text-lg font-bold text-gray-900 truncate mx-4">
            {title}
          </h1>
          
          {showNotifications && (
            <Button
              variant="ghost"
              size="sm"
              className="p-2 relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

interface ResponsiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  addPadding?: boolean;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ 
  children, 
  className,
  addPadding = true,
  ...props 
}) => {
  return (
    <div 
      className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl ${
        addPadding ? 'pb-24 md:pb-8' : ''
      } ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};
