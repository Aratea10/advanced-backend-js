import express from 'express'
import mongoose from 'mongoose'

const app = express();

try {
    await mongoose.connect('mongodb://admin:admin123@localhost:27017/db?authSource=admin');
    console.log('mongodb connected =)');

} catch (error) {
    console.log("mongodb error: ", error);
}

app.get('/example', (request, response) => {
    response.json({
        info: "first endpoint"
    })
})

app.listen(3000, () => {
    console.log("up & running on port: ", 3000);
})
