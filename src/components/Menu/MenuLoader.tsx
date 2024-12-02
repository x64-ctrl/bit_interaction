// src/components/Menu/MenuLoader.tsx
import React from 'react';
import menuConfig from '../../config/menus.json';
import Menu from './Menu';
import { CustomSubmenus } from './CustomSubmenu';

// Types
interface MenuItem {
  key: string;
  label: string;
  icon?: string;
  children?: MenuItem[];
  customSubmenu?: string;
  processedCustomSubmenu?: React.FC | undefined;
  type?: 'default' | 'custom';
}

interface MenuConfig {
  items: MenuItem[];
}

interface MenuConfigs {
  [key: string]: MenuConfig;
}

interface MenuLoaderProps {
  menuId: string;
}

export const MenuLoader: React.FC<MenuLoaderProps> = ({ menuId }) => {
  const config = (menuConfig as MenuConfigs)[menuId];

  if (!config) {
    console.error(`Menu configuration for "${menuId}" not found`);
    return null;
  }

  const processMenuItems = (items: MenuItem[]): MenuItem[] => {
    return items.map(item => ({
      ...item,
      processedCustomSubmenu: item.customSubmenu ? CustomSubmenus[item.customSubmenu] : undefined,
      // customSubmenu: item.customSubmenu ? CustomSubmenus[item.customSubmenu] : undefined,
      children: item.children ? processMenuItems(item.children) : undefined
    }));
  };

  try {
    return <Menu items={processMenuItems(config.items)} />;
  } catch (error) {
    console.error('Error processing menu items:', error);
    return null;
  }
};

export default MenuLoader;