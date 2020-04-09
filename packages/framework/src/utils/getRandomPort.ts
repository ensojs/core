const PORT_MAX = 25555
const PORT_MIN = 20000

export const getRandomPort = () => Math.floor(Math.random() * (PORT_MAX - PORT_MIN) + PORT_MIN)
