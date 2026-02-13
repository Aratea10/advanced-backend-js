export class Product {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly createdAt: Date;

    constructor({
        name,
        description,
        id,
        createdAt,
    }: {
        name: string;
        description: string;
        id: string;
        createdAt: Date;
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
    }
}
