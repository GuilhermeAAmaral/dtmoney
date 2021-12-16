import { createContext, ReactNode, useEffect, useState } from "react"
import { api } from "./services/api"

interface Transaction {
    id: number,
    title: string,
    amount: number,
    type: string,
    category: string,
    createAt: string
}

interface TransactionsProviderProps {
    children: ReactNode
}

interface TransactionInput {
    title: string,
    amount: number,
    type: string,
    category: string,
}
//outras formas de fazer 
//type TransactionsInput = Omit<Transaction, 'id' | 'createAt'>
//type TransactionsInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>


interface TransactionsContextData {
   transactions: Transaction[] 
   createTransaction: (transaction: TransactionInput) => Promise <void>
}


export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export const TransactionsProvider = ({children}: TransactionsProviderProps) => {

    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect (() => {
        api.get('/transactions')   
        
        .then ((res) => {
            setTransactions (res.data.transactions)
        })
            
    }, [])

    const createTransaction = async (transactionInput: TransactionInput) => {
        const response = await api.post('/transactions', {
            ...transactionInput, 
            createAt: new Date()
        })
        const { transaction } = response.data

        setTransactions([
            ...transactions, transaction
        ])
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}