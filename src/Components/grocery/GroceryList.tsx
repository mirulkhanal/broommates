import React from 'react';
import GroceryItem from './GroceryItem';
import { GroceryList } from '../../data';

interface GroceryListProps {
  items: GroceryList[];
}

const GroceryItemList: React.FC<GroceryListProps> = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <GroceryItem key={index} item={item} />
      ))}
    </div>
  );
};

export default GroceryItemList;
