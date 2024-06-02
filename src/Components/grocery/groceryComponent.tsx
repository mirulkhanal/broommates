import styled from 'styled-components';
import { GroceryList, Priority } from '../../types';

// Styled components for different priority levels
export const ItemContainer = styled.div<{ priority: Priority }>`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: ${(props) =>
    props.priority === Priority.Immediate
      ? 'red'
      : props.priority === Priority.Today
      ? 'blue'
      : 'blue'};
`;

export const ItemName = styled.h3`
  margin: 0;
`;

export const ItemDetails = styled.p`
  margin: 5px 0;
`;

export interface GroceryItemProps {
  item: GroceryList;
}
