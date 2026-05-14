import { db } from "../../utils/db"

export default defineEventHandler(async (event) => {
  const id = event.context.params.id

  await db.query(
    "DELETE FROM groups WHERE id = $1",
    [id]
  )

  return { message: "Grupo eliminado" }
})
