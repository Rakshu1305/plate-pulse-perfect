
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { Plus, Edit, Trash2, Search, BarChart2 } from 'lucide-react';

// Mock data for staff
const staffInitialData = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Chef',
    status: 'Active',
    efficiency: 92,
    shiftsCompleted: 45,
    onTimePercentage: 97,
    performance: 'Excellent'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Waiter',
    status: 'Active',
    efficiency: 88,
    shiftsCompleted: 38,
    onTimePercentage: 95,
    performance: 'Good'
  },
  {
    id: 3,
    name: 'Michael Brown',
    role: 'Chef',
    status: 'Active',
    efficiency: 95,
    shiftsCompleted: 42,
    onTimePercentage: 98,
    performance: 'Excellent'
  },
  {
    id: 4,
    name: 'Emily Davis',
    role: 'Waiter',
    status: 'Active',
    efficiency: 87,
    shiftsCompleted: 40,
    onTimePercentage: 92,
    performance: 'Good'
  },
  {
    id: 5,
    name: 'David Wilson',
    role: 'Bartender',
    status: 'Active',
    efficiency: 90,
    shiftsCompleted: 36,
    onTimePercentage: 94,
    performance: 'Good'
  },
  {
    id: 6,
    name: 'Lisa Martinez',
    role: 'Host',
    status: 'On Leave',
    efficiency: 89,
    shiftsCompleted: 32,
    onTimePercentage: 96,
    performance: 'Good'
  },
];

const Staff = () => {
  const [staffData, setStaffData] = useState(staffInitialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [newStaff, setNewStaff] = useState({ name: '', role: 'Waiter' });
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddStaff = () => {
    if (newStaff.name) {
      const newStaffMember = {
        id: staffData.length + 1,
        name: newStaff.name,
        role: newStaff.role,
        status: 'Active',
        efficiency: 85,
        shiftsCompleted: 0,
        onTimePercentage: 100,
        performance: 'New'
      };
      
      setStaffData([...staffData, newStaffMember]);
      setNewStaff({ name: '', role: 'Waiter' });
      setOpenDialog(false);
      toast.success("Staff member added successfully");
    }
  };
  
  const handleDeleteStaff = (id: number) => {
    setStaffData(staffData.filter(staff => staff.id !== id));
    toast.success("Staff member removed successfully");
  };
  
  const filteredStaff = staffData.filter(staff => 
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    staff.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getPerformanceClass = (performance: string) => {
    switch (performance) {
      case 'Excellent':
        return 'bg-green-100 text-green-800';
      case 'Good':
        return 'bg-blue-100 text-blue-800';
      case 'Average':
        return 'bg-yellow-100 text-yellow-800';
      case 'Poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
          <p className="text-muted-foreground">Manage your restaurant staff and track their performance.</p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
              <DialogDescription>
                Enter the details of the new staff member to add them to your team.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                  value={newStaff.role} 
                  onValueChange={(value) => setNewStaff({ ...newStaff, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Chef">Chef</SelectItem>
                    <SelectItem value="Waiter">Waiter</SelectItem>
                    <SelectItem value="Bartender">Bartender</SelectItem>
                    <SelectItem value="Host">Host</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button onClick={handleAddStaff}>Add Staff</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or role..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <BarChart2 className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff List</CardTitle>
          <CardDescription>
            View and manage all staff members in your restaurant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Efficiency</TableHead>
                <TableHead>Shifts</TableHead>
                <TableHead>On Time %</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell className="font-medium">{staff.name}</TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusClass(staff.status)}>
                      {staff.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{staff.efficiency}%</TableCell>
                  <TableCell>{staff.shiftsCompleted}</TableCell>
                  <TableCell>{staff.onTimePercentage}%</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getPerformanceClass(staff.performance)}>
                      {staff.performance}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteStaff(staff.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Staff;
