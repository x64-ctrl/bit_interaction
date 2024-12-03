# Vue-Style Menu Component WIP

A customizable React menu component with Vue.js-inspired styling. Built with TypeScript and Vite.

## Features
- 📱 Responsive menu layout
- 🎨 Vue.js-inspired design
- ⌨️ Keyboard navigation support
- 🔧 JSON-based configuration
- 📦 Custom submenu support
- 🎯 TypeScript support

## Installation

## Usage
1. Configure your menu in menus.json:

```json
{
  "mainMenu": {
    "items": [
      {
        "key": "dashboard",
        "label": "Dashboard"
      }
    ]
  }
}
```

2. Import and use the MenuLoader

```ts
import { MenuLoader } from './components/Menu/MenuLoader';

function App() {
  return <MenuLoader menuId="mainMenu" />;
}
```

## Customization
### Custom Submenus
Create custom submenus components in ```CustomSubmenus.tsx```

```ts
const CustomSubmenu: React.FC = () => (
  <div className="custom-submenu-content">
    // Your custom content
  </div>
);
```

## Styling
Modify variables in ```Menu.css```

```css
:root {
  --vue-green: #42b883;
  --vue-dark: #34495e;
}
```

## Contributing
Feel free to submit issues and pull requests.