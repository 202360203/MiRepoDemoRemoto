<!-- App.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import PokemonCard from './components/PokemonCard.vue'

const nombrePokemon = ref('')
const pokemon = ref(null)
const cargando = ref(false)
const error = ref('')

const listaPokemones = ref([])
const mostrarSugerencias = ref(false)

// Cargar nombres de Pokémon al iniciar
onMounted(async () => {
  const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
  const data = await respuesta.json()
  listaPokemones.value = data.results.map(p => p.name)
})

// Filtrar sugerencias
const sugerencias = computed(() => {
  if (!nombrePokemon.value.trim()) return []

  return listaPokemones.value
    .filter(nombre =>
      nombre.startsWith(nombrePokemon.value.toLowerCase())
    )
    .slice(0, 8)
})

// Seleccionar sugerencia
function seleccionarPokemon(nombre) {
  nombrePokemon.value = nombre
  mostrarSugerencias.value = false
  buscarPokemon()
}

// Buscar Pokémon
async function buscarPokemon() {
  if (!nombrePokemon.value.trim()) return

  cargando.value = true
  error.value = ''
  pokemon.value = null
  mostrarSugerencias.value = false

  try {
    const respuesta = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nombrePokemon.value.toLowerCase()}`
    )

    if (!respuesta.ok) {
      throw new Error('Pokémon no encontrado')
    }

    const data = await respuesta.json()

    pokemon.value = {
      nombre: data.name,
      numero: data.id,
      imagen:
        data.sprites.other['official-artwork'].front_default ||
        data.sprites.front_default,
      tipo: data.types.map(t => t.type.name).join(', ')
    }
  } catch (err) {
    error.value = err.message
  } finally {
    cargando.value = false
  }
}
</script>

<template>
  <div class="app">
    <div class="contenedor">
      <h1>🔍 Pokédex Vue</h1>
      <p class="subtitulo">
        Busca cualquier Pokémon y visualiza su información.
      </p>

      <div class="autocomplete">
        <div class="buscador">
          <input
            v-model="nombrePokemon"
            type="text"
            placeholder="Ejemplo: pikachu"
            @input="mostrarSugerencias = true"
            @keyup.enter="buscarPokemon"
          />
          <button @click="buscarPokemon">Buscar</button>
        </div>

        <ul
          v-if="mostrarSugerencias && sugerencias.length > 0"
          class="sugerencias"
        >
          <li
            v-for="nombre in sugerencias"
            :key="nombre"
            @click="seleccionarPokemon(nombre)"
          >
            {{ nombre }}
          </li>
        </ul>
      </div>

      <p v-if="cargando" class="mensaje">⏳ Cargando Pokémon...</p>
      <p v-if="error" class="error">❌ {{ error }}</p>

      <div class="card-container" v-if="pokemon">
        <PokemonCard
          :nombre="pokemon.nombre"
          :imagen="pokemon.imagen"
          :tipo="pokemon.tipo"
          :numero="pokemon.numero"
        />
      </div>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffcb05, #3b4cca);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
}

.contenedor {
  width: 100%;
  max-width: 700px;
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 25px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  text-align: center;
}

h1 {
  margin: 0;
  font-size: 3rem;
  color: #3b4cca;
}

.subtitulo {
  color: #666;
  margin: 10px 0 30px;
}

.autocomplete {
  position: relative;
  max-width: 500px;
  margin: 0 auto 20px;
}

.buscador {
  display: flex;
  gap: 12px;
}

input {
  flex: 1;
  padding: 14px 18px;
  font-size: 1rem;
  border: 2px solid #dcdcdc;
  border-radius: 12px;
  outline: none;
  transition: 0.3s;
}

input:focus {
  border-color: #3b4cca;
  box-shadow: 0 0 10px rgba(59, 76, 202, 0.2);
}

button {
  padding: 14px 24px;
  background: #ffcb05;
  color: #2a2a2a;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #f5b700;
  transform: translateY(-2px);
}

.sugerencias {
  position: absolute;
  top: 100%;
  left: 0;
  right: 110px;
  margin-top: 6px;
  padding: 0;
  list-style: none;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  max-height: 250px;
  overflow-y: auto;
  text-align: left;
  z-index: 10;
}

.sugerencias li {
  padding: 12px 16px;
  cursor: pointer;
  text-transform: capitalize;
}

.sugerencias li:hover {
  background: #f5f7ff;
}

.mensaje {
  color: #3b4cca;
  font-weight: bold;
}

.error {
  color: #e53935;
  font-weight: bold;
}

.card-container {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>
