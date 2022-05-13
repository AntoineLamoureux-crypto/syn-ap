import React from 'react';
import styled from 'styled-components';
import { useTable, usePagination } from 'react-table';
import { useState, useEffect } from 'react';
import { useColorMode } from '@chakra-ui/react';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Input,
  Spinner,
  Select,
} from '@chakra-ui/react';

const Styles = styled.div`
  padding: 1rem;

  .pagination {
    padding: 0.5rem;
  }
`;

function CTable({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    usePagination
  );

  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  const { colorMode } = useColorMode();

  return (
    <>
      <Table {...getTableProps()} variant="unstyled">
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <>
                <Tr
                  {...row.getRowProps()}
                  color={colorMode === 'light' ? 'black' : 'white'}
                >
                  {row.cells.map((cell) => {
                    return (
                      <>
                        <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                      </>
                    );
                  })}
                </Tr>
              </>
            );
          })}
          <Tr>
            {loading ? (
              <Td colSpan="10000">
                <Spinner />
              </Td>
            ) : (
              <Td colSpan="10000">
                Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
                results
              </Td>
            )}
          </Tr>
        </Tbody>
      </Table>
      <Box className="pagination">
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </Button>{' '}
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </Button>{' '}
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </Button>{' '}
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </Button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <Input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <Select
          w={'10%'}
          display={'inline-block'}
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>
      </Box>
    </>
  );
}

function AllOrders() {
  const [currentData, setCurrentData] = useState([
    {
      clientName: '',
      deliveryNo: '',
      deliveryAddress: '',
      deliveryDate: '',
      orderStatus: '',
    },
  ]);

  useEffect(() => {
    fetch('http://localhost:9090/getAllOrders')
      .then((response) => response.json())
      .then((data) => setCurrentData(data));
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Client info',
        columns: [
          {
            Header: 'Name',
            accessor: 'clientName',
          },
        ],
      },
      {
        Header: 'Delivery Info',
        columns: [
          {
            Header: 'Delivery Address',
            accessor: 'deliveryAddress',
          },
          {
            Header: 'Delivery Date',
            accessor: 'deliveryDate',
          },
          {
            Header: 'Order Status',
            accessor: 'orderStatus',
          },
        ],
      },
    ],
    []
  );

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex }) => {
      const fetchId = ++fetchIdRef.current;

      setLoading(true);

      setTimeout(() => {
        if (fetchId === fetchIdRef.current) {
          const startRow = pageSize * pageIndex;
          const endRow = startRow + pageSize;
          setData(currentData.slice(startRow, endRow));

          setPageCount(Math.ceil(currentData.length / pageSize));

          setLoading(false);
        }
      }, 1000);
    },
    [currentData]
  );

  return (
    <Styles>
      <CTable
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
      />
    </Styles>
  );
}

export default AllOrders;
