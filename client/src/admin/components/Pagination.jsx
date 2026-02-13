import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function PaginationComp({ pagination }) {
  const [params, setParams] = useSearchParams()
  const totalPages = pagination?.totalPages || 1
  const page = Number(params.get('page')) || 1
  const limit = Number(params.get('limit')) || 8

  useEffect(() => {
    if (!params.get('page') || !params.get('limit')) {
      const currentParams = Object.fromEntries(params)
      setParams(
        {
          ...currentParams,
          page: currentParams.page || page,
          limit: currentParams.limit || limit
        },
        { replace: true }
      )
    }
  }, [])

  const changePage = (p) => {
    if (p < 1 || p > totalPages) return
    setParams({
      ...Object.fromEntries(params),
      page: p,
      limit
    })
  }

  const renderPageNumbers = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - 1 && i <= page + 1)
      ) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              className="cursor-pointer"
              isActive={page === i}
              onClick={() => changePage(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      } else if (i === page - 2 || i === page + 2) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
    }
    return pages
  }

  if (totalPages <= 1) return null

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            onClick={() => changePage(page - 1)}
          />
        </PaginationItem>

        {renderPageNumbers()}

        <PaginationItem>
          <PaginationNext
            className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            onClick={() => changePage(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}