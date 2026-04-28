import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import './ThemeShowcase.css';

const paletteSections = [
  {
    title: 'Primary Colors',
    colors: [
      { label: 'Primary', variable: '--primary' },
      { label: 'Secondary', variable: '--secondary' },
    ],
  },
  {
    title: 'Status Colors',
    colors: [
      { label: 'Danger', variable: '--danger' },
      { label: 'Warning', variable: '--warning' },
      { label: 'Success', variable: '--success' },
      { label: 'Info', variable: '--info' },
    ],
  },
  {
    title: 'Backgrounds & Text',
    colors: [
      { label: 'Background', variable: '--bg-primary' },
      { label: 'Surface', variable: '--surface' },
      { label: 'Text Primary', variable: '--text-primary' },
      { label: 'Text Secondary', variable: '--text-secondary' },
    ],
  },
];

export const ThemeShowcase = () => {
  const { theme } = useTheme();

  return (
    <div className="theme-showcase">
      <div className="showcase-header">
        <h1>🎨 Professional Theme Showcase</h1>
        <div className="showcase-controls">
          <p>Current Mode: <strong>{theme === 'light' ? '☀️ Light' : '🌙 Dark'}</strong></p>
          <ThemeSwitcher />
        </div>
      </div>

      {/* Color Palette Section */}
      <section className="showcase-section">
        <h2>Color Palette</h2>

        {paletteSections.map((section) => (
          <div className="color-group" key={section.title}>
            <h3>{section.title}</h3>
            <div className="color-grid">
              {section.colors.map((color) => (
                <ColorCard key={color.variable} label={color.label} variable={color.variable} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Components Section */}
      <section className="showcase-section">
        <h2>Components</h2>

        <div className="component-group">
          <h3>Buttons</h3>
          <div className="component-demo">
            <button className="btn btn-primary">Primary Button</button>
            <button className="btn btn-secondary">Secondary Button</button>
            <button className="btn btn-danger">Danger Button</button>
            <button className="btn btn-ghost">Ghost Button</button>
          </div>
        </div>

        <div className="component-group">
          <h3>Cards</h3>
          <div className="component-demo">
            <div className="card">
              <h4>Card Title</h4>
              <p>This is a card component with the theme colors. It has a border, surface color, and shadow.</p>
              <button className="btn btn-primary">Action</button>
            </div>
          </div>
        </div>

        <div className="component-group">
          <h3>Form Elements</h3>
          <div className="component-demo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" className="form-input" placeholder="Text input" />
              <textarea className="form-textarea" placeholder="Textarea" rows="3"></textarea>
              <select className="form-select">
                <option>Select option</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>
          </div>
        </div>

        <div className="component-group">
          <h3>Badges</h3>
          <div className="component-demo" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-primary">Primary</span>
            <span className="badge badge-secondary">Secondary</span>
            <span className="badge badge-danger">Danger</span>
            <span className="badge badge-warning">Warning</span>
            <span className="badge badge-success">Success</span>
          </div>
        </div>

        <div className="component-group">
          <h3>Alerts</h3>
          <div className="component-demo" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="alert alert-info">ℹ️ This is an informational alert</div>
            <div className="alert alert-success">✓ This is a success alert</div>
            <div className="alert alert-warning">⚠️ This is a warning alert</div>
            <div className="alert alert-danger">✕ This is a danger alert</div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ColorCard = ({ label, variable }) => {
  return (
    <div className="color-swatch">
      <div className="color-box" style={{ backgroundColor: `var(${variable})` }}></div>
      <p className="color-label">{label}</p>
      <p className="color-token">{variable}</p>
    </div>
  );
};
