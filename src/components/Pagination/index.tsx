import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

type PaginationProps = {
  currentPage: number
  onChangePage: (e: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onChangePage,
}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={9}
      forcePage={currentPage - 1}
      pageCount={2}
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination
