'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import GeneralSettings from './general-settings';
import AppearanceSettings from './appearance-settings';


export interface UserSettings {
  general: {
    name: string;
    email: string;
    bio: string;
    timezone: string;
  };
  appearance: {
    theme: string;
    density: string;
    accentColor: string;
  };
}

const defaultSettings: UserSettings = {
  general: {
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Project Manager with 5 years of experience.',
    timezone: 'utc-8',
  },
  appearance: {
    theme: 'dark',
    density: 'comfortable',
    accentColor: '#24d187',
  },
};

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);

        // Apply theme immediately on load
        applyTheme(parsedSettings.appearance.theme);

        // Apply density
        applyDensity(parsedSettings.appearance.density);

        // Apply accent color
        applyAccentColor(parsedSettings.appearance.accentColor);
      } catch (error) {
        console.error('Error parsing settings:', error);
      }
    }
  }, []);

  // Apply theme function
  const applyTheme = (theme: string) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else if (theme === 'system') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    }
  };

  // Apply density function
  const applyDensity = (density: string) => {
    document.documentElement.setAttribute('data-density', density);

    // Add classes to elements for density
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      card.classList.remove(
        'compact-card',
        'comfortable-card',
        'spacious-card'
      );
      card.classList.add(`${density}-card`);
    });

    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      button.classList.remove(
        'compact-button',
        'comfortable-button',
        'spacious-button'
      );
      button.classList.add(`${density}-button`);
    });

    const inputs = document.querySelectorAll('input, select');
    inputs.forEach((input) => {
      input.classList.remove(
        'compact-input',
        'comfortable-input',
        'spacious-input'
      );
      input.classList.add(`${density}-input`);
    });
  };

  // Apply accent color function
  const applyAccentColor = (color: string) => {
    document.documentElement.style.setProperty('--accent-color', color);

    // Update primary color variables to match accent color
    document.documentElement.style.setProperty(
      '--primary',
      getHslFromHex(color)
    );
  };

  // Convert hex to HSL for CSS variables
  const getHslFromHex = (hex: string): string => {
    // Remove the # if present
    const cleanHex = hex.charAt(0) === '#' ? hex.substring(1) : hex;
    
    // Convert hex to RGB
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
    
    // Find the min and max values to calculate the lightness
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    
    // Calculate lightness
    const l = (max + min) / 2;
    
    let h = 0;
    let s = 0;
    
    if (max !== min) {
      // Calculate saturation
      s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
      
      // Calculate hue
      if (max === r) {
        h = ((g - b) / (max - min)) + (g < b ? 6 : 0);
      } else if (max === g) {
        h = ((b - r) / (max - min)) + 2;
      } else {
        h = ((r - g) / (max - min)) + 4;
      }
      
      h *= 60; // Convert to degrees
    }
    
    // Format the HSL values for CSS
    // h is in degrees (0-360), s and l are percentages (0-100%)
    return `${h.toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
  };

  // Save settings to localStorage
  const saveSettings = (newSettings: UserSettings) => {
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
    setSettings(newSettings);
    toast({
      title: 'Settings saved',
      description: 'Your settings have been saved successfully.',
    });
  };

  // Update general settings
  const updateGeneralSettings = (generalSettings: typeof settings.general) => {
    const newSettings = {
      ...settings,
      general: generalSettings,
    };
    saveSettings(newSettings);
  };

  // Update appearance settings
  const updateAppearanceSettings = (
    key: keyof typeof settings.appearance,
    value: string
  ) => {
    const newSettings = {
      ...settings,
      appearance: {
        ...settings.appearance,
        [key]: value,
      },
    };

    setSettings(newSettings);

    // Apply changes immediately
    if (key === 'theme') {
      applyTheme(value);
    } else if (key === 'density') {
      applyDensity(value);
    } else if (key === 'accentColor') {
      applyAccentColor(value);
    }
  };

  // Save appearance settings
  const saveAppearanceSettings = () => {
    saveSettings(settings);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:inline-flex md:w-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <GeneralSettings
            settings={settings.general} 
            onSave={updateGeneralSettings} 
          />
        </TabsContent>

        <TabsContent value="appearance" className="mt-6">
          <AppearanceSettings
            settings={settings.appearance}
            updateSetting={updateAppearanceSettings}
            onSave={saveAppearanceSettings}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}