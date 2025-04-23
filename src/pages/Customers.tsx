
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { Plus, Edit, Trash2, Search, Phone, Mail } from 'lucide-react';

// Mock customers data
const customersInitialData = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    phone: '555-123-4567',
    visits: 12,
    lastVisit: '2025-04-20',
    totalSpent: 348.75,
    status: 'Regular',
    preferences: 'Vegetarian, Window seat'
  },
  {
    id: 2,
    name: 'Robert Smith',
    email: 'robert.smith@example.com',
    phone: '555-234-5678',
    visits: 8,
    lastVisit: '2025-04-18',
    totalSpent: 267.30,
    status: 'Regular',
    preferences: 'Allergic to nuts'
  },
  {
    id: 3,
    name: 'Emma Davis',
    email: 'emma.d@example.com',
    phone: '555-345-6789',
    visits: 3,
    lastVisit: '2025-04-15',
    totalSpent: 112.45,
    status: 'New',
    preferences: 'Booth seating preferred'
  },
  {
    id: 4,
    name: 'James Wilson',
    email: 'jwilson@example.com',
    phone: '555-456-7890',
    visits: 20,
    lastVisit: '2025-04-22',
    totalSpent: 587.90,
    status: 'VIP',
    preferences: 'Wine enthusiast, Prefers quiet corner'
  },
  {
    id: 5,
    name: 'Sophia Martinez',
    email: 'sophia.m@example.com',
    phone: '555-567-8901',
    visits: 6,
    lastVisit: '2025-04-10',
    totalSpent: 198.65,
    status: 'Regular',
    preferences: 'Gluten-free options needed'
  },
  {
    id: 6,
    name: 'Daniel Brown',
    email: 'daniel.b@example.com',
    phone: '555-678-9012',
    visits: 15,
    lastVisit: '2025-04-21',
    totalSpent: 423.10,
    status: 'VIP',
    preferences: 'Seafood lover, Birthday: June 15'
  }
];

const Customers = () => {
  const [customers, setCustomers] = useState(customersInitialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    preferences: ''
  });
  
  const handleAddCustomer = () => {
    if (newCustomer.name && newCustomer.email) {
      const customer = {
        id: customers.length + 1,
        name: newCustomer.name,
        email: newCustomer.email,
        phone: newCustomer.phone,
        visits: 0,
        lastVisit: '',
        totalSpent: 0,
        status: 'New',
        preferences: newCustomer.preferences
      };
      
      setCustomers([...customers, customer]);
      setNewCustomer({
        name: '',
        email: '',
        phone: '',
        preferences: ''
      });
      setOpenDialog(false);
      toast.success("Customer added successfully");
    } else {
      toast.error("Please enter name and email");
    }
  };
  
  const handleEditCustomer = () => {
    if (selectedCustomer && selectedCustomer.name && selectedCustomer.email) {
      const updatedCustomers = customers.map(customer => 
        customer.id === selectedCustomer.id ? selectedCustomer : customer
      );
      
      setCustomers(updatedCustomers);
      setOpenDialog(false);
      toast.success("Customer updated successfully");
    } else {
      toast.error("Please enter name and email");
    }
  };
  
  const openEditDialog = (customer: any) => {
    setDialogMode('edit');
    setSelectedCustomer(customer);
    setOpenDialog(true);
  };
  
  const openAddDialog = () => {
    setDialogMode('add');
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      preferences: ''
    });
    setOpenDialog(true);
  };
  
  const handleDeleteCustomer = (id: number) => {
    setCustomers(customers.filter(customer => customer.id !== id));
    toast.success("Customer removed successfully");
  };
  
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'VIP':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">{status}</Badge>;
      case 'Regular':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{status}</Badge>;
      case 'New':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Management</h1>
          <p className="text-muted-foreground">Manage customer data and track dining history.</p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dialogMode === 'add' ? 'Add New Customer' : 'Edit Customer'}</DialogTitle>
              <DialogDescription>
                {dialogMode === 'add' 
                  ? 'Enter the details for the new customer.' 
                  : 'Update the customer information.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={dialogMode === 'add' ? newCustomer.name : selectedCustomer?.name || ''}
                  onChange={(e) => dialogMode === 'add' 
                    ? setNewCustomer({ ...newCustomer, name: e.target.value }) 
                    : setSelectedCustomer({ ...selectedCustomer, name: e.target.value })
                  }
                  placeholder="John Doe"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={dialogMode === 'add' ? newCustomer.email : selectedCustomer?.email || ''}
                  onChange={(e) => dialogMode === 'add' 
                    ? setNewCustomer({ ...newCustomer, email: e.target.value }) 
                    : setSelectedCustomer({ ...selectedCustomer, email: e.target.value })
                  }
                  placeholder="john.doe@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={dialogMode === 'add' ? newCustomer.phone : selectedCustomer?.phone || ''}
                  onChange={(e) => dialogMode === 'add' 
                    ? setNewCustomer({ ...newCustomer, phone: e.target.value }) 
                    : setSelectedCustomer({ ...selectedCustomer, phone: e.target.value })
                  }
                  placeholder="555-123-4567"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="preferences">Preferences/Notes</Label>
                <Input
                  id="preferences"
                  value={dialogMode === 'add' ? newCustomer.preferences : selectedCustomer?.preferences || ''}
                  onChange={(e) => dialogMode === 'add' 
                    ? setNewCustomer({ ...newCustomer, preferences: e.target.value }) 
                    : setSelectedCustomer({ ...selectedCustomer, preferences: e.target.value })
                  }
                  placeholder="Dietary restrictions, seating preferences, etc."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button onClick={dialogMode === 'add' ? handleAddCustomer : handleEditCustomer}>
                {dialogMode === 'add' ? 'Add Customer' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers by name, email, or phone..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>View and manage customer information and dining history.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Visits</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Preferences</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col text-sm">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          {customer.email}
                        </span>
                        {customer.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            {customer.phone}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(customer.status)}</TableCell>
                    <TableCell>{customer.visits}</TableCell>
                    <TableCell>{customer.lastVisit || 'N/A'}</TableCell>
                    <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate" title={customer.preferences}>
                        {customer.preferences || 'None recorded'}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openEditDialog(customer)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteCustomer(customer.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                    No customers found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;
