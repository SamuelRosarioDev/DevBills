import { Button } from "../../components/Button";
import { Logo } from "../../components/Logo";
import { Header } from "./styles";

export function Home() {
    return (
        <Header>
            <Logo />
            <div>
                <Button>Nova transação</Button>
                <Button>Nova categoria</Button>
            </div>
        </Header>
    );

}