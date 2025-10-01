import { useState, useEffect, useCallback } from "react";
import { Trash2, Calendar as CalendarIcon, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTaskDates, getTasksByDate, toggleTaskCompletion, deleteTask, Task } from "@/lib/storage";
import { toast } from "@/hooks/use-toast";

interface TasksListProps {
  refresh?: number;
}

export const TasksList = ({ refresh }: TasksListProps) => {
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadDates = useCallback(async () => {
    try {
      const availableDates = await getTaskDates();
      setDates(availableDates);
      if (availableDates.length > 0 && !selectedDate) {
        setSelectedDate(availableDates[0]);
      }
    } catch (error) {
      console.error('Failed to load dates:', error);
      toast({
        title: "Error",
        description: "Failed to load dates",
        variant: "destructive",
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  useEffect(() => {
    loadDates();
  }, [loadDates, refresh]);

  const loadTasks = useCallback(async (date: string) => {
    try {
      const dateTasks = await getTasksByDate(date);
      setTasks(dateTasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
      toast({
        title: "Error",
        description: "Failed to load tasks",
        variant: "destructive",
      });
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      loadTasks(selectedDate);
    }
  }, [selectedDate, refresh, loadTasks]);


  const handleToggle = async (id: string) => {
    try {
      await toggleTaskCompletion(id);
      await loadTasks(selectedDate);
    } catch (error) {
      console.error('Failed to toggle task:', error);
      toast({
        title: "Error",
        description: "Failed to toggle task",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      await loadTasks(selectedDate);
      await loadDates();
      toast({
        title: "Deleted",
        description: "Task deleted successfully",
      });
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
    }
  };

  const formatDateDisplay = (dateStr: string) => {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("default", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <CalendarIcon className="h-5 w-5 text-muted-foreground" />
        <Select value={selectedDate} onValueChange={setSelectedDate}>
          <SelectTrigger className="w-full sm:w-[280px]">
            <SelectValue placeholder="Select date" />
          </SelectTrigger>
          <SelectContent>
            {dates.map((date) => (
              <SelectItem key={date} value={date}>
                {formatDateDisplay(date)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {tasks.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No tasks for this date
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <Card key={task._id} className={task.completed ? "opacity-60" : ""}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleToggle(task._id)}
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-1">
                    <p className={cn(
                      "font-medium",
                      task.completed && "line-through text-muted-foreground"
                    )}>
                      {task.name}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {task.time}
                      </span>
                      {task.completed && (
                        <span className="flex items-center gap-1 text-success">
                          <Check className="h-3 w-3" />
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(task._id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};
