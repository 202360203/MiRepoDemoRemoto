import { tasks } from "../../data/tasks"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const newTask = {
    id: Date.now(),
    text: body.text,
    completed: false,
    favorite: false
  }

  tasks.push(newTask)

  return newTask
})
