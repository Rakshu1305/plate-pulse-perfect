
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock data for dashboard
const performanceData = [
  {
    name: 'Mon',
    orderTime: 24,
    serviceTime: 18,
  },
  {
    name: 'Tue',
    orderTime: 22,
    serviceTime: 20,
  },
  {
    name: 'Wed',
    orderTime: 32,
    serviceTime: 22,
  },
  {
    name: 'Thu',
    orderTime: 26,
    serviceTime: 17,
  },
  {
    name: 'Fri',
    orderTime: 35,
    serviceTime: 25,
  },
  {
    name: 'Sat',
    orderTime: 42,
    serviceTime: 32,
  },
  {
    name: 'Sun',
    orderTime: 38,
    serviceTime: 27,
  },
];

const menuPerformanceData = [
  { name: 'Grilled Salmon', rating: 4.8, orders: 128, value: 4.8 },
  { name: 'Chicken Alfredo', rating: 4.6, orders: 96, value: 4.6 },
  { name: 'Beef Burger', rating: 4.7, orders: 145, value: 4.7 },
  { name: 'Vegetable Curry', rating: 4.5, orders: 76, value: 4.5 },
  { name: 'Caesar Salad', rating: 4.3, orders: 62, value: 4.3 },
];

const staffData = [
  { name: 'John', efficiency: 92 },
  { name: 'Sarah', efficiency: 88 },
  { name: 'Michael', efficiency: 95 },
  { name: 'Emily', efficiency: 87 },
  { name: 'David', efficiency: 90 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Restaurant performance overview and analytics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">854</div>
            <p className="text-xs text-muted-foreground">+8.2% from last week</p>
            <Progress value={82} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Service Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22 min</div>
            <p className="text-xs text-muted-foreground">-2.3% from last week</p>
            <Progress value={68} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Staff Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90%</div>
            <p className="text-xs text-muted-foreground">+3.1% from last week</p>
            <Progress value={90} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7</div>
            <p className="text-xs text-muted-foreground">+0.2 from last week</p>
            <Progress value={94} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Service Performance</TabsTrigger>
          <TabsTrigger value="menu">Menu Analysis</TabsTrigger>
          <TabsTrigger value="staff">Staff Efficiency</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Times</CardTitle>
              <CardDescription>Average order preparation and service times over the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{
                      top: 5,
                      right: 20,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="orderTime" name="Order Time (min)" stroke="#0ea5e9" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="serviceTime" name="Service Time (min)" stroke="#6366f1" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="menu" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Menu Performance</CardTitle>
              <CardDescription>Top performing menu items by customer ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={menuPerformanceData}
                    margin={{
                      top: 5,
                      right: 20,
                      left: 0,
                      bottom: 25,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Rating" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="staff" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Staff Efficiency</CardTitle>
              <CardDescription>Efficiency percentage by staff member</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={staffData}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 20,
                      left: 50,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="efficiency" name="Efficiency %" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders in your restaurant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: '78943', table: '12', time: '12:34 PM', status: 'Completed', amount: '$64.50' },
                { id: '78942', table: '8', time: '12:18 PM', status: 'In Progress', amount: '$42.75' },
                { id: '78941', table: '15', time: '11:47 AM', status: 'Completed', amount: '$89.20' },
                { id: '78940', table: '3', time: '11:32 AM', status: 'Completed', amount: '$36.90' },
              ].map((order) => (
                <div key={order.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">Table {order.table} • {order.time}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm ${
                      order.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'
                    }`}>
                      {order.status}
                    </p>
                    <p className="font-medium">{order.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kitchen Status</CardTitle>
            <CardDescription>Current kitchen preparation status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { dish: 'Grilled Salmon', table: '6', chef: 'Michael', timeRemaining: '4:20', onTime: true },
                { dish: 'Caesar Salad', table: '9', chef: 'Emily', timeRemaining: '1:45', onTime: true },
                { dish: 'Beef Burger', table: '14', chef: 'David', timeRemaining: '6:30', onTime: false },
                { dish: 'Chicken Alfredo', table: '8', chef: 'Sarah', timeRemaining: '5:10', onTime: true },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{item.dish}</p>
                    <p className="text-sm text-muted-foreground">Table {item.table} • Chef: {item.chef}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      item.onTime ? 'text-green-500' : 'text-yellow-500'
                    }`}>
                      {item.timeRemaining}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.onTime ? 'On time' : 'Delayed'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
