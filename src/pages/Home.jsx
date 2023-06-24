import { useEffect, useContext, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'

import Categories from '../components/Categories'
import Sort, { list } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzaSlice'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state) => state.filter
  )
  const { items, status } = useSelector((state) => state.pizza)

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const search = searchValue ? `search=${searchValue}` : ''

    dispatch(fetchPizzas({ currentPage, category, sortBy, order, search }))
  }
  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, currentPage, sort.sortProperty])

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty)
      dispatch(setFilters({ ...params, sort }))
      isSearch.current = true
    }
  }, [])
  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas()
    }

    isSearch.current = false
  }, [categoryId, searchValue, currentPage, sort.sortProperty, sort.order])

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategoty={(id) => dispatch(setCategoryId(id))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>К сожалению, не удалось получить пиццы</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home
