import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  className, 
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  icon,
  action
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
      <div className="flex items-start space-x-3">
        {icon && (
          <div className="flex-shrink-0 mt-1">
            {icon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm sm:text-base text-gray-600 line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'gray';
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  color = 'blue',
  trend,
  trendValue
}) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-50 border-blue-200',
    green: 'text-green-600 bg-green-50 border-green-200',
    yellow: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    red: 'text-red-600 bg-red-50 border-red-200',
    gray: 'text-gray-600 bg-gray-50 border-gray-200'
  };

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-600 truncate">{title}</p>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">{value}</p>
            {trend && trendValue && (
              <span className={`ml-2 text-sm font-medium ${trendColors[trend]}`}>
                {trendValue}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-sm text-gray-500 line-clamp-1">{description}</p>
          )}
        </div>
        {icon && (
          <div className={`flex-shrink-0 p-3 rounded-lg ${colorClasses[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
