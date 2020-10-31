import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from '../components/navbar';
import BookList from '../components/BookList';
function MainPage() {
  return (
    <div className="App">
      <AppNavBar />
      <BookList />

    </div>
  );
}

export default MainPage;
