import './App.css';
import { COLUMN_COUNT, ROW_COUNT } from './boardUtils';
import Grid from './components/Grid';

function App() {
  return (
    <div className='App'>
      <Grid columns={COLUMN_COUNT} rows={ROW_COUNT} />
    </div>
  );
}

export default App;
