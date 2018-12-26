const getVisibleCards = (cards, { text }) => {
    return cards.filter((card) => {
        return card.description.toLowerCase().includes(text.toLowerCase());
    })
}

export default getVisibleCards
