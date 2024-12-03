const { Link, NavLink, useLocation } = ReactRouterDOM
const { useState } = React

import { FilterByName } from '../apps/note/cmps/FilterByName.jsx'

export function AppHeader() {

    const [isOpen, setIsOpen] = useState(false)
    const path = useLocation()


   const heightHeader = path.pathname.includes('note') ? 'keep-header':'notebook-header'

   console.log(heightHeader)

    const logo = path.pathname.includes('note') ? (<div className='flex align-center'>
        <img className='img-keep' src='assets\img\Google_Keep_icon_(2020).svg.png' />
        <h3 className='app-name'>keep</h3>
    </div>
    ) : (<img src='assets/img/logo3.png' /> )

    const colorBackground = path.pathname.includes('note') ? 'keep-background' : ''



    return <header className={`app-header ${heightHeader} ${colorBackground} full main-layout`}>
        <div className='header-container flex space-between align-center'>

            <Link to="/">
                {logo}
            </Link>
            {path.pathname.includes('note') && <FilterByName />}
            <section className='nav-area'>
                <span style={{
                    cursor: 'pointer', fontVariationSettings: "'FILL' 0, 'wght' 700, 'GRAD' 200, 'opsz' 48"
                }} onClick={() => {
                    setIsOpen(prevIsOpen => !prevIsOpen)
                }} class="material-symbols-outlined">
                    apps

                </span>
                {isOpen &&

                    <nav className='grid'>
                        <NavLink to="/">
                            <i style={{ color: "#1f89a3" }} class="fa fa-home" aria-hidden="true"></i>
                            Home
                        </NavLink>
                        <NavLink to="/about">
                            <i class="fa fa-info-circle" aria-hidden="true"></i>
                            About
                        </NavLink>
                        <NavLink to="/note">
                            <img src='assets/img/Google_Keep_icon_(2020).svg.png'></img>
                            Keep
                        </NavLink>
                        <NavLink to="/book">
                            <i style={{ color: "#4b753d" }} class="fa fa-book" aria-hidden="true"></i>

                            Book</NavLink>

                    </nav>
                }

            </section>
        </div>
    </header>
}
