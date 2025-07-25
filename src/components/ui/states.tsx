import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertCircle, Car, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading...' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600`} />
      <p className="text-sm sm:text-base text-gray-600 font-medium">{text}</p>
    </div>
  );
};

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryText?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
  retryText = 'Try again'
}) => {
  return (
    <Card className="border-red-200 bg-red-50">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-red-900">{title}</h3>
            <p className="text-red-700 max-w-sm">{message}</p>
          </div>
          {onRetry && (
            <Button 
              onClick={onRetry} 
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {retryText}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface EmptyStateProps {
  title?: string;
  message: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No data found',
  message,
  icon,
  action
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center space-y-4">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">
        {icon || <Car className="h-8 w-8 text-gray-400" />}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 max-w-sm">{message}</p>
      </div>
      {action && action}
    </div>
  );
};

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );
};

export const TableSkeleton: React.FC = () => {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
