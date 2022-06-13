
let accounts = [
    {id: 1, titulo: 'Gmail', descripcion: 'Gmail.com', type: 'pass', userName: 'email@gmail.com', password: 'contraseña123', comentarios: 'gmail principal', url: 'http://link'},
    {id: 2, titulo: 'Binance', descripcion: 'Virtual Wallet', type: 'wallet', userName: 'email@gmail.com', password: 'strongpass2', comentarios: 'gmail principal', url: 'http://link'},
    {id: 3, titulo: 'Nota', descripcion: '', type: 'note', comentarios: 'gmail principal'}
  ];


///METODO PARA OBTENER TODOS LOS ELEMENTOS DE LA BOVEDA
export const getAllElementosBoveda= async function()
{
    let data = accounts;
    return ({code:200,mensaje:"OK", mensajeDetalle:"", data});
}

///METODO PARA AGREGAR ELEMENTO A LA BOVEDA
export const addElementoBoveda= async function(elemento)
{
    accounts.push(elemento);
    let data = elemento;
    return ({code:200,mensaje:"OK", mensajeDetalle:"", data});
}

///METODO PARA BORRAR ELEMENTO DE LA BOVEDA
export const deleteElementoBoveda= async function(id)
{
    accounts=accounts.filter(account => account.id !== id);
    let data;
    return ({code:200,mensaje:"OK", mensajeDetalle:"", data});
}

///METODO PARA EDITAR ELEMENTO DE LA BOVEDA
export const editElementoBoveda= async function(id, elemento)
{
    accounts=accounts.map(account => (account.id === id ? elemento : account));
    let data;
    return ({code:200,mensaje:"OK", mensajeDetalle:"", data});
}





///Ejemplo metodo login
export const login= async function(login)
{
    /*//url webservices
    let url = urlWebServices.login;

    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('email', login.email);
    formData.append('password', login.password);
    try
    {
        
        let response = await fetch(url,{
            method: 'POST',
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
            
        });
        
        let rdo = response.status;
        let data = await response.json();
            switch(rdo)
            {
                case 201:
                {
                    localStorage.setItem("x",data.loginUser.token);
                    let user = data.loginUser.user;
                    localStorage.setItem("nombre",user.name);
                    localStorage.setItem("email",user.email);
                    
                    return ({rdo:0,mensaje:"Ok"});//correcto
                }
                case 202:
                {
                    //error mail
                    return ({rdo:1,mensaje:"El mail ingresado no existe en nuestra base."});
                }
                case 203:
                {
                    //error password
                    return ({rdo:1,mensaje:"La contraseña no es correcta."});
                }
                case 400:
                    {
                        return({rdo:1, mensaje:data.message})
                    }
                default:
                {
                    //otro error
                    return ({rdo:1,mensaje:"Ha ocurrido un error"});                
                }
            }
    }
    catch(error)
    {
        console.log("error",error);
    };*/
}