// src/components/Menu/CustomSubmenus.tsx
import React from 'react';

// Example custom submenu components
const ReportsSubmenu: React.FC = () => (
  <div className="custom-submenu-content">
    <h4>Reports</h4>
    <div className="reports-grid">
      <button onClick={() => console.log('Sales report')}>Sales Report</button>
      <button onClick={() => console.log('Inventory report')}>Inventory Report</button>
      <button onClick={() => console.log('User report')}>User Report</button>
    </div>
  </div>
);

const SettingsSubmenu: React.FC = () => (
  <div className="custom-submenu-content">
    <h4>Settings</h4>
    <div className="settings-list">
      <label>
        Dark Mode
        <input type="checkbox" onChange={(e) => console.log('Dark mode:', e.target.checked)} />
      </label>
      <label>
        Notifications
        <input type="checkbox" onChange={(e) => console.log('Notifications:', e.target.checked)} />
      </label>
    </div>
  </div>
);

// Map of all available custom submenus
export const CustomSubmenus: Record<string, React.FC> = {
  ReportsSubmenu,
  SettingsSubmenu,
};

// Add styles to Menu.css