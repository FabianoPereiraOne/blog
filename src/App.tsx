import Routers from './Routers'
import './Global.css';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import DatesProvider from './Context';

function App() {
  return (
    <DatesProvider>
      <ToastContainer autoClose={ 3000 }/>
      <Routers/>
    </DatesProvider>
  );
}

export default App;
