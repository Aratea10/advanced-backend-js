export class Product {
    readonly name: string;
    readonly description: string;

    constructor({ name, description }: { name: string; description: string }) {
        this.name = name;
        this.description = description;
    }
}
