import { db } from "../../utils/db"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const result = await db.query(
    "INSERT INTO groups (name) VALUES ($1) RETURNING *",
    [body.name]
  )

  return result.rows[0]
})
