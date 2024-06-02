import {
  BoardFormProps,
  FormContainer,
  Input,
  Label,
  Option,
  Select,
} from './boardComponent';

const BoardForm = ({
  boardData,
  setBoardData,
  onFormSubmit,
}: BoardFormProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBoardData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <FormContainer>
      <h2>Create Board</h2>
      <form onSubmit={onFormSubmit}>
        <Label htmlFor='title'>Title</Label>
        <Input
          type='text'
          id='title'
          name='title'
          value={boardData.title}
          onChange={handleChange}
          required
        />

        <Label htmlFor='type'>Select Board Type:</Label>
        <Select
          id='type'
          name='type'
          value={boardData.type}
          defaultValue={'grocery'}
          onChange={handleChange}
          required>
          <Option value='grocery'>Grocery</Option>
          <Option value='chores'>Chores</Option>
        </Select>
      </form>
    </FormContainer>
  );
};

export default BoardForm;
