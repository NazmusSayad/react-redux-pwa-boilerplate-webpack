import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import css from './InitialApp.module.scss'

const About = () => {
  return (
    <div>
      <p className={css.paragraph}>This is about page...</p>

      <Link className={css.link} to="/">
        Home
      </Link>
    </div>
  )
}

const Home = () => {
  return (
    <div>
      <p className={css.paragraph}>This is home page...</p>

      <Link className={css.link} to="/about">
        About
      </Link>
    </div>
  )
}

const InitialApp = () => {
  return (
    <>
      <h1 className={css.heading}>Hello world!</h1>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default InitialApp
