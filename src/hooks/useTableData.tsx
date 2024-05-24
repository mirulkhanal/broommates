import styled from 'styled-components';
import { Metrics, Priority } from '../data';
import { useState } from 'react';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #242424;
  color: #e0e0e0;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  border-radius: 10px;
  overflow: hidden;
`;

export const TableHeader = styled.th`
  background-color: #333;
  color: #00ccff;
  padding: 15px;
  text-align: left;
  font-weight: bold;
  text-transform: uppercase;
  border-bottom: 2px solid #00ccff;
`;

export const TableHeaderGroup = styled.thead``;

export const TableBodyGroup = styled.tbody``;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #2a2a2a;
  }
  &:nth-child(odd) {
    background-color: #242424;
  }
  &:hover {
    background-color: #333;
  }
`;

export const TableCell = styled.td`
  padding: 15px;
  border: 1px solid #333;
  color: #e0e0e0;
  font-size: 0.9em;
  text-align: left;
`;

export const Select = styled.select`
  background-color: #333;
  color: #00ccff;
  border: 1px solid #00ccff;
  padding: 5px;
  border-radius: 5px;
  outline: none;
  option {
    background-color: #242424;
    color: #e0e0e0;
  }
`;

function useTableData<ObjectType extends object>() {
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
          {data.map((item: any, index) => (
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
                    <Select
                      defaultValue={item[key].status}
                      onChange={(e) =>
                        setSelectedOption(e.currentTarget.value)
                      }>
                      <option value='pending'>Pending</option>
                      <option value='done'>Done</option>
                      <option value='postponed'>Postponed</option>
                    </Select>
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

  return { createTable, selectedOption };
}

export default useTableData;
