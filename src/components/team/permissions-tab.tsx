import { Card, CardContent,
    CardDescription,
    CardHeader,
    CardTitle, } from '../ui';
import { RolePermissions } from './role-permissions';


export default function PermissionsTab() {
  const rolePermissions = [
    {
      role: 'Project Manager',
      permissions: [
        { id: 'pm-create', label: 'Create Projects', defaultChecked: true },
        { id: 'pm-edit', label: 'Edit Projects', defaultChecked: true },
        { id: 'pm-delete', label: 'Delete Projects', defaultChecked: true },
        { id: 'pm-invite', label: 'Invite Team Members', defaultChecked: true },
      ],
    },
    {
      role: 'Developer',
      permissions: [
        { id: 'dev-create', label: 'Create Tasks', defaultChecked: true },
        { id: 'dev-edit', label: 'Edit Tasks', defaultChecked: true },
        { id: 'dev-delete', label: 'Delete Tasks', defaultChecked: false },
        {
          id: 'dev-invite',
          label: 'Invite Team Members',
          defaultChecked: false,
        },
      ],
    },
    {
      role: 'Designer',
      permissions: [
        { id: 'des-create', label: 'Create Tasks', defaultChecked: true },
        { id: 'des-edit', label: 'Edit Tasks', defaultChecked: true },
        { id: 'des-delete', label: 'Delete Tasks', defaultChecked: false },
        {
          id: 'des-invite',
          label: 'Invite Team Members',
          defaultChecked: false,
        },
      ],
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Permissions</CardTitle>
        <CardDescription>
          Configure permissions for different roles in your team.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {rolePermissions.map((rolePermission) => (
            <RolePermissions
              key={rolePermission.role}
              role={rolePermission.role}
              permissions={rolePermission.permissions}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
