import { useEffect, useState } from 'react';
import { GroceryList } from '../data';
import { addItemToGroceryList, fetchGroceryList } from '../lib/firebase';
import Form from '../Components/headless/Form';
import useTableData from '../hooks/useTableData';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  color: #00ccff;
  text-align: center;
`;

const Error = styled.p`
  color: red;
  text-align: center;
`;

const FloatingActionButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #00ccff;
  color: #242424;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  transition: transform 0.6s ease-in-out, background-color 0.3s ease-in-out;

  &:hover {
    transform: rotate(360deg);
    background-color: #008fb3;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 90px;
  right: 10px;
  background-color: #00ccff;
  color: #242424;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8em;
  white-space: nowrap;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;

  ${FloatingActionButton}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalContent = styled.div`
  background-color: #242424;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  animation: modalBounceIn 0.5s ease forwards;

  @keyframes modalBounceIn {
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  animation: fadeInOverlay 0.3s ease forwards;

  @keyframes fadeInOverlay {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Dashboard = () => {
  const [list, setList] = useState<GroceryList[]>([]);
  const { createTable } = useTableData();
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSubmit = async (item: GroceryList) => {
    try {
      await addItemToGroceryList(item);
      const updatedList = await fetchGroceryList();
      setList(updatedList);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error adding item:', err);
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    const loadGroceryList = async () => {
      try {
        const items = await fetchGroceryList();
        setList(items);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    loadGroceryList();
  }, []);

  return (
    <DashboardContainer>
      <Title>Dashboard</Title>
      {error && <Error>Error: {error}</Error>}
      {list && list.length > 0 ? createTable(list) : <p>Nothing to show</p>}
      <FloatingActionButton onClick={() => setIsModalOpen(true)}>
        +<Tooltip>Add to the list</Tooltip>
      </FloatingActionButton>
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Form
              onCancel={() => setIsModalOpen(false)}
              onSubmit={handleFormSubmit}
            />
          </ModalContent>
        </ModalOverlay>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
