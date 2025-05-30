import { Button } from "../../components/Button";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Card } from "../../components/Card";
import { Dialog } from "../../components/Dialog";
import { Input } from "../../components/Input";
import { Logo } from "../../components/Logo";
import { Title } from "../../components/Title";
import { Transaction } from "../../components/Transaction";
import { Aside, Balance, ChartAction, ChartContainer, ChartContent, Filters, Header, InputGroup, Main, SearchTransaction, Section, TransactionGroup } from "./styles";
import { InputMask } from "@react-input/mask"

export function Home() {
    return (
        <>
            <Header>
                <Logo />
                <div>
                    <Dialog trigger={<Button>Nova transação</Button>}>Olá</Dialog>
                    <Button>Nova categoria</Button>
                </div>
            </Header>

            <Main>
                <Section>
                    <Filters>
                        <Title title="Saldo" subtitle="Receitas e despensas no periodo" />
                        <InputGroup>
                            <InputMask component={Input} mask="dd/mm/aaaa" replacement={{ d: /\d/, m: /\d/, a: /\d/ }} variant="dark" label="Início" placeholder="dd/mm/aaaa" />
                            <InputMask component={Input} mask="dd/mm/aaaa" replacement={{ d: /\d/, m: /\d/, a: /\d/ }} variant="dark" label="Fim" placeholder="dd/mm/aaaa" />
                            <ButtonIcon />
                        </InputGroup>
                    </Filters>
                    <Balance>
                        <Card title="Saldo" amount={123} variant="balance" />
                        <Card title="Saldo" amount={123} variant="incomes" />
                        <Card title="Saldo" amount={123} variant="expenses" />
                    </Balance>
                    <ChartContainer>
                        <header>
                            <Title title="Gastos" subtitle="Despesas por categoria no período" />
                        </header>
                        <ChartContent></ChartContent>
                    </ChartContainer>
                    <ChartContainer>
                        <header>
                            <Title title="Evolução Financeira" subtitle="Saldo, Receitas e Gastos no ano" />
                            <ChartAction>
                                <InputMask component={Input} mask="dd/mm/aaaa" replacement={{ a: /\d/ }} variant="black" label="Ano" placeholder="aaaa" />
                                <ButtonIcon />
                            </ChartAction>
                        </header>

                        <ChartContent></ChartContent>
                    </ChartContainer>
                </Section>
                <Aside>
                    <header>
                        <Title title="Transações" subtitle="Receitas e Gastos no perído" />
                        <SearchTransaction>
                            <Input variant="black" placeholder="Procurar transação" />
                            <ButtonIcon />
                        </SearchTransaction>
                    </header>
                    <TransactionGroup>
                        <Transaction id={1} amount={200000} date="09/09/2024" category={{ title: "Alimentação", color: "#ff33bb" }} title="Mercado" />
                    </TransactionGroup>
                </Aside>
            </Main>
        </>

    );

}