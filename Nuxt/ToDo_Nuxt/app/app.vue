<template>
  <div class="container">
    <h1>ToDo Nuxt 🚀</h1>

    <div class="form">
      <input
        v-model="newTask"
        placeholder="Nueva tarea"
        @keyup.enter="addTask"
      />

      <button @click="addTask">
        Agregar
      </button>
    </div>

    <div
      v-for="task in tasks"
      :key="task.id"
      class="task"
      :class="{ completed: task.completed }"
    >
      <div class="task-info">

        <input
          type="checkbox"
          :checked="task.completed"
          @change="toggleCompleted(task)"
        />

        <span v-if="editingId !== task.id">
          {{ task.text }}
        </span>

        <input
          v-else
          v-model="editText"
        />
      </div>

      <div class="actions">

        <button @click="toggleFavorite(task)">
          {{ task.favorite ? "⭐" : "☆" }}
        </button>

        <button
          v-if="editingId !== task.id"
          @click="startEdit(task)"
        >
          ✏️
        </button>

        <button
          v-else
          @click="saveEdit(task)"
        >
          💾
        </button>

        <button @click="deleteTask(task.id)">
          🗑️
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

const tasks = ref([])
const newTask = ref("")

const editingId = ref(null)
const editText = ref("")

const loadTasks = async () => {
  tasks.value = await $fetch("/api/tasks")
}

onMounted(loadTasks)

const addTask = async () => {
  if (!newTask.value.trim()) return

  await $fetch("/api/tasks", {
    method: "POST",
    body: {
      text: newTask.value
    }
  })

  newTask.value = ""

  loadTasks()
}

const deleteTask = async (id) => {
  await $fetch(`/api/tasks/${id}`, {
    method: "DELETE"
  })

  loadTasks()
}

const toggleCompleted = async (task) => {
  await $fetch(`/api/tasks/${task.id}`, {
    method: "PUT",
    body: {
      ...task,
      completed: !task.completed
    }
  })

  loadTasks()
}

const toggleFavorite = async (task) => {
  await $fetch(`/api/tasks/${task.id}`, {
    method: "PUT",
    body: {
      ...task,
      favorite: !task.favorite
    }
  })

  loadTasks()
}

const startEdit = (task) => {
  editingId.value = task.id
  editText.value = task.text
}

const saveEdit = async (task) => {
  await $fetch(`/api/tasks/${task.id}`, {
    method: "PUT",
    body: {
      ...task,
      text: editText.value
    }
  })

  editingId.value = null

  loadTasks()
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f3f4f6;
}

.container {
  max-width: 700px;
  margin: auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  color: #00dc82;
}

.form {
  display: flex;
  gap: 10px;
  margin-bottom: 2rem;
}

.form input {
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: none;
}

.form button {
  padding: 12px 20px;
  border: none;
  background: #00dc82;
  color: white;
  border-radius: 10px;
  cursor: pointer;
}

.task {
  background: white;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 14px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-info {
  display: flex;
  gap: 10px;
  align-items: center;
}

.completed span {
  text-decoration: line-through;
  color: gray;
}

.actions {
  display: flex;
  gap: 8px;
}

.actions button {
  border: none;
  background: #e5e7eb;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
