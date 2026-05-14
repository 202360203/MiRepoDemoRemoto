import { db } from "../../utils/db"

export default defineEventHandler(async (event) => {
  const groupId = event.context.params.groupId

  const result = await db.query(
    `
    SELECT
      s.id,
      s.name,
      COUNT(a.id) AS total_clases,
      COALESCE(SUM(CASE WHEN a.present THEN 1 ELSE 0 END), 0) AS asistencias,
      CASE
        WHEN COUNT(a.id) = 0 THEN 0
        ELSE ROUND(
          SUM(CASE WHEN a.present THEN 1 ELSE 0 END)::numeric
          / COUNT(a.id) * 100, 2
        )
      END AS porcentaje
    FROM students s
    LEFT JOIN attendance a ON s.id = a.student_id
    WHERE s.group_id = $1
    GROUP BY s.id, s.name
    ORDER BY s.name
    `,
    [groupId]
  )

  return result.rows
})
