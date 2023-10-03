const mongoose = require("mongoose")

async function main() {
    try {

        await mongoose.connect('mongodb+srv://ygor:9lkYZFbLDzDgNbQk@local-ygor.etdjedu.mongodb.net/?retryWrites=true&w=majority')

    } catch (error) {
        console.log(error)
    }
}

module.exports = main