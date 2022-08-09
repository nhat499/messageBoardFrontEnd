function increment(number) {
    return {
        type: 'INCREMENT',
        payload: number
    }
}

function decrement(number) {
    return {
        type: 'DECREMENT',
        payload: number
    }
}

export {increment, decrement};
