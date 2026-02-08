import './App.css';
import Header from './Header';
import Menu from './Menu';
import DashBoard from './DashBoard';
import Footer from './Footer';


function DashBoardPage() {
  return (
    <div className="wrapper">
     <Header/>
     <DashBoard/>
     <Menu/>
     <Footer/>
    
    </div>
  );
}
export default DashBoardPage;