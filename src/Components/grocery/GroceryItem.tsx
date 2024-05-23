import React from 'react';
import styled from 'styled-components';
import { GroceryList, Priority, Metrics } from '../../data';

// Styled components for different priority levels
const ItemContainer = styled.div<{ priority: Priority }>`
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

const ItemName = styled.h3`
  margin: 0;
`;

const ItemDetails = styled.p`
  margin: 5px 0;
`;

interface GroceryItemProps {
  item: GroceryList;
}

const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
  const { listItem, quantity, description, price, priority } = item;
  const formattedQuantity =
    quantity.amount > 1
      ? `Quantity: ${quantity.amount} ${quantity.metric}s`
      : `Quantity: ${quantity.amount} ${Metrics[quantity.metric]}`;

  const formattedPrice = `Price: Rs ${price}`;
  const formattedPriority = `Priority: ${Priority[priority]} (${priority})`;

  return (
    <ItemContainer priority={priority}>
      <ItemName>{listItem}</ItemName>
      <ItemDetails>{formattedQuantity}</ItemDetails>
      <ItemDetails>Description: {description}</ItemDetails>
      <ItemDetails>{formattedPrice}</ItemDetails>
      <ItemDetails>{formattedPriority}</ItemDetails>
    </ItemContainer>
  );
};

export default GroceryItem;
