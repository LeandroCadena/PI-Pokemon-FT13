import React from 'react'
import './AddPokemon.css'
export default function AddForm({
    handleSubmit,
    handleChange,
    handleTypes,
    forms,
    pokemonsTypes,
    Types,
    Errors,
    Alert,
    image,
}) {
    const models = ['name', 'hp', 'attack', 'defense', 'speed', 'height', 'weight'];
    return (
        <form className='form-container' onSubmit={e => { handleSubmit(e) }}>
            <div className='form-header'>
                <h1>CREATE A NEW POKEMON</h1>
                <img src={image} alt='image' />
                {Alert.create ? (
                    <h5>
                        The Pokemon was created successfully
                    </h5>
                ) : null}
                <button className='btn-second btn-form' type='submit'>
                    CREATE
                </button>
            </div>
            <div className='form-content'>
                {forms &&
                    forms.map((el, i) => (
                        <div className='form-input' key={i}>
                            <div key={i}>
                                <label className='label' key={i} >
                                    {el.label}*
                                    {
                                        Alert.errors ? (
                                            <span className='error'>{Errors[models[i]]}</span>
                                        ) : null
                                    }
                                </label>
                            </div>
                            <input
                                className={Alert.errors ? Errors[models[i]] ? 'error-input' : 'input' : 'input'}
                                key={el.name}
                                name={el.name}
                                type='text'
                                autoComplete='off'
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    ))}
                <div className='types-form'>🔥 Types*
                    {
                        Alert.errors ? (
                            <span className='error'>{Errors['type']}</span>
                        ) : null
                    }
                </div>
                <div className='types-container'>
                    <select onChange={(e) => handleTypes(e)}>
                        {pokemonsTypes &&
                            pokemonsTypes.map((type, i) => (
                                <option key={i} value={type.name}>
                                    {type.name}
                                </option>
                            ))}
                    </select>
                    {Types &&
                        Types.map((el, i) => (
                            <span key={i}>
                                <label>{el}</label>
                            </span>
                        ))}
                    <span>
                        {
                            Types.length ? Types.length : '0'
                        }
                        /2
                    </span>
                </div>
            </div>
        </form>
    )
}
