import { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { changePage, filterPokemons, getPokemons, reloadPokemons } from '../../actions';
import { ARROW_ICON } from '../../utils/constants'
import './Paginate.css';

export function Paginate({ pokemonsViews, changePage, actualPage, loading }) {
    const [maxPage, setMaxPage] = useState(0);

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
        </div >
    )
}

function mapStatetoProps(state) {
    return {
        actualPage: state.actualPage,
        pokemonsViews: state.pokemonsViews,
        loading: state.loading,
        error: state.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPokemons: () => dispatch(getPokemons()),
        changePage: (num) => dispatch(changePage(num))
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Paginate);
