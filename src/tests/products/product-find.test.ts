import request from "supertest";
import { app } from "../../api";

describe("GET /products/:id", () => {
    test("Should return a 404 if product does not exist", async () => {
        const response = await request(app)
            .get("/products/6979135412042d553e7a8313")
            .send();

        expect(response.status).toBe(404);
        expect(response.body).toStrictEqual({
            message: "Product not found",
        });
    });

    test("Given an existing product, return it", async () => {
        // tengo que crear un producto y guardarme su id
        const createdProductResponse = await request(app).post("/products").send({
            name: "iPhone 17",
            description: "poco uso",
        });

        const productId = createdProductResponse.body.content._id;
        // petición de ese producto
        const response = await request(app).get(`/products/${productId}`).send();

        // comprobar que el API me devuelve ese producto
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            content: {
                name: "iPhone 17",
                description: "poco uso",
            },
        });
    });
});

describe("GET /products", () => {
    test("Should return a list of products", async () => {
        await request(app).post("/products").send({
            name: "product1",
            description: "description1",
        });
        await request(app).post("/products").send({
            name: "product2",
            description: "description2",
        });

        const response = await request(app).get("/products").send();

        expect(response.body.content.length).toBe(2);
        expect(response.body.content[0].name).toEqual("product1");
        expect(response.body.content[1].name).toEqual("product2");
    });

    test("Should return an empty array when there are no products", async () => {
        const response = await request(app).get("/products").send();

        expect(response.body.content.length).toBe(0);
    });
});
