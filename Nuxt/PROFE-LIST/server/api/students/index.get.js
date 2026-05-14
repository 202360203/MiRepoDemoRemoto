import { db } from "../../utils/db"
import { getQuery } from "h3"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const result = await db.query(
    "SELECT * FROM students WHERE group_id = $1 ORDER BY id",
    [query.group_id]
  )

  return result.rows
})
