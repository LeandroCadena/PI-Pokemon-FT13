export default function setViews(pokemons) {
    const amount = pokemons.length
    const views = []
    let view = [];
    for (let i = 0; i < amount; i++) {
        view.push(pokemons[i]);
        if (view.length === 12 || i === amount - 1) {
            views.push(view);
            view = []
        };
    }
    return views;
}