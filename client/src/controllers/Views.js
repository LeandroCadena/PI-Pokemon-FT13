export default function setViews(pokemons, types) {
    const views = [];
    let view = [];
    const regExp = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;

    let array = pokemons;
    const type = types.type;
    const dataType = types.dataType;

    if (type !== 'ALL') {
        array = pokemons.filter(pokemon => {
            let check = false;
            pokemon.Types.forEach(pokeType => {
                if (pokeType.name === type) check = true;
            })
            if (check) return pokemon;
        })
    }

    if (dataType !== 'ALL') {
        const APP = [];
        const API = [];

        array.forEach(poke => {
            if (regExp.test(poke.id)) {
                APP.push(poke);
            } else {
                API.push(poke);
            }
        })
        if (dataType === 'API') array = API;
        if (dataType === 'APP') array = APP;
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