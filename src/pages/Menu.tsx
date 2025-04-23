
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { Plus, Edit, Trash2, Search, Star } from 'lucide-react';

// Mock menu categories
const categories = ["Appetizers", "Main Course", "Desserts", "Beverages", "Specials"];

// Mock menu data
const menuInitialData = [
  {
    id: 1,
    name: 'Grilled Salmon',
    category: 'Main Course',
    price: 24.99,
    prepTime: 20,
    rating: 4.8,
    orders: 128,
    status: 'Available',
    description: 'Fresh salmon fillet grilled to perfection with lemon and herbs.'
  },
  {
    id: 2,
    name: 'Chicken Alfredo',
    category: 'Main Course',
    price: 18.99,
    prepTime: 18,
    rating: 4.6,
    orders: 96,
    status: 'Available',
    description: 'Fettuccine pasta with creamy Alfredo sauce and grilled chicken breast.'
  },
  {
    id: 3,
    name: 'Caesar Salad',
    category: 'Appetizers',
    price: 12.99,
    prepTime: 10,
    rating: 4.3,
    orders: 62,
    status: 'Available',
    description: 'Romaine lettuce with Caesar dressing, croutons, and parmesan cheese.'
  },
  {
    id: 4,
    name: 'Chocolate Cake',
    category: 'Desserts',
    price: 9.99,
    prepTime: 5,
    rating: 4.9,
    orders: 73,
    status: 'Available',
    description: 'Rich chocolate cake with a molten center, served with vanilla ice cream.'
  },
  {
    id: 5,
    name: 'Beef Burger',
    category: 'Main Course',
    price: 16.99,
    prepTime: 15,
    rating: 4.7,
    orders: 145,
    status: 'Available',
    description: 'Juicy beef patty with lettuce, tomato, cheese, and special sauce on a brioche bun.'
  },
  {
    id: 6,
    name: 'Seasonal Fruit Sorbet',
    category: 'Desserts',
    price: 8.99,
    prepTime: 5,
    rating: 4.5,
    orders: 48,
    status: 'Seasonal',
    description: 'Refreshing sorbet made with seasonal fruits, perfect for a light dessert.'
  },
  {
    id: 7,
    name: 'Vegetable Curry',
    category: 'Main Course',
    price: 17.99,
    prepTime: 22,
    rating: 4.5,
    orders: 76,
    status: 'Available',
    description: 'Assorted vegetables in a flavorful curry sauce served with basmati rice.'
  },
  {
    id: 8,
    name: 'Fresh Lemonade',
    category: 'Beverages',
    price: 4.99,
    prepTime: 3,
    rating: 4.4,
    orders: 112,
    status: 'Available',
    description: 'Freshly squeezed lemonade with a hint of mint.'
  }
];

const Menu = () => {
  const [menuItems, setMenuItems] = useState(menuInitialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openDialog, setOpenDialog] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Main Course',
    price: '',
    prepTime: '',
    description: ''
  });
  
  const handleAddItem = () => {
    if (newItem.name && newItem.price && newItem.prepTime) {
      const newMenuItem = {
        id: menuItems.length + 1,
        name: newItem.name,
        category: newItem.category,
        price: parseFloat(newItem.price),
        prepTime: parseInt(newItem.prepTime),
        rating: 0,
        orders: 0,
        status: 'Available',
        description: newItem.description
      };
      
      setMenuItems([...menuItems, newMenuItem]);
      setNewItem({
        name: '',
        category: 'Main Course',
        price: '',
        prepTime: '',
        description: ''
      });
      setOpenDialog(false);
      toast.success("Menu item added successfully");
    } else {
      toast.error("Please fill in all required fields");
    }
  };
  
  const handleDeleteItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    toast.success("Menu item removed successfully");
  };
  
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Seasonal':
        return 'bg-blue-100 text-blue-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Menu Management</h1>
          <p className="text-muted-foreground">Manage your restaurant menu items and track their performance.</p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
              <DialogDescription>
                Enter the details of the new menu item.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Item Name</Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="Pasta Carbonara"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newItem.category} 
                    onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    placeholder="19.99"
                    type="number"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="prepTime">Preparation Time (minutes)</Label>
                <Input
                  id="prepTime"
                  value={newItem.prepTime}
                  onChange={(e) => setNewItem({ ...newItem, prepTime: e.target.value })}
                  placeholder="15"
                  type="number"
                  min="1"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Enter a description of the menu item"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button onClick={handleAddItem}>Add Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search menu items..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="All" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:w-auto">
          <TabsTrigger value="All">All</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeCategory} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{activeCategory === 'All' ? 'All Menu Items' : activeCategory}</CardTitle>
              <CardDescription>
                {activeCategory === 'All' 
                  ? 'All items in your restaurant menu.' 
                  : `Items in the ${activeCategory} category.`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Prep Time</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>{item.prepTime} min</TableCell>
                        <TableCell className="flex items-center">
                          {item.rating > 0 ? item.rating.toFixed(1) : 'N/A'} 
                          {item.rating > 0 && <Star className="h-3 w-3 text-yellow-400 ml-1" />}
                        </TableCell>
                        <TableCell>{item.orders}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusClass(item.status)}>
                            {item.status}
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
                              onClick={() => handleDeleteItem(item.id)}
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
                        No menu items found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Menu;
