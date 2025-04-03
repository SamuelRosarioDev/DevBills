import { Button } from "../../components/Button";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { Logo } from "../../components/Logo";
import { Title } from "../../components/Title";
import { Balance, Filters, Header, InputGroup, Main, Section } from "./styles";
import { InputMask } from "@react-input/mask"

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
                        <InputGroup>
                            <InputMask component={Input} mask="dd/mm/yyyy" replacement={{ d: /\d/, m: /\d/, y: /\d/ }} variant="dark" label="Início" placeholder="dd/mm/yyyy" />
                            <InputMask component={Input} mask="dd/mm/yyyy" replacement={{ d: /\d/, m: /\d/, y: /\d/ }} variant="dark" label="Fim" placeholder="dd/mm/yyyy" />
                            <ButtonIcon/>
                        </InputGroup>
                    </Filters>
                    <Balance>
                    <Card title="Saldo" amount={123} variant="balance"/>
                    <Card title="Saldo" amount={123} variant="incomes"/>
                    <Card title="Saldo" amount={123} variant="expenses"/>
                    </Balance>
                </Section>
            </Main>
        </>

    );

}