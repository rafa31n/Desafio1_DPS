import './App.css';
import { data } from './data/data.js';
import { useEffect, useState } from 'react';
import { Picker } from './components/Picker';


function App() {

  const [selectValor, setSelectValor] = useState();
  const [productos, setProductos] = useState([])
  const [lista, setLista] = useState([])
  const [total, setTotal] = useState(0);
  const [montoRespaldo, setMontoRespaldo] = useState();
  useEffect(() => {

    function obtenerData() {
      setProductos(data)
    }

    obtenerData();
  }, [])


  const handleSelect = (e) => {
    setSelectValor(e.target.value)
  }

  const clearValues = () => {

    
    setSelectValor("");
    const productoName = document.getElementById('producto').innerHTML = '';
  }

  const handleClick = () => {

    const productoName = document.getElementById('producto')
    const nombre = productoName.innerText;
    if (nombre.trim() === '') {
      alert('No ha seleccioando nada.')
      return;
    }

    const filtrado = productos.filter(producto => producto.nombre == nombre)
    if (filtrado) {
      setLista([...lista, filtrado[0]])
    }

    if (lista.length == 0) {
      const lista = document.getElementById('lista')
      lista.classList.remove('lista')
      lista.classList.add('lista-visible')
    }

    clearValues();
  }

  const handleInput = (e, precio, nombre) => {

    let totalMonto;
    const input = document.getElementById(nombre).value
    if (input !== '') {
      const valor = e.target.value;
      const valorNum = parseInt(valor)
      totalMonto = precio * valorNum;
      setMontoRespaldo(totalMonto)
      setTotal(prevTotal => prevTotal + totalMonto);
    }

    if (input === '') {
      setTotal(prevTotal => prevTotal - montoRespaldo)
    }
  }

  const eliminarProducto = (id, precio, nombre) => {

    const cantidad = document.getElementById(nombre).value
    if (cantidad !== '') {
      const entero = parseInt(cantidad)
      const suma = precio * entero;
      setTotal(prevTotal => prevTotal - suma)
    }

    const nuevaLista = lista.filter((value, index) => index !== id);
    setLista(nuevaLista);

    if (nuevaLista.length === 0) {
      const lista = document.getElementById('lista');
      lista.classList.remove('lista-visible');
      lista.classList.add('lista');
    }
  }

  return (

    <>
      <div className="flex justify-center items-center mt-5">


      
        <div className='block'>
        <h1 className='mb-10 mt-5 text-4xl font-medium'>Listado de productos</h1>
          <select className='border border-slate-700 p-2' value={selectValor} onChange={handleSelect}>
            <option value="">Seleccione un producto por favor.</option>
            {
              productos.map((element, i) => (
                <Picker key={i} Nombre={element.nombre} Precio={element.precio} Id={i} />
              ))
            }
          </select>
          <button className="ml-10 bg-slate-500 text-center p-4 w-48 text-white" onClick={handleClick}>Agregar</button><br/>

          <div className='hidden'>
          <p >Elemento Seleccionado:</p><p id='producto'>{selectValor}</p>
          </div>
          
      

        <div id='lista' className='lista'>
          <h1 className='mt-40 text-2xl mb-5'>Lista de productos:</h1>

          {
         lista.map((value, i) => (
          <div key={i} className='flex items-center justify-between border-b border-gray-300 py-3'>
            <p>Producto: {value.nombre} - Precio: $ {value.precio} </p>
            <div className='flex items-center'>
              <input className='border border-zinc-800 mr-2 p-1' type='text' id={value.nombre} onChange={(e) => handleInput(e, value.precio, value.nombre)} />
              <button className='bg-red-400 p-2' onClick={() => eliminarProducto(i, value.precio, value.nombre)}>X</button>
            </div>
          </div>
        ))
          }

          <h3 className='mt-28 text-3xl'>Total: $ {total.toFixed(2)} </h3>
        </div>

        </div>
      </div>



    </>
  );
}

export default App;
