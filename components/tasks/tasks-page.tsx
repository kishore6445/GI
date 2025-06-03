"use client"

import { useState } from "react"
import { TasksList } from "@/components/tasks-list"
import { AddTaskDialog } from "@/components/tasks/add-task-dialog"

export function TasksPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [parentType, setParentType] = useState<"project" | "task" | null>(null)
  const [parentId, setParentId] = useState<string | null>(null)

  const handleAddItem = (type: "project" | "task" | "subtask", parentId: string | null = null) => {
    setParentType(type === "subtask" ? "task" : type === "task" ? "project" : null)
    setParentId(parentId)
    setIsAddDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tasks</h2>
      </div>

      <div className="space-y-4">
        <TasksList type="personal" onAddItem={handleAddItem} />
      </div>

      <AddTaskDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        parentType={parentType}
        parentId={parentId}
      />
    </div>
  )
}
