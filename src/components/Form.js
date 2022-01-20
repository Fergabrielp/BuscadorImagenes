import React, { useState } from 'react'
import Error from './Error'

const Form = ({ setBusqueda }) => {

    const [termino, setTermino] = useState("")
    const [error, setError] = useState(false)
    const buscarImagenes = e => {
        e.preventDefault()

        //Validacion

        if(termino.trim() === ''){
            setError(true)
            return
        }
        setError(false)

        //Enviamos la busqueda hacia el componente principal

        setBusqueda(termino)
    }

    return (
        <form
            onSubmit={buscarImagenes}
        >
            <div className='row'>
                <div className='form-group col-md-8'>
                    <input 
                        type="text"
                        className='form-control form-control-lg'
                        placeholder='Ej: Computers'
                        onChange={e => setTermino(e.target.value) }
                    />
                </div>
                <div className='form-group col-md-4'>
                    <input 
                        type="submit"
                        className='btn btn-lg btn-danger btn-block'
                        value="Search"
                    />
                </div>
            </div>

            {error ? <Error mensaje= "No puede haber espacios en blanco"/> : null}

        </form>
    )
}

export default Form
