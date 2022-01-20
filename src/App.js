import React, { useState, useEffect } from 'react'
import Form from './components/Form';
import ImagesList from './components/ImagesList';

function App() {

  const [busqueda, setBusqueda] = useState('')
  const [images, setImages] = useState([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)

  useEffect(() => {
    
    const consultarApi = async () => {

      if(busqueda === '') return

      const imagenesPorPagina = 30
      const key = '25191045-6de108590f890cac02c8f97e9'
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`
      const resp = await fetch(url)
      const res = await resp.json()

      setImages(res.hits)

      const calcularTotalPaginas = Math.ceil( res.totalHits / imagenesPorPagina )
      setTotalPaginas(calcularTotalPaginas)

      const jumbo = document.querySelector('.jumbotron')
      jumbo.scrollIntoView({behavior: 'smooth'})
    }
    consultarApi()

  }, [busqueda, paginaActual])

  const paginaAnterior = () => {

    const nuevaPaginaActual = paginaActual - 1
    if(nuevaPaginaActual === 0) return
    setPaginaActual(nuevaPaginaActual)

  }

  const paginaSiguiente = () => {

    const nuevaPaginaActual = paginaActual + 1
    if(nuevaPaginaActual > totalPaginas) return
    
    setPaginaActual(nuevaPaginaActual)

  }

  return (
    <div className='container'>
      <div className='jumbotron'>
        <p className='lead text-center'>Search Images</p>
        <Form 
          setBusqueda={setBusqueda}
        />
      </div>
      <div className='row justify-content-center'>
          <ImagesList 
            images={images}
          />

         {(paginaActual === 1)? null :(
            <button
            type='button'
            className='bbtn btn-info mr-1'
            onClick={paginaAnterior}
          >&laquo; Anterior</button>
         )}

          {(paginaActual === totalPaginas)? null: (
            <button
            type='button'
            className='bbtn btn-info'
            onClick={paginaSiguiente}
          >Siguiente &raquo;</button>
          )}

      </div>
    </div>
  );
}

export default App;
