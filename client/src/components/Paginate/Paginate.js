import { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { changePage, filterPokemons, getPokemons, reloadPokemons } from '../../actions';
import { ARROW_ICON, FILTER_VALUES, SORT_VALUES, MODE_VALUES } from '../../utils/constants'
import './Paginate.css';

export function Paginate({ pokemonsViews, changePage, actualPage, loading, reloadPokemons, pokemonsTypes, filterPokemons }) {
    const [maxPage, setMaxPage] = useState(0);
    const [types, setTypes] = useState({
        type: 'ALL',
        dataType: 'ALL',
        sort: 'DEFAULT',
        mode: 'DEFAULT'
    });

    const handleClick = (e) => {
        changePage(e.target.value);
    };

    useEffect(() => {
        setMaxPage(pokemonsViews.length - 1)
    }, [pokemonsViews])

    const previousPage = () => {
        if (actualPage > 0) {
            changePage(parseInt(actualPage) - 1)
        }
    }

    const nextPage = () => {
        if (actualPage < maxPage) {
            changePage(parseInt(actualPage) + 1)
        }
    }

    const handleTypes = (e, data) => {
        setTypes({
            ...types,
            [data]: e.target.value
        })
    }

    return (
        <div>
            {
                < div className={loading.search || !pokemonsViews.length ? 'Pagination-container hidden' : 'Pagination-container'}>
                    <button
                        className='Pag pag-left'
                        onClick={() => previousPage()}
                    ><img alt='loading' className='arrow-left' src={ARROW_ICON} /></button>
                    {
                        loading.pokemons ? (<div className='loading-pagination'>Paging...</div>) :
                            pokemonsViews.map((pokemon, index) => (
                                <button
                                    key={index}
                                    className={parseInt(actualPage) === index ? 'Pag actual' : 'Pag'}
                                    value={index}
                                    onClick={(e) => handleClick(e)}
                                >{index + 1}
                                </button>
                            ))
                    }
                    <button
                        className='Pag pag-right'
                        onClick={() => nextPage()}
                    ><img alt='loading' className='arrow' src={ARROW_ICON} /></button>
                </div>
            }
            <div className='second-bar'>
                <div className='reload'>
                    <button
                        className='btn-second'
                        onClick={() => reloadPokemons()}
                    >RELOAD POKEMONS</button>
                </div>
                <div className={loading.search || loading.pokemons ? 'filters hidden' : 'filters'}>
                    <span>SELECT</span>
                    <select onChange={(e) => handleTypes(e, 'type')}>
                        <option value={'ALL'}>
                            {'ALL'}
                        </option>
                        {pokemonsTypes && pokemonsTypes.map((type, i) => (
                            <option key={i} value={type.name}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                    <span>FROM</span>
                    <select onChange={(e) => handleTypes(e, 'dataType')}>
                        {FILTER_VALUES && FILTER_VALUES.map((type, i) => (
                            <option key={i} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    <span>ORDER BY</span>
                    <select onChange={(e) => handleTypes(e, 'sort')}>
                        {SORT_VALUES && SORT_VALUES.map((s, i) => (
                            <option key={i} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    <select onChange={(e) => handleTypes(e, 'mode')}>
                        {MODE_VALUES && MODE_VALUES.map((m, i) => (
                            <option key={i} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                    <button
                        className='btn-second'
                        onClick={() => filterPokemons(types)}
                    >FILTER</button>
                </div>
            </div>
        </div >
    )
}

function mapStatetoProps(state) {
    return {
        actualPage: state.actualPage,
        pokemonsViews: state.pokemonsViews,
        pokemonsTypes: state.pokemonsTypes,
        loading: state.loading,
        error: state.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPokemons: () => dispatch(getPokemons()),
        changePage: (num) => dispatch(changePage(num)),
        reloadPokemons: () => dispatch(reloadPokemons()),
        filterPokemons: (type) => dispatch(filterPokemons(type))
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Paginate);
