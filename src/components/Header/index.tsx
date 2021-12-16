import logo from '../../assets/logo.svg'
import { Container, Content } from './styles'


interface HeaderProps {
   onOpenNewTransactionModal: () => void; 
}

export const Header = ({onOpenNewTransactionModal}:HeaderProps) => {

    return (

        <Container>
            <Content>
                <img src={logo} alt="de money" />
                <button
                    onClick={onOpenNewTransactionModal}
                    type="button"> 
                    Nova Transação
                </button>
            </Content>
        </Container>
    )
}