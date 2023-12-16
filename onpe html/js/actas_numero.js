var boton = document.getElementById('holaboton');
boton.addEventListener("click", async(e) =>{
    e.preventDefault();
    const id = document.getElementById('nroMesa').value;
    const data = await fetch('https://oaemdl.es/onpe_sweb_php/actas/numero/000176');
    const info = await data.json();
    if(info.Departamento == undefined){
        alert("No es un numero de actas valido")
    }else{
    
    }
});