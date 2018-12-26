const selectCostTotal = (cards) => {
  return cards.map((card) => {
    if (card.puca === 0) {
      return 0
    } else {
      return card.euro * card.sent + card.sent * card.shipping
    }
  }).reduce((a, b) => {
    return a + b
  }, 0)
}

export default selectCostTotal
