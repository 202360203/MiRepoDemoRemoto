import { db } from "../../utils/db"

export default defineEventHandler(async () => {
  const result = await db.query(
    "SELECT * FROM groups ORDER BY id"
  )
  return result.rows
})
