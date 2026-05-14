<template>
  <div class="container">
    <h1>PROFE-LIST 📚</h1>

    <nav>
      <NuxtLink to="/">Grupos</NuxtLink>
      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
    </nav>

    <NuxtPage />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f3f4f6;
}

.container {
  max-width: 1000px;
  margin: auto;
  padding: 2rem;
}

nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

a {
  text-decoration: none;
  color: #00dc82;
  font-weight: bold;
}
</style>
