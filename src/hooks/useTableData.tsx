// @ts-nocheck
import styled from 'styled-components';
import { Metrics, Priority } from '../data';
import { useState } from 'react';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  background-color: #f4f4f4;
  color: #333;
  padding: 10px;
  text-align: left;
`;

export const TableHeaderGroup = styled.thead``;

export const TableBodyGroup = styled.tbody``;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

function useTableData<ObjectType>() {
  const [selectedOption, setSelectedOption] = useState('');
  const createTable = (data: ObjectType[]) => {
    const keys = [...Object.keys(data[0])];

    return (
      <Table>
        <TableHeaderGroup>
          <TableRow>
            {keys.map((key, index) => (
              <TableHeader key={index}>{key}</TableHeader>
            ))}
          </TableRow>
        </TableHeaderGroup>
        <TableBodyGroup>
          {data.map((item, index) => (
            <TableRow key={index}>
              {keys.map((key, i) => {
                let value;
                if (key === 'quantity') {
                  value = `${item[key].amount}${Metrics[item[key].metric]}`;
                } else if (key === 'author') {
                  value = item[key].displayName;
                } else if (key === 'priority') {
                  value = Priority[item[key]];
                } else if (key === 'price') {
                  value = `${item[key]}₨`;
                } else if (key === 'status') {
                  value = (
                    <select
                      defaultValue={item[key].status}
                      onChange={(e) =>
                        setSelectedOption(e.currentTarget.value)
                      }>
                      <option value='pending'>Pending</option>
                      <option value='done'>Done</option>
                      <option value='postponed'>Postponed</option>
                    </select>
                  );
                } else {
                  value = item[key];
                }
                return <TableCell key={i}>{value}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBodyGroup>
      </Table>
    );
  };

  return { createTable };
}

export default useTableData;
