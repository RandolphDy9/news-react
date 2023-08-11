import './App.css';
import News from './components/news/News';
import Navbar from './components/shared/Navbar';

function App() {
  return (
    <div className="md:p-20 p-10 bg-background">
      <Navbar />
      <News />
    </div>
  );
}

export default App;
