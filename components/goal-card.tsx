'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export function GoalCard({ goal, onUpdate }: { goal: any; onUpdate: () => void }) {
    const [newTask, setNewTask] = useState('');

    const progress = goal.tasks.length === 0 ? 0 : Math.round((goal.tasks.filter((t: any) => t.completed).length / goal.tasks.length) * 100);

    const addTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        try {
            await api.post(`/goals/${goal.id}/tasks`, { title: newTask });
            setNewTask('');
            onUpdate();
        } catch (error) {
            toast.error('Failed to add task');
        }
    };

    const toggleTask = async (taskId: string, completed: boolean) => {
        try {
            await api.put(`/tasks/${taskId}`, { completed: !completed });
            onUpdate();
        } catch (error) {
            toast.error('Failed to update task');
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {goal.title}
                </CardTitle>
                <span className="text-xs text-muted-foreground">{progress}%</span>
            </CardHeader>
            <CardContent>
                <Progress value={progress} className="mb-4" />
                <div className="space-y-2">
                    {goal.tasks.map((task: any) => (
                        <div key={task.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`task-${task.id}`}
                                checked={task.completed}
                                onCheckedChange={(checked) => toggleTask(task.id, checked as boolean)}
                            />
                            <label
                                htmlFor={`task-${task.id}`}
                                className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''} cursor-pointer`}
                            >
                                {task.title}
                            </label>
                        </div>
                    ))}
                </div>
                <form onSubmit={addTask} className="mt-4 flex gap-2">
                    <Input
                        placeholder="Add task..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className="h-8 text-xs"
                    />
                    <Button type="submit" size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Plus className="h-4 w-4" />
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
