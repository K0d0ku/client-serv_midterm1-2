import { useState } from 'react'
import Burgers from "../components/burgers"
import Drinks from "../components/drinks"
import Header from "../components/header"
import BurgerFooter from '../components/burgerFooter';
import DrinksFooter from '../components/drinksFooter';
import '../pages/midterm1bahandiburger.css';

{/*here is 2 different footers since in the figma it had 2 different 
    colors , its just the same thing twice but with different class 
    name and i think i could do something simpler than that*/}
function midterm1bahandi() {
  const [activeContent, setActiveContent] = useState('burgers');
    {/*и еще так как мы загружаем 2 контент компонента в 1 страницу я сделал 
        так что страница с бургерами загружается по дефолту*/}
  return (
    <div className="home">
      <Header setActiveContent={setActiveContent} />

      {activeContent === 'burgers' && <Burgers />} {/*дефолт при первом 
      открытий страницы так как у того есть тэг 'burgers'*/}
      {activeContent === 'drinks' && <Drinks />}

      {activeContent === 'burgers' && <BurgerFooter />} {/*тут так же*/}
      {activeContent === 'drinks' && <DrinksFooter />}
    </div>
  );
}
export default midterm1bahandi;