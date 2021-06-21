const defaultTypes = {
    type: 'ALL',
    dataType: 'ALL',
    sort: 'DEFAULT',
    mode: 'DEFAULT',
}

export default function setViews(pokemons, types = defaultTypes) {
    const views = [];
    let view = [];
    const regExp = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;

    let array = pokemons;
    const type = types.type;
    const dataType = types.dataType;
    const sort = types.sort;
    const mode = types.mode;

    if (type !== 'ALL') {
        array = pokemons.filter(pokemon => {
            let check = false;
            pokemon.Types.forEach(pokeType => {
                if (pokeType.name === type) check = true;
            })
            if (check) return pokemon
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

    const sortedArray = sortArray(array, sort, mode);

    const amount = sortedArray.length

    for (let i = 0; i < amount; i++) {
        view.push(sortedArray[i]);
        if (view.length === 12 || i === amount - 1) {
            views.push(view);
            view = []
        };
    }

    return views;
}



const sortArray = (array, sort, mode) => {
    if (sort === 'NAME' || sort === 'ATTACK') {
        let compare = 'attack'
        let model = [-1, 1];
        if (sort === 'NAME') {
            compare = 'name'
        }
        if (mode === 'DESCENDENT') {
            model = [1, -1]
        }
        const sortedArray = array.sort((a, b) => {
            if (a[compare] < b[compare]) return model[0];
            if (a[compare] > b[compare]) return model[1];
            return 0;
        })
        return sortedArray;

    } else {
        return array;
    }
}