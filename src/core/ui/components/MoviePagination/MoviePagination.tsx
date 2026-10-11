import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/core/ui/primitives/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/core/ui/primitives/pagination";

const PAGE_CAP = 500;

function windowPages(page: number, total: number): number[] {
  const end = Math.min(total, Math.max(page + 2, 5));
  const start = Math.max(1, end - 4);
  const pages: number[] = [];
  for (let current = start; current <= Math.min(total, start + 4); current += 1) pages.push(current);
  return pages;
}

export function MoviePagination({
  page,
  totalPages,
  hrefForPage,
}: {
  page: number;
  totalPages: number;
  hrefForPage: (page: number) => string;
}) {
  const total = Math.min(Math.max(totalPages, 0), PAGE_CAP);
  if (total <= 1) return null;

  const pages = windowPages(page, total);

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            size="default"
            nativeButton={false}
            aria-label="Go to previous page"
            render={<Link href={hrefForPage(Math.max(1, page - 1))} aria-disabled={page <= 1} />}
          >
            <ChevronLeft data-icon="inline-start" />
            <span className="hidden sm:inline">Previous</span>
          </Button>
        </PaginationItem>
        <PaginationItem className="sm:hidden">
          <span className="px-2 text-sm text-muted-foreground">
            {page} / {total}
          </span>
        </PaginationItem>
        {pages.map((number) => (
          <PaginationItem key={number} className="hidden sm:list-item">
            <Button
              variant={number === page ? "outline" : "ghost"}
              size="icon"
              nativeButton={false}
              aria-current={number === page ? "page" : undefined}
              render={<Link href={hrefForPage(number)} />}
            >
              {number}
            </Button>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            variant="ghost"
            size="default"
            nativeButton={false}
            aria-label="Go to next page"
            render={<Link href={hrefForPage(Math.min(total, page + 1))} />}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight data-icon="inline-end" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
