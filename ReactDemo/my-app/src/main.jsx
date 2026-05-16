import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Card from './componentes/Card'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Card
      imagen="carta1"
      nombre="Dragón Blanco de Ojos Azules"
      pais="Ojos Azules"
      contenido="Este legendario dragón es una poderosa máquina de destrucción. Virtualmente invencible, muy pocos se han enfrentado a esta impresionante criatura y han vivido para contarlo."
    />
    <Card
      imagen="carta2"
      nombre="Mago Oscuro"
      pais="Mago Oscuro"
      contenido="El más grande de los magos en cuanto al ataque y la defensa."
    />
    <Card
      imagen="carta3"
      nombre="Chica Maga Oscura"
      pais="Mago Oscuro"
      contenido="Gana 300 ATK por cada Mago Oscuro o Mago del Caos Negro en los Cementerios."
    />
  </StrictMode>,
)

