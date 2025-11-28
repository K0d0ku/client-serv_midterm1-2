import { Link } from 'react-router-dom';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';

export default function Landing() {
  return (
    <div>
      <div> {/*мында сол react тің кәдімгі беті*/}
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='assigments'>
        <Link to="/midterm1">
          <button>Midterm 1</button> {/*мында бәздің тапсырма*/}
        </Link>
        <Link to="/midterm2">
          <button>Midterm 2</button>
        </Link>
      </div>
    </div>
  );
}
