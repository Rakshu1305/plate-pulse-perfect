
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import { Search, Clock, Calendar, Eye } from 'lucide-react';

// Mock orders data
const ordersInitialData = [
  {
    id: '78943',
    table: '12',
    server: 'Sarah Johnson',
    items: [
      { name: 'Grilled Salmon', quantity: 2, price: 24.99 },
      { name: 'Caesar Salad', quantity: 1, price: 12.99 },
      { name: 'Fresh Lemonade', quantity: 2, price: 4.99 }
    ],
    status: 'Completed',
    startTime: '12:15 PM',
    endTime: '12:42 PM',
    totalTime: 27,
    expectedTime: 30,
    date: '2025-04-23',
    total: 72.95,
    discount: 0,
    onTime: true
  },
  {
    id: '78942',
    table: '8',
    server: 'Emily Davis',
    items: [
      { name: 'Chicken Alfredo', quantity: 1, price: 18.99 },
      { name: 'Beef Burger', quantity: 1, price: 16.99 },
      { name: 'Fresh Lemonade', quantity: 2, price: 4.99 }
    ],
    status: 'In Progress',
    startTime: '12:22 PM',
    endTime: null,
    totalTime: null,
    expectedTime: 25,
    date: '2025-04-23',
    total: 45.96,
    discount: 0,
    onTime: true
  },
  {
    id: '78941',
    table: '15',
    server: 'David Wilson',
    items: [
      { name: 'Beef Burger', quantity: 2, price: 16.99 },
      { name: 'Vegetable Curry', quantity: 1, price: 17.99 },
      { name: 'Caesar Salad', quantity: 1, price: 12.99 },
      { name: 'Chocolate Cake', quantity: 2, price: 9.99 }
    ],
    status: 'Completed',
    startTime: '11:48 AM',
    endTime: '12:21 PM',
    totalTime: 33,
    expectedTime: 30,
    date: '2025-04-23',
    total: 84.94,
    discount: 5,
    onTime: false
  },
  {
    id: '78940',
    table: '3',
    server: 'Sarah Johnson',
    items: [
      { name: 'Caesar Salad', quantity: 2, price: 12.99 },
      { name: 'Fresh Lemonade', quantity: 2, price: 4.99 }
    ],
    status: 'Completed',
    startTime: '11:30 AM',
    endTime: '11:45 AM',
    totalTime: 15,
    expectedTime: 15,
    date: '2025-04-23',
    total: 35.96,
    discount: 0,
    onTime: true
  },
  {
    id: '78939',
    table: '7',
    server: 'Emily Davis',
    items: [
      { name: 'Vegetable Curry', quantity: 1, price: 17.99 },
      { name: 'Chocolate Cake', quantity: 1, price: 9.99 },
      { name: 'Fresh Lemonade', quantity: 1, price: 4.99 }
    ],
    status: 'Completed',
    startTime: '11:15 AM',
    endTime: '11:42 AM',
    totalTime: 27,
    expectedTime: 22,
    date: '2025-04-23',
    total: 32.97,
    discount: 3,
    onTime: false
  }
];

const Orders = () => {
  const [orders, setOrders] = useState(ordersInitialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    const updatedOrders = orders.map(order => {
      if (order.id === id) {
        const endTime = newStatus === 'Completed' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;
        const totalTime = endTime ? Math.floor(Math.random() * 10) + 20 : null; // Simulate time calculation
        return { 
          ...order, 
          status: newStatus, 
          endTime, 
          totalTime,
          onTime: totalTime ? totalTime <= order.expectedTime : true
        };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    toast.success(`Order #${id} updated to "${newStatus}"`);
  };

  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.includes(searchTerm) || 
      order.table.includes(searchTerm) || 
      order.server.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (activeTab === 'all') {
      return matchesSearch;
    } else if (activeTab === 'inProgress') {
      return matchesSearch && order.status === 'In Progress';
    } else if (activeTab === 'completed') {
      return matchesSearch && order.status === 'Completed';
    }
    
    return matchesSearch;
  });
  
  const getTotalItems = (items: any[]) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTimeClass = (onTime: boolean, status: string) => {
    if (status !== 'Completed') return 'text-gray-500';
    return onTime ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
        <p className="text-muted-foreground">Track and manage restaurant orders and service times.</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders by ID, table, or server..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Calendar className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="inProgress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === 'all' ? 'All Orders' : 
                 activeTab === 'inProgress' ? 'In Progress Orders' : 'Completed Orders'}
              </CardTitle>
              <CardDescription>
                {activeTab === 'all' 
                  ? 'All orders placed in the restaurant.' 
                  : activeTab === 'inProgress' 
                  ? 'Orders currently being prepared.'
                  : 'Orders that have been completed.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Table</TableHead>
                    <TableHead>Server</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>Service Time</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{order.table}</TableCell>
                      <TableCell>{order.server}</TableCell>
                      <TableCell>{getTotalItems(order.items)} items</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusClass(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.startTime}</TableCell>
                      <TableCell className={getTimeClass(order.onTime, order.status)}>
                        {order.totalTime 
                          ? `${order.totalTime} min ${order.onTime ? '✓' : '⚠️'}` 
                          : <Clock className="h-4 w-4 text-yellow-500" />}
                      </TableCell>
                      <TableCell>
                        ${order.total.toFixed(2)}
                        {order.discount > 0 && (
                          <span className="text-xs text-red-500 block">-${order.discount.toFixed(2)} off</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => viewOrderDetails(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {order.status !== 'Completed' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateStatus(order.id, 'Completed')}
                            >
                              Complete
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredOrders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                        No orders found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedOrder && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Order #{selectedOrder.id} Details</DialogTitle>
              <DialogDescription>
                Table {selectedOrder.table} • {selectedOrder.date} • Server: {selectedOrder.server}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <Badge variant="outline" className={getStatusClass(selectedOrder.status)}>
                    {selectedOrder.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedOrder.startTime} - {selectedOrder.endTime || 'In Progress'}
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-sm">Order Items</h4>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex justify-between border-t pt-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Service Time</p>
                    <p className={`font-medium ${getTimeClass(selectedOrder.onTime, selectedOrder.status)}`}>
                      {selectedOrder.totalTime 
                        ? `${selectedOrder.totalTime} min (${selectedOrder.onTime ? 'On time' : 'Delayed'})` 
                        : 'In Progress'}
                    </p>
                    <p className="text-sm text-muted-foreground">Expected: {selectedOrder.expectedTime} min</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-sm text-muted-foreground">Subtotal</p>
                    <p className="font-medium">${selectedOrder.total.toFixed(2)}</p>
                    {selectedOrder.discount > 0 && (
                      <>
                        <p className="text-sm text-red-500">Delay Discount: -${selectedOrder.discount.toFixed(2)}</p>
                        <p className="text-sm font-semibold">Final: ${(selectedOrder.total - selectedOrder.discount).toFixed(2)}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenDialog(false)}>Close</Button>
              {selectedOrder.status !== 'Completed' && (
                <Button onClick={() => {
                  handleUpdateStatus(selectedOrder.id, 'Completed');
                  setOpenDialog(false);
                }}>
                  Mark as Completed
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Orders;
