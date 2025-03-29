import React from 'react';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui';
import { UserSettings } from './settings';

interface AppearanceSettingsProps {
  settings: UserSettings['appearance'];
  updateSetting: (key: keyof UserSettings['appearance'], value: string) => void;
  onSave: () => void;
}

export default function AppearanceSettings({
  settings,
  updateSetting,
  onSave,
}: AppearanceSettingsProps) {
  // Handle appearance settings save
  const handleAppearanceSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  // Set accent color
  const setAccentColor = (color: string) => {
    updateSetting('accentColor', color);
  };

  return (
    <Card className="card">
      <form onSubmit={handleAppearanceSave}>
        <CardHeader className="card-header">
          <CardTitle>Appearance Settings</CardTitle>
          <CardDescription>
            Customize the look and feel of your workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="card-content space-y-6">
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select
              value={settings.theme}
              onValueChange={(value) => updateSetting('theme', value)}
            >
              <SelectTrigger id="theme" className="select">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="density">Interface Density</Label>
            <Select
              value={settings.density}
              onValueChange={(value) => updateSetting('density', value)}
            >
              <SelectTrigger id="density" className="select">
                <SelectValue placeholder="Select density" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="comfortable">Comfortable</SelectItem>
                <SelectItem value="spacious">Spacious</SelectItem>
              </SelectContent>
            </Select>
            <p className="mt-1 text-xs text-muted-foreground">
              Changes the spacing between elements throughout the application.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accent-color">Accent Color</Label>
            <div className="grid grid-cols-6 gap-2">
              {[
                  '#24d187', // Green
                '#3b82f6', // Blue
                '#f59e0b', // Amber
                '#ef4444', // Red
                '#8b5cf6', // Purple
                '#ec4899', // Pink
              ].map((color) => (
                <div
                  key={color}
                  className={`h-8 w-8 cursor-pointer rounded-full border-2 ${
                    color === settings.accentColor
                      ? 'border-white'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setAccentColor(color)}
                />
              ))}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Changes the primary color used throughout the application.
            </p>
          </div>
        </CardContent>
        <CardFooter className="card-footer">
          <Button type="submit" className="button">
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
