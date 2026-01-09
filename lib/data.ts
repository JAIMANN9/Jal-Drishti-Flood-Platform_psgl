export interface ZoneData {
  id: string;
  name: string;
  risk: 'High' | 'Med' | 'Low';
  complaints: number;
  pumpDeficit: number;
  rainfall: number;
  status: 'Critical' | 'Warning' | 'Stable';
}

export const MCD_ZONES: ZoneData[] = [
  { id: '1', name: 'Central', risk: 'High', complaints: 12, pumpDeficit: 3, rainfall: 32, status: 'Critical' },
  { id: '2', name: 'City-SP', risk: 'Med', complaints: 5, pumpDeficit: 0, rainfall: 18, status: 'Stable' },
  { id: '3', name: 'Civil Lines', risk: 'High', complaints: 8, pumpDeficit: 2, rainfall: 28, status: 'Warning' },
  { id: '4', name: 'Karol Bagh', risk: 'Low', complaints: 2, pumpDeficit: 0, rainfall: 12, status: 'Stable' },
  { id: '5', name: 'Keshav Puram', risk: 'Med', complaints: 4, pumpDeficit: 1, rainfall: 22, status: 'Stable' },
  { id: '6', name: 'Najafgarh', risk: 'High', complaints: 15, pumpDeficit: 5, rainfall: 45, status: 'Critical' },
  { id: '7', name: 'Narela', risk: 'Low', complaints: 1, pumpDeficit: 0, rainfall: 10, status: 'Stable' },
  { id: '8', name: 'North Shahdara', risk: 'Med', complaints: 6, pumpDeficit: 1, rainfall: 24, status: 'Warning' },
  { id: '9', name: 'Rohini', risk: 'High', complaints: 10, pumpDeficit: 2, rainfall: 30, status: 'Critical' },
  { id: '10', name: 'South Shahdara', risk: 'Med', complaints: 7, pumpDeficit: 0, rainfall: 20, status: 'Stable' },
  { id: '11', name: 'South', risk: 'Low', complaints: 3, pumpDeficit: 0, rainfall: 15, status: 'Stable' },
  { id: '12', name: 'West', risk: 'High', complaints: 9, pumpDeficit: 2, rainfall: 29, status: 'Warning' },
];

export const DASHBOARD_METRICS = {
  activeHotspots: 48,
  hotspotTrend: '+12%',
  rainfallIntensity: 35,
  rainfallThreshold: 25,
  pumpCapacity: 82,
  pumpsDeployed: 850,
  totalPumps: 900,
  fieldStaff: 1240,
  staffStatus: 'Active'
};
