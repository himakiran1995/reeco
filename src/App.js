import './App.css';
import HomePage from '../src/components/homePage';
import { Provider } from 'react-redux'
import store from './store/redux';
import ModalComponent from './components/modal';
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <HomePage />
        <ModalComponent />

      </Provider>
    </div>
  );
}

export default App;
