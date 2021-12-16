import Modal from 'react-modal'
import { Container, TransactionTypeContainer, RadioBox } from './styled'
import close from '../../assets/close.svg'
import income from '../../assets/income.svg'
import outcome from '../../assets/outcome.svg'
import { FormEvent, useState, useContext } from 'react'
import { TransactionsContext } from '../../TransactionsContext'

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void
}

export const NewTransactionModal = ({isOpen, onRequestClose}:NewTransactionModalProps) => {

    const {createTransaction} = useContext(TransactionsContext)

    const [type, setType] = useState('deposit')
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState("")

    const handleCreateNewTransaction = async (event: FormEvent) => {
        event.preventDefault()

        await createTransaction ({
            title,
            amount,
            category,
            type
        })

        onRequestClose()

        setTitle ('')
        setAmount (0)
        setCategory('')
        setType('deposit')
    }

    return (

        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName='react-modal-overlay'
            className="react-modal-content"
        >   
            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
            >   
                <img src={close} alt="Fechar Modal" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>

                <input 
                placeholder='Título'
                value={title}
                onChange={event => setTitle(event.target.value)}
                />

                <input 
                placeholder='Valor'
                type="number"
                value={amount} 
                onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type='button'
                        onClick={()=> {setType('deposit')}}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={income} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type='button'
                        onClick={()=> {setType('withdraw')}}
                        isActive={type === 'withdraw'} 
                        activeColor="red"
                    >
                        <img src={outcome} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input 
                placeholder='Categoria'
                value={category}
                onChange={event => setCategory(event.target.value)}
                />
                
                <button type="submit">
                    Cadastrar
                </button>  
            </Container>
        </Modal>
    )
}
