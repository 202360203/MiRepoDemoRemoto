<script setup>
defineProps({
  nombre: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  numero: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="card">
    <img :src="imagen" :alt="nombre" class="pokemon-img" />

    <h2>#{{ numero }} {{ nombre }}</h2>

    <p><strong>Tipo:</strong> {{ tipo }}</p>
  </div>
</template>

<style scoped>
.card {
  width: 250px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 15px;
  background-color: #f5f5f5;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  text-align: center;
  font-family: Arial, sans-serif;
}

.pokemon-img {
  width: 150px;
  height: 150px;
  object-fit: contain;
}

h2 {
  text-transform: capitalize;
  margin: 15px 0 10px;
}

p {
  margin: 0;
  font-size: 1rem;
}
</style>
