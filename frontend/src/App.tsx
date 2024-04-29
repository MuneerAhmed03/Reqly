import TitleHead from './components/TitleHead'
import Inspect from './pages/inspect'


function App() {
  
  const filteredRequests: any[]= []
  const selectedRequest= {}
 const onSelectionChange: (request: any) => void= (request: any) => {}
  

  return (
    <>
    <TitleHead/>
    <Inspect />
    </>
  )
}

export default App
