<template>
  <div class="card">
    <h2>Dashboard de Asistencias 📊</h2>

    <div class="form">
      <label>Selecciona un grupo:</label>
      <select v-model="selectedGroup" @change="loadDashboard">
        <option value="">-- Seleccionar grupo --</option>
        <option
          v-for="group in groups"
          :key="group.id"
          :value="group.id"
        >
          {{ group.name }}
        </option>
      </select>
    </div>

    <table v-if="data.length">
      <thead>
        <tr>
          <th>Alumno</th>
          <th>Total de clases</th>
          <th>Asistencias</th>
          <th>Porcentaje</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in data" :key="student.id">
          <td>{{ student.name }}</td>
          <td>{{ student.total_clases }}</td>
          <td>{{ student.asistencias }}</td>
          <td>{{ student.porcentaje }}%</td>
        </tr>
      </tbody>
    </table>

    <p v-else-if="selectedGroup">
      No hay datos de asistencia para este grupo.
    </p>
  </div>
</template>

<script setup>
const groups = ref([])
const selectedGroup = ref("")
const data = ref([])

const loadGroups = async () => {
  groups.value = await $fetch("/api/groups")
}

const loadDashboard = async () => {
  if (!selectedGroup.value) {
    data.value = []
    return
  }

  data.value = await $fetch(
    `/api/dashboard/${selectedGroup.value}`
  )
}

onMounted(loadGroups)
</script>

<style scoped>
.card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 20px;
  color: white;
}

.form {
  margin-bottom: 2rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

select {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
}

th,
td {
  padding: 12px;
  text-align: left;
}

th {
  background: rgba(255, 255, 255, 0.08);
}
</style>
