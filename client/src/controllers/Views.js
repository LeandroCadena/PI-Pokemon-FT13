export default function setViews(pokemons, type) {
    const views = []
    let view = [];

    let array = pokemons;

    if (type) {
        array = pokemons.filter(pokemon => {
            let check = false;
            pokemon.Types.forEach(pokeType => {
                if (pokeType.name === type) check = true;
            })
            if (check) return pokemon;
        })
    }
    const amount = array.length

    for (let i = 0; i < amount; i++) {
        view.push(array[i]);
        if (view.length === 12 || i === amount - 1) {
            views.push(view);
            view = []
        };
    }

    return views;
}