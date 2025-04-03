import { Button } from "../../components/Button";
import { Logo } from "../../components/Logo";
import { Title } from "../../components/Title";
import { Filters, Header, Main, Section } from "./styles";

export function Home() {
    return (
        <>
            <Header>
                <Logo />
                <div>
                    <Button>Nova transação</Button>
                    <Button>Nova categoria</Button>
                </div>
            </Header>

            <Main>
                <Section>
                    <Filters>
                        <Title title="Saldo" subtitle="Receitas e despensas no periodo" />
                    </Filters>
                </Section>
            </Main>
        </>

    );

}