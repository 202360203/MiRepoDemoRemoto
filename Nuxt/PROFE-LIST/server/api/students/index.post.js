import { db } from "../../utils/db"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const result = await db.query(
    "INSERT INTO students (group_id, name) VALUES ($1, $2) RETURNING *",
    [body.group_id, body.name]
  )

  return result.rows[0]
})
