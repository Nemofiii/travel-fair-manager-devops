import { useState } from "react";
import { FileText, ListTodo } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TravelRecordForm } from "@/components/TravelRecordForm";
import { MonthlyRecordsList } from "@/components/MonthlyRecordsList";
import { TaskForm } from "@/components/TaskForm";
import { TasksList } from "@/components/TasksList";

const Index = () => {
  const [recordsRefresh, setRecordsRefresh] = useState(0);
  const [tasksRefresh, setTasksRefresh] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        <header className="text-center space-y-2 pt-6">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">Travel Fare Manager</h1>
          <p className="text-muted-foreground">Track your travels and manage daily tasks</p>
        </header>

        <Tabs defaultValue="records" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="records" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Records
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <ListTodo className="h-4 w-4" />
              Tasks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Travel Record</CardTitle>
                <CardDescription>Record your daily travel information</CardDescription>
              </CardHeader>
              <CardContent>
                <TravelRecordForm onSuccess={() => setRecordsRefresh(prev => prev + 1)} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Records</CardTitle>
                <CardDescription>View and export your travel history</CardDescription>
              </CardHeader>
              <CardContent>
                <MonthlyRecordsList refresh={recordsRefresh} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Task</CardTitle>
                <CardDescription>Schedule tasks for specific dates</CardDescription>
              </CardHeader>
              <CardContent>
                <TaskForm onSuccess={() => setTasksRefresh(prev => prev + 1)} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Tasks</CardTitle>
                <CardDescription>View and manage your scheduled tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <TasksList refresh={tasksRefresh} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
