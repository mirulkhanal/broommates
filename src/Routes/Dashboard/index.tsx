import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import BoardDetails from '../../Components/board';
import Modal from '../../Components/headless/Modal';
import BoardForm from '../../Components/headless/Board/BoardForm';
import {
  fetchUserBoards,
  createBoard,
  deleteBoard,
  getBoardDetails,
} from '../../lib/firebase';
import { FloatingActionButton, Tooltip } from './dashboardComponent';
import { useToast } from '../../Components/headless/ToastNotifications';

const Dashboard = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [userBoards, setUserBoards] = useState<any[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [boardData, setBoardData] = useState<{ title: string; type: string }>({
    title: '',
    type: 'grocery', // Set default type to 'grocery'
  });

  useEffect(() => {
    const fetchBoards = async () => {
      if (user) {
        const boards = await fetchUserBoards(user.uid);
        setUserBoards(boards);
      }
    };

    fetchBoards();
  }, [user]);

  const handleCreateBoard = async (boardData: {
    title: string;
    type: string;
  }) => {
    if (user) {
      try {
        await createBoard(boardData, user.uid);
        setIsModalOpen(false);
        const boards = await fetchUserBoards(user.uid);
        setUserBoards(boards);
      } catch (error) {
        console.error('Error creating board: ', error);
        addToast('Failed to create a Board', 'error');
      }
    }
  };

  const handleDeleteBoard = async (boardId: string) => {
    if (user) {
      try {
        await deleteBoard(boardId);
        const boards = await fetchUserBoards(user.uid);
        setUserBoards(boards);
        addToast('Sucessfully deleted the Board', 'success');
      } catch (error) {
        console.error('Error deleting board: ', error);
        addToast('Failed to delete the Board', 'error');
      }
    }
  };

  const handleViewBoardDetails = async (boardId: string) => {
    if (user) {
      try {
        const boardDetails = await getBoardDetails(boardId);
        setSelectedBoard(boardDetails);
      } catch (error) {
        console.error('Error fetching board details: ', error);
        addToast('Error Fetching Board Data', 'error');
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCreateBoard(boardData);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFormSubmit(e);
    setIsModalOpen(false);
    addToast('Saved Successfully!!', 'success');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Your Boards</h2>
        <ul>
          {userBoards.map((board) => (
            <li key={board.id}>
              <p>Title: {board.title}</p>
              <p>Type: {board.type}</p>
              <p>Owner: {board.owner}</p>
              <button onClick={() => handleViewBoardDetails(board.id)}>
                View Details
              </button>
              {user.uid === board.owner && (
                <button onClick={() => handleDeleteBoard(board.id)}>
                  Delete Board
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <FloatingActionButton onClick={() => setIsModalOpen(true)}>
          +<Tooltip>Create Board</Tooltip>
        </FloatingActionButton>
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)} onSave={handleSave}>
            <BoardForm
              boardData={boardData}
              setBoardData={setBoardData}
              onFormSubmit={handleFormSubmit}
            />
          </Modal>
        )}
      </div>
      {selectedBoard && (
        <BoardDetails
          board={selectedBoard}
          onClose={() => setSelectedBoard(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
