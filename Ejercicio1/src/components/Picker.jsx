export const Picker = ({ Nombre, Precio, Id}) => {

  return <>
        <option value={Nombre} key={Id}>
           Nombre: {Nombre} Precio: $ {Precio}
        </option>
  </>;
};


