import { randomUUID } from "crypto"

export class DatabaseMemory{
    #cards = new Map()
    
    create(card) {
        const cardId = randomUUID()

        this.#cards.set(cardId, card)
    }

    list(search){
        return Array.from(this.#cards.entries()).map((cardArray) => {
            const id = cardArray[0]
            const data = cardArray[1]

            return {
                id, 
                ...data
            }
        })
        .filter(card => {
            if (search) {
                return card.title.includes(search)
            }

            return true
        })
    }

    update(id, card) {
        this.#cards.set(id, card)
    }

    delete(id){
        this.#cards.delete(id)
    }

}