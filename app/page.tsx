'use client';

import { DashboardHeader } from "@/components/dashboard-header";
import { GoalCard } from "@/components/goal-card";

const DUMMY_GOALS = [
  {
    id: "1",
    title: "Learn Next.js 14",
    description: "Master the new App Router and Server Actions.",
    progress: 65,
    status: "IN_PROGRESS" as const,
    dueDate: new Date("2024-12-31"),
    tasks: [
      { id: "t1", title: "Read Documentation", completed: true },
      { id: "t2", title: "Build a Demo App", completed: true },
      { id: "t3", title: "Deploy to Vercel", completed: false },
    ],
  },
  {
    id: "2",
    title: "Fitness Goal",
    description: "Run 5km every day for a month.",
    progress: 30,
    status: "IN_PROGRESS" as const,
    dueDate: new Date("2024-11-30"),
    tasks: [
      { id: "t4", title: "Buy Running Shoes", completed: true },
      { id: "t5", title: "Week 1 Running", completed: true },
      { id: "t6", title: "Week 2 Running", completed: false },
    ],
  },
  {
    id: "3",
    title: "Read Books",
    description: "Read 12 books this year.",
    progress: 100,
    status: "COMPLETED" as const,
    dueDate: new Date("2024-12-31"),
    tasks: [
      { id: "t7", title: "The Pragmatic Programmer", completed: true },
      { id: "t8", title: "Clean Code", completed: true },
    ],
  },
];

export default function Home() {
  return (
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DashboardHeader />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {DUMMY_GOALS.map((goal) => (
            <GoalCard key={goal.id} goal={goal} onUpdate={() => { }} />
          ))}
        </div>
      </div>
    </div>
  );
}
