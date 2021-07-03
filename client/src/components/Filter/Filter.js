import React, { useState } from 'react'
import { connect } from 'react-redux';
import { filterPokemons, reloadPokemons } from '../../actions';
import { FILTER_VALUES, SORT_VALUES, MODE_VALUES, POKEMON_LOGO } from '../../utils/constants'
import './Filter.css'

export function Filter({ reloadPokemons, filterPokemons, loading, pokemonsTypes }) {
    const [types, setTypes] = useState({
        type: 'ALL',
        dataType: 'ALL',
        sort: 'DEFAULT',
        mode: 'DEFAULT'
    });

    const handleTypes = (e, data) => {
        setTypes({
            ...types,
            [data]: e.target.value
        })
    }

    return (
        <div className='first-bar'>
            <img className='pokemon-logo' src={POKEMON_LOGO}></img>
            <div className='second-bar'>
                {/* FILTER */}
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
                    {/* RELOAD BUTTON */}
                    <button
                        className='btn-second not-hidden'
                        onClick={() => reloadPokemons()}
                    >RELOAD POKEMONS</button>
                </div>
            </div>
        </div>
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
        reloadPokemons: () => dispatch(reloadPokemons()),
        filterPokemons: (type) => dispatch(filterPokemons(type))
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Filter);