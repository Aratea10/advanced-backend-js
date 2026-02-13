export interface ProductRepository {
    createOne({ name, description }: { name: string; description: string }): Promise<void>;
}
