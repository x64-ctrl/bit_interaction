// types.ts
export interface MenuItemType {
    key: string;
    label: string;
    icon?: React.ReactNode;
    children?: MenuItemType[];
    onClick?: () => void;
    customSubmenu?: React.ReactNode; // Add this for custom submenu content
  }