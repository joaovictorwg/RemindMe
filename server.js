import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify()

const database = new DatabaseMemory()

server.post('/cards', (request, response) => {
    const {title, description, deadline} = request.body

    database.create({
        title: title,
        description: description,
        deadline: deadline
    })

    return response.status(201).send()
})

server.get('/cards', (request) => {
    const search = request.query.search

    const cards = database.list(search)

    return cards
})

server.put('/cards/:id', (request, response) => {
    const cardId = request.params.id
    const {title, description, deadline} = request.body


    database.update(cardId, {
        title: title,
        description: description,
        deadline: deadline
    })

    return response.status(204).send
})

server.delete('/cards/:id', (request, response) => {
    const cardId = request.params.id
    
    database.delete(cardId)

    return response.status(204).send
})

server.listen({
    port: 3333
})