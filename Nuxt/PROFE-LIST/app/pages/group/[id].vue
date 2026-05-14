<template>
  <div>
    <h2>Alumnos</h2>

    <input v-model="name" placeholder="Nombre del alumno" />
    <button @click="addStudent">Agregar</button>

    <ul>
      <li v-for="student in students" :key="student.id">
        {{ student.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const route = useRoute()
const students = ref([])
const name = ref("")

const loadStudents = async () => {
  students.value = await $fetch(
    `/api/students?group_id=${route.params.id}`
  )
}

onMounted(loadStudents)

const addStudent = async () => {
  if (!name.value.trim()) return

  await $fetch("/api/students", {
    method: "POST",
    body: {
      group_id: route.params.id,
      name: name.value
    }
  })

  name.value = ""
  loadStudents()
}
</script>
