import './App.css'
import MainRoutes from './routes/MainRoutes'
import { AccessProvider } from './context/AccessProvider.jsx'

function App() {
  return (
    <AccessProvider>
      <div className="h-screen w-screen">
        <MainRoutes />
      </div>
    </AccessProvider>
  )
}

export default App
