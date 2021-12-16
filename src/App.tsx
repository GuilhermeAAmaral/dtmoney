import { Dashboard } from "./components/Dashboard"
import { Header } from "./components/Header"
import { GlobalStyle } from "./styles/global"
import { useState } from "react"
import { NewTransactionModal } from "./components/NewTransactionModal"
import { TransactionsProvider } from "./TransactionsContext"

export const App = () => {

  const [isNewTransactionModalOpen, setIsnweModalTransactionModalOpen] = useState(false)

  const handleOpenNewTransactionModal = () => {
    setIsnweModalTransactionModalOpen(true)
  }

  const handleCloseNewTransactionModal = () => {
    setIsnweModalTransactionModalOpen(false)
  }
  
  return (

    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard />
      <GlobalStyle />
      
      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal} 
      />
    </TransactionsProvider>

  )
}
