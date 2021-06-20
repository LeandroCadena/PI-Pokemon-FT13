import { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { changePage, filterPokemons, getPokemons, reloadPokemons } from '../../actions';
import { ARROW_ICON } from '../../utils/constants'
import './Paginate.css'

export function Paginate({ pokemonsViews, changePage, actualPage, loading, reloadPokemons, pokemonsTypes, filterPokemons }) {
    const [maxPage, setMaxPage] = useState(0);
    const [type, setType] = useState();

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

    const handleTypes = (e) => {
        setType(e.target.value)
    }

    return (
        <div className='second-bar'>
            <div className='reload'>
                <button
                    onClick={() => reloadPokemons()}
                >RELOAD POKEMONS</button>
            </div>
            {
                < div className={loading.search || !pokemonsViews.length ? 'Pagination-container hidden' : 'Pagination-container'}>
                    <button
                        className='Pag pag-left'
                        onClick={() => previousPage()}
                    ><img className='arrow-left' src={ARROW_ICON} /></button>
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
                    ><img className='arrow' src={ARROW_ICON} /></button>
                </div>
            }
            <div className='filters'>
                <div>
                    <span>SELECT TYPE</span>
                    <select onChange={(e) => handleTypes(e)}>
                        {pokemonsTypes && pokemonsTypes.map((type, i) => (
                            <option key={i} value={type.name}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={() => filterPokemons(type)}
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
