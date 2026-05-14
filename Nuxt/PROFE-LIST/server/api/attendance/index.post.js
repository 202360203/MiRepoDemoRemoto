import { db } from "../../utils/db"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const result = await db.query(
    `
    INSERT INTO attendance (student_id, date, present)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [
      body.student_id,
      body.date,
      body.present
    ]
  )

  return result.rows[0]
})
