
import { useEffect, useState } from "react";
import Navbar from './Components/Navbar'
import Preloader from './Components/PreLoader';
import Homepage from './pages/Homepage'

const App = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Match this to your preloader duration

    return () => clearTimeout(timer);
  }, []);


  return (
    <>
    <div className='pb-2'><Navbar/></div>
    
    {isLoading ? <Preloader /> : <Homepage />}
    </>
  )
}

export default App