# 🚗 Vehicle Tracker Dashboard

A modern, responsive vehicle tracking dashboard built with React, TypeScript, and TailwindCSS. Monitor your fleet in real-time with an intuitive and professional interface.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vehicle-tracker-dashboard-alpha.vercel.app/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-State%20Management-FF6B6B?style=for-the-badge)](https://zustand-demo.pmnd.rs/)

## 🌐 Live Demo

🚀 **[View Live Application](https://vehicle-tracker-dashboard-alpha.vercel.app/)**

Experience the fully responsive dashboard deployed on Vercel. Test all features including:
- Vehicle list with real-time status indicators
- Detailed vehicle telemetry views
- Mobile-optimized interface
- Interactive fuel level gauges
- Google Maps integration

## ✨ Features

### 🎯 Core Functionality
- **Vehicle List View**: Display all vehicles with status, speed, and last update information
- **Vehicle Detail View**: Comprehensive telemetry data for individual vehicles
- **Real-time Updates**: Mock real-time data updates with loading states
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🎨 Modern UI/UX
- **Gradient Backgrounds**: Beautiful gradient backgrounds for visual appeal
- **Glass Morphism**: Modern glass effects for cards and overlays
- **Status Indicators**: Color-coded badges and progress indicators
- **Interactive Elements**: Hover effects and smooth transitions
- **Professional Typography**: Clean, readable fonts with proper hierarchy

### 📱 Mobile-First Design
- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Mobile Cards**: Card-based layout for mobile devices
- **Touch-Friendly**: Large touch targets and spacing

### 🚀 Enhanced Features
- **Fuel Level Visualization**: Circular progress indicators
- **Map Integration**: Direct links to Google Maps
- **Copy to Clipboard**: Easy coordinate copying
- **Status Tracking**: Real-time vehicle status monitoring
- **Error Handling**: Graceful error states with retry options
- **Loading States**: Skeleton loaders and spinners

## 🛠 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **UI Components**: ShadCN UI
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 🚀 Getting Started

> **🌐 Quick Start**: [Try the live demo](https://vehicle-tracker-dashboard-alpha.vercel.app/) or follow the steps below to run locally.

### Prerequisites
- Node.js 18+ 
- npm or pnpm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/praditus343/Vehicle-Tracker-Dashboard.git
   cd vehicle-tracker-dashboard
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📱 Responsive Features

### Desktop (1024px+)
- 4-column grid for statistics cards
- Full table layout with all data visible
- Sidebar navigation ready
- Multi-column detail views

### Tablet (640px - 1024px)
- 2-column grid for statistics
- Responsive table with horizontal scroll
- Optimized spacing and typography

### Mobile (320px - 640px)
- Single column layout
- Card-based vehicle list (replaces table)
- Stacked statistics cards
- Touch-optimized buttons and controls
- Bottom navigation ready

## 🎨 Design Improvements

### Visual Enhancements
- **Gradient Backgrounds**: Blue-to-indigo gradients
- **Shadow System**: Consistent shadow depths
- **Border Radius**: Modern rounded corners
- **Color System**: Professional color palette
- **Typography Scale**: Responsive text sizing

### Interactive Elements
- **Hover Effects**: Subtle hover animations
- **Loading States**: Professional skeleton loaders
- **Transitions**: Smooth CSS transitions
- **Focus States**: Accessible focus indicators

### Mobile Optimizations
- **Card Layout**: Mobile-friendly card design instead of tables
- **Touch Targets**: 44px minimum touch areas
- **Readable Text**: Appropriate font sizes for mobile
- **Spacing**: Optimal padding and margins

## 📊 Features Implemented

✅ **Vehicle List Page**
- Responsive table/card layout
- Real-time status indicators
- Search and filter ready
- Pagination ready

✅ **Vehicle Detail Page**
- Comprehensive telemetry dashboard
- Interactive fuel gauge
- Google Maps integration
- Copy coordinates functionality

✅ **State Management**
- Zustand store with TypeScript
- Loading and error states
- Optimistic updates ready

✅ **UI Components**
- Professional ShadCN UI components
- Custom responsive layouts
- Accessible design patterns

✅ **Responsive Design**
- Mobile-first approach
- Flexible grid systems
- Adaptive typography

## 🔄 API Integration Ready

The application is structured to easily integrate with real APIs:

```typescript
// Replace mock data in store/vehicleStore.ts
const fetchVehicles = async () => {
  const response = await fetch('/api/vehicles');
  const vehicles = await response.json();
  return vehicles;
};
```

## 🚀 Deployment

### Live Application
The application is deployed and live at:
**🔗 [https://vehicle-tracker-dashboard-alpha.vercel.app/](https://vehicle-tracker-dashboard-alpha.vercel.app/)**

### Deployment Platform
- **Platform**: Vercel
- **Auto-Deploy**: Enabled from main branch
- **Environment**: Production
- **Build Command**: `pnpm build`
- **Output Directory**: `dist`

### Deploy Your Own
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/praditus343/Vehicle-Tracker-Dashboard)

1. **Fork this repository**
2. **Connect to Vercel**
3. **Deploy automatically**

## 📝 Next Steps

- [ ] Add real API integration
- [ ] Implement user authentication
- [ ] Add vehicle filtering and search
- [ ] Real-time WebSocket updates
- [ ] Add more vehicle metrics
- [ ] Implement dark mode
- [ ] Add data export functionality

---

**Status**: ✅ **All Requirements Met**
- React + TypeScript + Vite ✅
- TailwindCSS ✅
- Zustand State Management ✅
- ShadCN UI Components ✅
- Responsive Design ✅
- Vehicle List & Detail Pages ✅
- Loading & Error States ✅
- Professional UI/UX ✅