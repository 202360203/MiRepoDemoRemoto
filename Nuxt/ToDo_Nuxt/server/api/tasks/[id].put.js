import { tasks } from "../../data/tasks"

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params.id)
  const body = await readBody(event)

  const task = tasks.find(t => t.id === id)

  if (!task) {
    return {
      error: "Tarea no encontrada"
    }
  }

  task.text = body.text
  task.completed = body.completed
  task.favorite = body.favorite

  return task
})
