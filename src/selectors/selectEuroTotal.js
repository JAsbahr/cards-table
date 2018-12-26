const selectEuroTotal = (cards) => {
  return cards.map((card) => {
    if (card.sent === 0) {
      return 0
    } else {
      return card.sent * card.euro
    }
  }).reduce((a, b) => {
    return a + b
  }, 0)
}

export default selectEuroTotal
