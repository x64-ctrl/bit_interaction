// src/components/Menu/Menu.tsx
import React, { useState, useEffect, useCallback } from 'react';
import MenuItem from './MenuItem';
import { MenuItemType } from './types';
import './Menu.css';

interface MenuProps {
  items: MenuItemType[];
}

export const Menu: React.FC<MenuProps> = ({ items }) => {
  const [focusedKey, setFocusedKey] = useState<string | null>(null);
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  // Flatten menu items for easier navigation
  const flattenItems = useCallback(() => {
    const flat: MenuItemType[] = [];
    const flatten = (items: MenuItemType[]) => {
      items.forEach(item => {
        flat.push(item);
        if (expandedKeys.has(item.key) && item.children) {
          flatten(item.children);
        }
      });
    };
    flatten(items);
    return flat;
  }, [items, expandedKeys]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const flatItems = flattenItems();
    const currentIndex = flatItems.findIndex(item => item.key === focusedKey);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < flatItems.length - 1) {
          setFocusedKey(flatItems[currentIndex + 1].key);
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) {
          setFocusedKey(flatItems[currentIndex - 1].key);
        }
        break;
        
      case 'Enter':
      case ' ':
        e.preventDefault();
        const currentItem = flatItems[currentIndex];
        if (currentItem) {
          if (currentItem.children?.length) {
            setExpandedKeys(prev => {
              const newSet = new Set(prev);
              if (newSet.has(currentItem.key)) {
                newSet.delete(currentItem.key);
              } else {
                newSet.add(currentItem.key);
              }
              return newSet;
            });
          } else {
            currentItem.onClick?.();
          }
        }
        break;
    }
  }, [focusedKey, flattenItems]);

  useEffect(() => {
    // Set initial focus to first item
    if (items.length && !focusedKey) {
      setFocusedKey(items[0].key);
    }
  }, [items]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

const renderMenuItem = (item: MenuItemType) => (
    <MenuItem
        key={item.key}
        item={item}
        isFocused={item.key === focusedKey}
        isExpanded={expandedKeys.has(item.key)}
        onToggle={() => {
            setExpandedKeys(prev => {
                const newSet = new Set(prev);
                if (newSet.has(item.key)) {
                    newSet.delete(item.key);
                } else {
                    newSet.add(item.key);
                }
                return newSet;
            });
        }}
        onClick={() => {
            setFocusedKey(item.key);
            item.onClick?.();
        }}
        focusedKey={focusedKey || undefined}
    />
);

// Update Menu.tsx return statement
return (
    <div className="menu-container">
      <nav className="menu" tabIndex={0}>
        <div className="menu-header">
          <h3>Menu</h3>
        </div>
        <ul className="menu-list">
          {items.map(renderMenuItem)}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;