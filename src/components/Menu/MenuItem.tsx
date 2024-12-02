// MenuItem.tsx
import React from 'react';
import { MenuItemType } from './types';

interface MenuItemProps {
  item: MenuItemType;
  isFocused: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onClick: () => void;
  focusedKey?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  isFocused,
  isExpanded,
  onToggle,
  onClick,
  focusedKey,
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const hasCustomSubmenu = !!item.customSubmenu;

  const handleClick = () => {
    onClick();
    if (hasChildren || hasCustomSubmenu) {
      onToggle();
    }
  };

  return (
    <li className={`menu-item ${isFocused ? 'menu-item-focused' : ''}`}>
      <div 
        className="menu-item-content"
        onClick={handleClick}
        role="menuitem"
        aria-expanded={isExpanded}
      >
        {item.icon && <span className="menu-item-icon">{item.icon}</span>}
        <span className="menu-item-label">{item.label}</span>
        {(hasChildren || hasCustomSubmenu) && (
          <span className="menu-arrow">{isExpanded ? '▼' : '▶'}</span>
        )}
      </div>
      
      {isExpanded && (
        <>
          {hasCustomSubmenu && (
            <div className="custom-submenu">
              {item.customSubmenu}
            </div>
          )}
          
          {hasChildren && (
            <ul className="submenu">
              {item.children?.map(child => (
                <MenuItem
                  key={child.key}
                  item={child}
                  isFocused={child.key === focusedKey}
                  isExpanded={false}
                  onToggle={onToggle}
                  onClick={onClick}
                  focusedKey={focusedKey}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </li>
  );
};

export default MenuItem;