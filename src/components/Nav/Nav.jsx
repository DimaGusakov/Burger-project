import nav from './../../Data/nav.json'
import './Nav.scss'

export default function Nav({stateNav}) {

  const { navActive, setNavActive } = stateNav;

  return (
    <nav className="nav">
      <div className="container">
        {
          nav.map(item => (
            <div key={item.id} className={`nav__item ${navActive === item.group ? 'active' : ''}`} onClick={() => setNavActive(item.group)}>
              <img src={item.img} alt={item.name} />
              <span>{item.name}</span>
            </div>           
          ))
        }
      </div>
    </nav>
  )
}