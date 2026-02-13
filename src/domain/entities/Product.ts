export class Product {
    readonly id: string;
    readonly ownerId: string;
    readonly name: string;
    readonly description: string;
    readonly createdAt: Date;

    constructor({
        name,
        description,
        id,
        ownerId,
        createdAt,
    }: {
        name: string;
        description: string;
        id: string;
        ownerId: string;
        createdAt: Date;
    }) {
        this.id = id;
        this.ownerId = ownerId;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
    }
}
