import { Vacation } from './components/Vacation'
import { VacationManager } from './components/VacationManager'
import { Validation } from './components/Validation'
import { Toaster } from 'sonner'

export function App() {
  return (
    <>
      <VacationManager />
      {/* <Validation /> */}
      {/* <Vacation /> */}
      <Toaster richColors position="top-right" />
    </>
  )
}
