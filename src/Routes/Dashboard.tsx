import { useEffect, useState } from 'react';
import { GroceryList } from '../data';
import { addItemToGroceryList, fetchGroceryList } from '../lib/firebase';
import Form from '../Components/headless/Form';
import useTableData from '../hooks/useTableData';

const Dashboard = () => {
  const [list, setList] = useState<GroceryList[]>();
  const { createTable } = useTableData();

  const handleFormSubmit = async (item: any) => {
    // TODO: Handle form submission

    await addItemToGroceryList(item);
  };
  useEffect(() => {
    fetchGroceryList()
      .then((items) => items && items.length > 0 && setList(items))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <>
        {fetchLists && fetchLists.length > 0 ? (
          createTable(fetchLists)
        ) : (
          <p>Nothing to show</p>
        )}
      </>
      <Form onSubmit={handleFormSubmit} />
    </div>
  );
};

export default Dashboard;
