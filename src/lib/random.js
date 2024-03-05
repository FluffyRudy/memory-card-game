function randint(start, end, inclusive=false) {
    return Math.floor(
        Math.random() * (end - start + (inclusive ? 1 : 0))
    );
}

function choice(list) {
    const randomIndex = randint(0, list.length-1);
    return list[randomIndex];
}

function shuffle(list) {
    for (let i = list.length - 1; i >= 0; i--) {
        const j = randint(0, i, true);
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
}

export default {randint, choice, shuffle};