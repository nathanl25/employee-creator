// import "./App.css"
import { Counter } from "./features/counter/Counter"
// import { Employees } from "./features/employees/Employees"
import { BrowserRouter, Routes, Route } from "react-router"
import HomePage from "./pages/HomePage"
import { Header } from "./features/header/Header"

// import { Quotes } from "./features/quotes/Quotes"
// import logo from "./logo.svg"

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/count" element={<Counter />} />
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <Counter />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     {/* <Quotes /> */}
    //     <Employees />
    //     <span>
    //       <span>Learn </span>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         React
    //       </a>
    //       <span>, </span>
    //       <a
    //         className="App-link"
    //         href="https://redux.js.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Redux
    //       </a>
    //       <span>, </span>
    //       <a
    //         className="App-link"
    //         href="https://redux-toolkit.js.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Redux Toolkit
    //       </a>
    //       <span>, </span>
    //       <a
    //         className="App-link"
    //         href="https://react-redux.js.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         React Redux
    //       </a>
    //       ,<span> and </span>
    //       <a
    //         className="App-link"
    //         href="https://reselect.js.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Reselect
    //       </a>
    //     </span>
    //   </header>
    // </div>
  )
}

export default App
