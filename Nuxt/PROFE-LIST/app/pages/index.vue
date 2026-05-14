<template>
  <div class="card">
    <h2>Gestión de Grupos</h2>

    <div class="form">
      <input
        v-model="name"
        placeholder="Nombre del grupo"
        @keyup.enter="addGroup"
      />
      <button @click="addGroup">Agregar Grupo</button>
    </div>

    <ul v-if="groups.length">
      <li v-for="group in groups" :key="group.id">
        <NuxtLink :to="`/group/${group.id}`">
          {{ group.name }}
        </NuxtLink>

        <button
          class="delete"
          @click="deleteGroup(group.id)"
        >
          Eliminar
        </button>
      </li>
    </ul>

    <p v-else>No hay grupos registrados.</p>
  </div>
</template>

<script setup>
const groups = ref([])
const name = ref("")

const loadGroups = async () => {
  groups.value = await $fetch("/api/groups")
}

onMounted(loadGroups)

const addGroup = async () => {
  if (!name.value.trim()) return

  await $fetch("/api/groups", {
    method: "POST",
    body: {
      name: name.value
    }
  })

  name.value = ""
  await loadGroups()
}

const deleteGroup = async (id) => {
  await $fetch(`/api/groups/${id}`, {
    method: "DELETE"
  })

  await loadGroups()
}
</script>

<style scoped>
.card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 20px;
  color: white;
}

h2 {
  margin-top: 0;
}

.form {
  display: flex;
  gap: 10px;
  margin-bottom: 1.5rem;
}

input {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 10px;
}

button {
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  background: #00dc82;
  color: white;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.06);
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 10px;
}

a {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
}

.delete {
  background: #ef4444;
}
</style>
