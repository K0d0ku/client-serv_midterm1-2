import '../pages/midterm1bahandiburger.css';

export default function Header({ setActiveContent }) {
  return (
    <header className="header">
      <div className="logo">
        <div className="text-wrapper">BAHANDI</div>
      </div>
      <div className="navbar"> {/*ал мында болса midterm1bahandi ден default бойынша жүктелген контент арқылы біз 2 батырманын бірін басып контент 
      компонентін бетті ауыстырмай ақ динамикалық түрде ауыстыра аламыз*/}
        <div className="div" onClick={() => setActiveContent('burgers')}>Бургеры</div>
        <div className="text-wrapper-2" onClick={() => setActiveContent('drinks')}>Напитки</div>
        <div className="text-wrapper-3">Комбо</div>
        <div className="rectangle">
          <div className="text-wrapper-4ish">Корзина</div>
        </div>
      </div>
    </header>
  );
}
