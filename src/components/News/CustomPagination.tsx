import { Pagination } from "@mui/material"

const CustomPagination = 
({
  totalLength,
  articlesPage,
  currentPage,
  handlePageChange,
} : {
  totalLength: number,
  articlesPage: number,
  currentPage: number,
  handlePageChange: (_: any, value: number) => void
}) => {

  return (
    <>
      <Pagination
        count={Math.ceil(totalLength / articlesPage)}
        page={currentPage}
        onChange={handlePageChange}
        color='secondary'
        size='large'
        style={{
          display: 'flex',
          margin: '1rem auto',
          justifyContent: 'center',
        }}
      />
    </>
  )
}

export default CustomPagination