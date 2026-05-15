<script setup>
import { ref } from 'vue'

const nombre = ref('')
const correo = ref('')
</script>

<template>
  <div class="formulario">
    <h2>Captura de Datos</h2>

    <div class="campo">
      <label>Nombre:</label>
      <input v-model="nombre" type="text" placeholder="Escribe tu nombre" />
    </div>

    <div class="campo">
      <label>Correo electrónico:</label>
      <input
        v-model="correo"
        type="email"
        placeholder="correo@ejemplo.com"
      />
    </div>

    <hr />

    <h3>Datos Capturados</h3>
    <p><strong>Nombre:</strong> {{ nombre }}</p>
    <p><strong>Correo:</strong> {{ correo }}</p>
  </div>
</template>

<style scoped>
.formulario {
  max-width: 400px;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-family: Arial, sans-serif;
}

.campo {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

hr {
  margin: 20px 0;
}
</style>
