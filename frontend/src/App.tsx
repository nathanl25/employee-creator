import { Counter } from "./features/counter/Counter"

import { BrowserRouter, Routes, Route } from "react-router"
import HomePage from "./pages/HomePage"
import { Header } from "./features/header/Header"
import CreatePage from "./pages/CreatePage"
import UpdatePage from "./pages/UpdatePage"
import ContractsPage from "./pages/ContractsPage"

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/count" element={<Counter />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/update" element={<UpdatePage />} />
        <Route path="/contract" element={<ContractsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
