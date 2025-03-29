'use client';

import { useState } from 'react';
import type { TeamMember } from 'types/types';

import { useToast } from '@/hooks/use-toast';
import { teamMembers as initialTeamMembers } from '../../services/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui';
import { AddMemberDialog } from './add-member-dialog';
import TeamMembersList from './team-members-list';
import PermissionsTab from './permissions-tab';


export default function Team() {
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: '',
  });

  // Add a new team member
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMember.name || !newMember.email || !newMember.role) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    const member: TeamMember = {
      id: `team-${Date.now()}`,
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      avatar: '/placeholder.svg?height=40&width=40',
    };

    setTeamMembers([...teamMembers, member]);
    setNewMember({ name: '', email: '', role: '' });
    setIsAddMemberOpen(false);

    toast({
      title: 'Team member added',
      description: `${member.name} has been added to the team.`,
    });
  };

  // Delete a team member
  const handleDeleteMember = (id: string) => {
    const memberToDelete = teamMembers.find((member) => member.id === id);

    if (memberToDelete) {
      setTeamMembers(teamMembers.filter((member) => member.id !== id));

      toast({
        title: 'Team member removed',
        description: `${memberToDelete.name} has been removed from the team.`,
      });
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Team</h1>

        <AddMemberDialog
          isOpen={isAddMemberOpen}
          setIsOpen={setIsAddMemberOpen}
          newMember={newMember}
          setNewMember={setNewMember}
          handleAddMember={handleAddMember}
        />
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:inline-flex md:w-auto">
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-6">
          <TeamMembersList
            teamMembers={teamMembers} 
            handleDeleteMember={handleDeleteMember} 
          />
        </TabsContent>

        <TabsContent value="permissions" className="mt-6">
          <PermissionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}