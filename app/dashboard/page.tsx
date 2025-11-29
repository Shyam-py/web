'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { socket } from '@/lib/socket';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoalCard } from '@/components/goal-card';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog" // Need to install dialog?

export default function DashboardPage() {
    const [goals, setGoals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newGoalTitle, setNewGoalTitle] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const router = useRouter();

    const fetchGoals = async () => {
        try {
            const data = await api.get('/goals');
            setGoals(data);
        } catch (error) {
            // Redirect handled in api.ts
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGoals();

        socket.on('goal:updated', (data: any) => {
            setGoals(prev => prev.map(g => g.id === data.goalId ? { ...g, tasks: data.tasks } : g));
            toast.info(`Goal "${data.goalId}" updated`);
        });

        return () => {
            socket.off('goal:updated');
        };
    }, []);

    const createGoal = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/goals', { title: newGoalTitle });
            setNewGoalTitle('');
            setIsDialogOpen(false);
            fetchGoals();
            toast.success('Goal created');
        } catch (error) {
            toast.error('Failed to create goal');
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

    return (
        <div className="container mx-auto p-6">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">My Progress</h1>
                <div className="flex gap-2">
                    <Button onClick={() => {
                        localStorage.removeItem('token');
                        router.push('/auth');
                    }} variant="ghost">Logout</Button>

                    {/* Simple Dialog Trigger since I didn't install dialog yet, using a simple form toggle or just a button that opens a modal if I had one. 
                For MVP, I'll just use a simple form at the top or install dialog. 
                I'll install dialog in next step. For now, I'll use a simple conditional render for "modal" or just put the form inline.
            */}
                    <Button onClick={() => setIsDialogOpen(!isDialogOpen)}>
                        <Plus className="mr-2 h-4 w-4" /> New Goal
                    </Button>
                </div>
            </div>

            {isDialogOpen && (
                <div className="mb-8 p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                    <form onSubmit={createGoal} className="flex gap-4">
                        <Input
                            placeholder="Goal Title (e.g. Learn Piano)"
                            value={newGoalTitle}
                            onChange={(e) => setNewGoalTitle(e.target.value)}
                        />
                        <Button type="submit">Create</Button>
                    </form>
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {goals.map((goal) => (
                    <GoalCard key={goal.id} goal={goal} onUpdate={fetchGoals} />
                ))}
            </div>

            {goals.length === 0 && !loading && (
                <div className="text-center text-muted-foreground mt-12">
                    No goals yet. Create one to get started!
                </div>
            )}
        </div>
    );
}
