import React from 'react';
import { Priority, Metrics } from '../../types';
import {
  GroceryItemProps,
  ItemContainer,
  ItemDetails,
  ItemName,
} from './groceryComponent';

const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
  const { listItem, quantity, description, price, priority } = item;
  const formattedQuantity =
    +quantity.amount > 1
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
