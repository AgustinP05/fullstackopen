'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function Games () {
  const [games, setGames] = useState([])// Aquí se guardaran los items

  useEffect(() => {
    // axios.get('mongodb+srv://agustinperea5:imAOGySggQSFQKFi@cluster0.y6fnpsr.mongodb.net/?retryWrites=true&w=majority') // axios recibe la informacion y la cambia a JSON automaticamente
    axios.get('http://localhost:3001/games')// El front funciona en el puerto 3000. Que toma los datos del puerto 3001 del back
      .then((json) => {
        console.log(json)
        const { data } = json
        console.log(data)
        setGames(data)
      })
  }, [])

  return (
    <main>
      <h1>Games</h1>
      <Link href='/'>A inicio</Link>
      <section>

        {
          games.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))
        }

      </section>
    </main>
  )
}
