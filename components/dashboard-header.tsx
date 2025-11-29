import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function DashboardHeader() {
    return (
        <div className="flex items-center justify-between space-y-2">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">
                    Track your progress and achieve your goals.
                </p>
            </div>
            <div className="flex items-center space-x-2">
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Goal
                </Button>
            </div>
        </div>
    );
}
