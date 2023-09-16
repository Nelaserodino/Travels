import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppRoutes } from './Routes/AppRoutes';
import { TravelProvider } from './Context/TravelContext';


function App() {
  return (
    <div className='App'>
      <TravelProvider>
        <AppRoutes/>
      </TravelProvider>
    </div>
  );
}

export default App;
