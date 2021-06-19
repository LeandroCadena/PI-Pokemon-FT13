import { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { changePage } from '../../actions';
import { ARROW_ICON } from '../../utils/constants'
import './Paginate.css'

export function Paginate({ pokemonsViews, changePage, actualPage }) {
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
        <div className='Pagination-container'>
            <button
                className='Pag pag-left'
                onClick={() => previousPage()}
            ><img className='arrow-left' src={ARROW_ICON} /></button>
            {
                pokemonsViews.length ? pokemonsViews.map((pokemon, index) => (
                    <button
                        key={index}
                        className={parseInt(actualPage) === index ? 'Pag actual' : 'Pag'}
                        value={index}
                        onClick={(e) => handleClick(e)}
                    >{index + 1}
                    </button>
                )) : (<div className='loading-pagination'>Paging...</div>)
            }
            <button
                className='Pag pag-right'
                onClick={() => nextPage()}
            ><img className='arrow' src={ARROW_ICON} /></button>
        </div>
    )
}

function mapStatetoProps(state) {
    return {
        pokemonsLoaded: state.pokemonsLoaded,
        actualPage: state.actualPage,
        pokemonsViews: state.pokemonsViews,
        error: state.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changePage: (num) => dispatch(changePage(num))
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Paginate);
