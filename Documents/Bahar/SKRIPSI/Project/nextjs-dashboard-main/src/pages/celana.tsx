import { GetServerSideProps, NextPage } from 'next'
import { AdminLayout } from '@layout'
import {
  Card, Dropdown, Table, Form,
} from 'react-bootstrap'
import axios from 'axios'
import { CelanaModel } from '@models/celana'
import { ResourceList } from '@models/resource-list'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisVertical, faSort, faSortDown, faSortUp,
} from '@fortawesome/free-solid-svg-icons'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'

type THSortProps = {
  name: string;
} & PropsWithChildren

const THSort = (props: THSortProps) => {
  const {
    name, children,
  } = props
  const [icon, setIcon] = useState(faSort)
  const router = useRouter()
  const { query: { sort, order } } = router

  const onClick = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        sort: name,
        order: order === 'asc' ? 'desc' : 'asc',
      },
    })
  }

  useEffect(() => {
    if (sort !== name) {
      setIcon(faSort)
      return
    }

    if (order === 'asc') {
      setIcon(faSortUp)
      return
    }

    if (order === 'desc') {
      setIcon(faSortDown)
    }
  }, [sort, order, name])

  return (
    <a className="text-decoration-none" role="button" tabIndex={0} onClick={onClick} onKeyDown={onClick}>
      {children}
      <FontAwesomeIcon icon={icon} fixedWidth size="xs" />
    </a>
  )
}

type PaginationProps = {
  meta: ResourceList<CelanaModel>['meta'];
}

const Pagination = (props: PaginationProps) => {
  const {
    meta: {
      from, to, total, per_page: perPage, last_page: lastPage, current_page: currentPage,
    },
  } = props

  const [pageIndex, setPageIndex] = useState(currentPage - 1)
  const router = useRouter()

  useEffect(() => {
    setPageIndex(currentPage - 1)
  }, [currentPage])

  return (
    <div className="row align-items-center justify-content-center">
      <div className="col-12 text-center text-sm-start col-sm-auto col-lg mb-3">
        Showing
        {' '}
        <span className="fw-semibold">{from}</span>
        {' '}
        to
        {' '}
        <span className="fw-semibold">{to}</span>
        {' '}
        of
        {' '}
        <span className="fw-semibold">{total}</span>
        {' '}
        results
      </div>
      <div className="col-auto ms-sm-auto mb-3">
        Rows per page:
        {' '}
        <Form.Select
          value={perPage}
          className="d-inline-block w-auto"
          aria-label="Item per page"
          onChange={(event) => {
            router.push({
              pathname: router.pathname,
              query: {
                ...router.query,
                page: 1, // Go back to first page
                per_page: event.target.value,
              },
            })
          }}
        >
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={250}>250</option>
        </Form.Select>
      </div>
      <div className="col-auto ms-sm-auto mb-3 overflow-auto">
        <ReactPaginate
          forcePage={pageIndex}
          pageCount={lastPage}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          containerClassName="pagination mb-0"
          previousClassName="page-item"
          pageClassName="page-item"
          breakClassName="page-item"
          nextClassName="page-item"
          previousLinkClassName="page-link"
          pageLinkClassName="page-link"
          breakLinkClassName="page-link"
          nextLinkClassName="page-link"
          previousLabel="‹"
          nextLabel="›"
          activeClassName="active"
          disabledClassName="disabled"
          onPageChange={(selectedItem) => {
            router.push({
              pathname: router.pathname,
              query: {
                ...router.query,
                page: selectedItem.selected + 1,
              },
            })
          }}
        />
      </div>
    </div>
  )
}

type Props = {
  celanaResourceList: ResourceList<CelanaModel>;
}

const Celana: NextPage<Props> = (props) => {
  const {
    celanaResourceList: {
      data: celana, meta,
    },
  } = props

  return (
    <AdminLayout>
      <Card>
        <Card.Header>Celana</Card.Header>
        <Card.Body>
          <Pagination meta={meta} />
          <Table responsive bordered hover>
            <thead className="bg-light">
              <tr>
                <th><THSort name="id">ID Baju</THSort></th>
                <th><THSort name="name">Merek</THSort></th>
                <th className="text-end"><THSort name="hp">Size</THSort></th>
                <th className="text-end">Harga</th>
                <th className="text-end"><THSort name="defense">Warna</THSort></th>
                <th className="text-end"><THSort name="special_attack">Stock</THSort></th>
                <th aria-label="Action" />
              </tr>
            </thead>
            <tbody>
              {celana.map((barang) => (
                <tr key={barang.id_celana}>
                  <td>{barang.id_celana}</td>
                  <td>{barang.merek}</td>
                  <td className="text-end">{barang.size}</td>
                  <td className="text-end">{barang.harga}</td>
                  <td className="text-end">{barang.warna}</td>
                  <td className="text-end">{barang.stok}</td>
                  <td>
                    <Dropdown align="end">
                      <Dropdown.Toggle
                        as="button"
                        bsPrefix="btn"
                        className="btn-link rounded-0 text-black-50 shadow-none p-0"
                        id={`action-${barang.id_celana}`}
                      >
                        <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Info</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
                        <Dropdown.Item
                          className="text-danger"
                          href="#/action-3"
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination meta={meta} />
        </Card.Body>
      </Card>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const EndPoint = ('localhost:8000/daftar-barang/celana')
  let page = 1
  if (context.query?.page && typeof context.query.page === 'string') {
    page = parseInt(context.query.page, 10)
  }

  let perPage = 20
  if (context.query?.per_page && typeof context.query.per_page === 'string') {
    perPage = parseInt(context.query.per_page.toString(), 10)
  }

  let sort = 'id'
  if (context.query?.sort && typeof context.query.sort === 'string') {
    sort = context.query.sort
  }

  let order = 'asc'
  if (context.query?.order && typeof context.query.order === 'string') {
    order = context.query.order
  }

  const { data: celana, headers } = await axios.get<CelanaModel[]>(EndPoint, {
    params: {
      _page: page,
      _limit: perPage,
      _sort: sort,
      _order: order,
    },
  })

  const total = parseInt(headers['x-total-count'], 10)
  const celanaResourceList: ResourceList<CelanaModel> = {
    data: celana,
    meta: {
      current_page: page,
      last_page: Math.ceil(total / perPage),
      from: page === 1 ? 1 : (page - 1) * perPage + 1,
      to: page === 1 ? perPage : (page - 1) * perPage + perPage,
      per_page: perPage,
      total,
    },
  }

  return {
    props: {
      celanaResourceList,
    }, // will be passed to the page component as props
  }
}

export default Celana
