import { Label } from '../ui';

interface RolePermissionsProps {
  role: string;
  permissions: Array<{
    id: string;
    label: string;
    defaultChecked: boolean;
  }>;
}

export function RolePermissions({ role, permissions }: RolePermissionsProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">{role}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {permissions.map((permission) => (
          <div key={permission.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={permission.id}
              className="rounded border-gray-400"
              defaultChecked={permission.defaultChecked}
            />
            <Label htmlFor={permission.id}>{permission.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}
