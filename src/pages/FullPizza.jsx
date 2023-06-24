import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const FullPizza = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pizza, setPizza] = useState()

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://64843ff7ee799e3216266cf1.mockapi.io/items/' + id
        )
        setPizza(data)
      } catch (error) {
        alert('Ощибка при получении пиццы!')
        navigate('/')
      }
    }
    fetchPizza()
  }, [])

  if (!pizza) {
    return 'Загрузка...'
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.name}</h2>
      <h4>{pizza.price}</h4>
    </div>
  )
}

export default FullPizza
