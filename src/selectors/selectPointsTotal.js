const selectPointsTotal = (cards) => {
  return cards.map((card) => {
    if (card.puca) {
      return card.puca * card.sent
    } else {
      return 0
    }
  }).reduce((a, b) => {
    return a + b
  }, 0)
}

export default selectPointsTotal
