import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { POKEMON_URL, DEFAULT_IMAGE, POKEMON_IMAGES, FORMS } from '../../utils/constants';
import AddForm from './AddForm';
import { Validate } from '../../controllers/Validate';
import { connect } from 'react-redux';
import { getPokemonTypes } from '../../actions';

export function AddPokemon({ pokemonsTypes, getPokemonTypes }) {
    const [Data, setData] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        type: 1,
        image: DEFAULT_IMAGE,
    });

    const [Errors, setErrors] = useState({});
    const [Types, setTypes] = useState([]);
    const [Alert, setAlert] = useState({ errors: false, create: false });

    useEffect(() => {
        setErrors(Validate(Data));
    }, [Data]);

    useEffect(() => {
        if (!Object.keys(Errors).length) {
            setAlert({ ...Alert, errors: false });
        }
    }, [Errors]);

    useEffect(() => {
        getPokemonTypes();
    }, [getPokemonTypes]);

    useEffect(() => {
        if (Types.length) {
            let total = pokemonsTypes.reduce((acc, el) => {
                if (Types.includes(el.name) === true) {
                    acc.push(el.id);
                }
                return acc;
            }, []);
            setData({ ...Data, type: total });
        }
    }, [Types]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(Errors).length) {
            setAlert({ ...Alert, errors: true });
        } else {
            try {
                await axios.post(POKEMON_URL, Data);
                setAlert({ ...Alert, create: true });
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleSprite = (e) => {
        setData({ ...Data, image: e.target.value });
    };

    const handleChange = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value });
    };

    const handleTypes = (e) => {
        if (Types.length < 2) {
            if (!Types.includes(e.target.value)) {
                setTypes([...Types, e.target.value]);
            }
        } else setTypes([e.target.value]);
    };

    return (
        <div>
            <AddForm
                forms={FORMS}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleTypes={handleTypes}
                handleSprite={handleSprite}
                pokemonsTypes={pokemonsTypes}
                Types={Types}
                Errors={Errors}
                Alert={Alert}
                images={POKEMON_IMAGES}
                image={Data.image}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        pokemonsTypes: state.pokemonsTypes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPokemonTypes: () => dispatch(getPokemonTypes()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPokemon);

