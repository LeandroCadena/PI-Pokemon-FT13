import React, { useState, useEffect } from 'react';
import { DEFAULT_IMAGE, FORMS } from '../../utils/constants';
import AddForm from './AddForm';
import './AddPokemon.css'
import { Validate } from '../../controllers/Validate';
import { connect } from 'react-redux';
import { createNewPokemon } from '../../actions';

export function AddPokemon({ pokemonsTypes, createNewPokemon }) {
    const [Data, setData] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        type: [],
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
        console.log(Errors)
    }, [Errors]);

    useEffect(() => {
        setData({ ...Data, type: Types });
    }, [Types]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(Errors).length) {
            setAlert({ ...Alert, errors: true });
        } else {
            try {
                await createNewPokemon(Data);
                setAlert({ ...Alert, create: true });
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleChange = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value });
    };

    const handleTypes = (e) => {
        Types.length
            ? Types.includes(e.target.value)
                ? setTypes([...Types])
                : setTypes([...Types, e.target.value])
            : setTypes([e.target.value]);
    };

    return (
        <div className='form'>
            <AddForm
                forms={FORMS}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleTypes={handleTypes}
                pokemonsTypes={pokemonsTypes}
                Types={Types}
                Errors={Errors}
                Alert={Alert}
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
        createNewPokemon: (data) => dispatch(createNewPokemon(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPokemon);

