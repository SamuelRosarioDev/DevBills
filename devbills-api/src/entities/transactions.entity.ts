import { Category } from "./category.entity";

export enum TransactionType {
    INCOME = "income",
    EXPENSE = "expense",
}

type TransactionProps = {
    _id?: string;
    title: string;
    amount: number;
    date: Date;
    category: Category;
    type: TransactionType;
    userId: string; // ✅ Adicionar userId
}

export class Transaction {
    public _id?: string;
    public title: string;
    public amount: number;
    public date: Date;
    public category: Category;
    public type: TransactionType;
    public userId: string; // ✅ Adicionar userId

    constructor({ _id, title, amount, date, category, type, userId }: TransactionProps) {
        this._id = _id;
        this.title = title;
        this.amount = amount;
        this.date = new Date(date);
        this.category = new Category(category);
        this.type = type;
        this.userId = userId; // ✅ Inicializar userId
    }
}