import { Plus } from 'lucide-react';
import React from 'react';

import {
  Button,

  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui';

// AddMemberDialog Component
interface AddMemberDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  newMember: {
    name: string;
    email: string;
    role: string;
  };
  setNewMember: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    role: string;
  }>>;
  handleAddMember: (e: React.FormEvent) => void;
}

export function AddMemberDialog({
  isOpen,
  setIsOpen,
  newMember,
  setNewMember,
  handleAddMember,
}: AddMemberDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Add Team Member
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleAddMember}>
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription>
              Invite a new member to join your team.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter name"
                value={newMember.name}
                onChange={(e) =>
                  setNewMember({ ...newMember, name: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                value={newMember.email}
                onChange={(e) =>
                  setNewMember({ ...newMember, email: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={newMember.role}
                onValueChange={(value) =>
                  setNewMember({ ...newMember, role: value })
                }
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Project Manager">
                    Project Manager
                  </SelectItem>
                  <SelectItem value="UI/UX Designer">
                    UI/UX Designer
                  </SelectItem>
                  <SelectItem value="Frontend Developer">
                    Frontend Developer
                  </SelectItem>
                  <SelectItem value="Backend Developer">
                    Backend Developer
                  </SelectItem>
                  <SelectItem value="Full Stack Developer">
                    Full Stack Developer
                  </SelectItem>
                  <SelectItem value="QA Engineer">QA Engineer</SelectItem>
                  <SelectItem value="DevOps Engineer">
                    DevOps Engineer
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Send Invitation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}



