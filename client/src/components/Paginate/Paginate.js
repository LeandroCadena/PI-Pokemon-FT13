import { connect } from 'react-redux';
import { changePage } from '../../actions';

export function Paginate({ pokemonsViews, changePage }) {

    const handleClick = (e) => {
        changePage(e.target.value);
    };

    return (
        <div>
            {
                pokemonsViews.length ? pokemonsViews.map((pokemon, index) => (
                    <li
                        key={index}
                        value={index}
                        onClick={(e) => handleClick(e)}
                    >{index + 1}
                    </li>
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
        changePage: (num) => dispatch(changePage(num))
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Paginate);
