const Categories = ({ value, onClickCategoty }) => {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            className={value === index ? 'active' : ''}
            key={index}
            onClick={() => onClickCategoty(index)}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
