import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { changePage } from '../../actions';

export function Paginate({ pokemonsViews, changePage }) {
    const [pages, setPages] = useState();

    useEffect(() => {
        setPages(pokemonsViews.length)
    }, [pokemonsViews])

    const handleClick = (e) => {
		changePage(e.target.value)
        console.log(e.target.value)
	};

    return (
        <div>
            {
                pokemonsViews.length ? pokemonsViews.map((pokemon, index) => (
                    <div
                        key = {index}
                        value= {index}
                        onClick = {e => handleClick(e)}
                    >{index + 1}
                    </div>
                )) : (<div>Cargando...</div>)
            }
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
        changePage: () => dispatch(changePage())
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Paginate);
