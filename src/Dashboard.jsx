import { Routes, Route } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'
import Stats from './Stats'
import Settings from './Settings'
import DashHome from './DashHome.jsx'

export default function Dashboard() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>  {/* Layout + sidebar */}
        <Route index element={<DashHome />} />             {/* /dashboard */}
        <Route path='dash-home' element={<DashHome/>}/>
        <Route path="stats" element={<Stats />} />     {/* /dashboard/stats */}
        <Route path="settings" element={<Settings />} /> {/* /dashboard/settings */}
      </Route>
    </Routes>
  );
} 