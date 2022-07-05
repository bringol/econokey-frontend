const urlBaseWebServices = 'http://localhost:5000';

const urlCreateVault = urlBaseWebServices + '/vault';
const urlGetVault = urlBaseWebServices + '/vault';
const urlLoginVault = urlBaseWebServices + '/login';
const urlGenerator = urlBaseWebServices + '/generate';

const getUrlElements = function (type, method) {
    switch (method) {
        case "GET":
            return urlBaseWebServices + '/vault/' + type + 's/';
        case "DELETE":
        case "PUT":
        case "POST":
            return urlBaseWebServices + '/vault/' + type + 's/' + type;
        default:
            break;
    }
}

export const createVault = async function (vault) {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "vault_name": vault.name,
            "vault_key": vault.key
        });

        var requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let response = await fetch(urlCreateVault, requestOptions);
        let code = response.status;
        let data = await response.json();
        switch (code) {
            case 200:
                return ({ code: code, mensaje: "OK", data: data });
            default:
                return ({ code: code, mensaje: "Ha ocurrido un error", data: null });
        }
    }
    catch (error) {
        console.log("error", error);
    };
}

export const loginVault = async function (vault) {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "vault_name": vault.name,
            "vault_key": vault.key
        });

        var requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let response = await fetch(urlLoginVault, requestOptions);
        let code = response.status;
        let data = await response.json();
        switch (code) {
            case 200:
                return ({ code: code, mensaje: "OK", data: data });
            default:
                return ({ code: code, mensaje: "Ha ocurrido un error", data: data });
        }
    }
    catch (error) {
        console.log("error", error);
    };
}

export const generatePassphrase = async function (delimitador, longitud, capitalizacion) {

    let capitalize;
    switch (capitalizacion) {
        case "Título":
            capitalize = "Capitalize";
            break;
        case "MAYÚSCULA":
            capitalize = "UPPERCASE";
            break;
        case "minúscula":
            capitalize = "lowercase";
            break;
        default:
            break;
    }

    let delimiter;
    if (delimitador !== '')
        delimiter = delimitador
    else
        delimiter = "random"

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
        "generator_type": "passphrase",
        "parameters": {
            "capitalization_type": capitalize,
            "delimiter": delimiter,
            "word_count": longitud
        }
    });

    var requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: myHeaders,
        body: raw,
    };

    let response = await fetch(urlGenerator, requestOptions);

    let code = response.status;
    let data = await response.json();
    switch (code) {
        case 200:
            {
                /*localStorage.setItem("x", data.loginUser.token);
                let user = data.loginUser.user;
                localStorage.setItem("nombre", user.name);
                localStorage.setItem("email", user.email);*/

                return ({ code: code, mensaje: "OK", data: data });
            }
        default:
            return ({ code: code, mensaje: "Ha ocurrido un error", data: null });

    }
}

export const generatePassword = async function (lower, upper, digit, symbol, longitud) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
        "generator_type": "password",
        "parameters": {
            "lower": lower,
            "upper": upper,
            "digit": digit,
            "symbol": symbol,
            "lenght": longitud
        }
    });

    var requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: myHeaders,
        body: raw,
    };

    let response = await fetch(urlGenerator, requestOptions);

    let code = response.status;
    let data = await response.text();
    switch (code) {
        case 200:
            {
                /*localStorage.setItem("x", data.loginUser.token);
                let user = data.loginUser.user;
                localStorage.setItem("nombre", user.name);
                localStorage.setItem("email", user.email);*/

                return ({ code: code, mensaje: "OK", data: data });
            }
        default:
            return ({ code: code, mensaje: "Ha ocurrido un error", data: null });

    }
}

export const generateCryptoWallet = async function (walletName, cryptoCurrency) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
        "generator_type": "wallet",
        "parameters": {
            "wallet_name": walletName,
            "cryptocurrency": cryptoCurrency
        }
    });

    var requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: myHeaders,
        body: raw,
    };

    let response = await fetch(urlGenerator, requestOptions);

    let code = response.status;
    let data = await response.json();
    switch (code) {
        case 200:
            {
                /*localStorage.setItem("x", data.loginUser.token);
                let user = data.loginUser.user;
                localStorage.setItem("nombre", user.name);
                localStorage.setItem("email", user.email);*/

                return ({ code: code, mensaje: "OK", data: data });
            }
        default:
            return ({ code: code, mensaje: "Ha ocurrido un error", data: null });

    }
}

///METODO PARA OBTENER TODOS LOS ELEMENTOS DE LA BOVEDA
export const getAllElementosBoveda = async function (userToken) {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + userToken);

        var requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: myHeaders,
            redirect: 'follow'
        };

        let response = await fetch(urlGetVault, requestOptions);
        let code = response.status;
        let data = await response.json();
        switch (code) {
            case 200:
                const notes = [...data.notes].map(v => ({ ...v, type: 'note', icon: 'default-note' }));
                const passwords = [...data.passwords].map(v => ({ ...v, type: 'pass' }));
                const wallets = [...data.wallets].map(v => ({ ...v, type: 'wallet' }));
                let accounts = [...notes, ...passwords, ...wallets]
                return ({ code: code, mensaje: "OK", data: accounts, vaultId: data.vault_id, vaultName: data.vault_name });
            default:
                return ({ code: code, mensaje: "Ha ocurrido un error", data: null });
        }
    }
    catch (error) {
        console.log("error", error);
    };
}

///METODO PARA AGREGAR ELEMENTO A LA BOVEDA
export const addElementoBoveda = async function (elemento, userToken) {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + userToken);

        var raw = JSON.stringify({
            element_type: elemento.element_type,
            element: elemento.element
        });

        var requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let response = await fetch(getUrlElements(elemento.element_type, 'POST'), requestOptions);
        let code = response.status;
        let data = await response.json();
        switch (code) {
            case 200:
                return ({ code: code, mensaje: "OK", data: data });
            default:
                return ({ code: code, mensaje: "Ha ocurrido un error", data: null });
        }
    }
    catch (error) {
        console.log("error", error);
    };
}

///METODO PARA BORRAR ELEMENTO DE LA BOVEDA
export const deleteElementoBoveda = async function (element_id, element_type, userToken) {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + userToken);

        var raw = JSON.stringify({
            element_id: element_id
        });

        var requestOptions = {
            method: 'DELETE',
            mode: 'cors',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let response = await fetch(getUrlElements(element_type, 'DELETE'), requestOptions);
        let code = response.status;
        let data = await response.json();
        switch (code) {
            case 200:
                return ({ code: code, mensaje: "OK", data: data });
            default:
                return ({ code: code, mensaje: "Ha ocurrido un error", data: null });
        }
    }
    catch (error) {
        console.log("error", error);
    };
}

///METODO PARA EDITAR ELEMENTO DE LA BOVEDA
export const editElementoBoveda = async function (element_id, elemento, userToken) {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + userToken);

        var raw = JSON.stringify({
            element_id: element_id,
            element: elemento.element
        });

        var requestOptions = {
            method: 'PUT',
            mode: 'cors',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let response = await fetch(getUrlElements(elemento.element_type, 'POST'), requestOptions);
        let code = response.status;
        let data = await response.json();
        switch (code) {
            case 200:
                return ({ code: code, mensaje: "OK", data: data });
            default:
                return ({ code: code, mensaje: "Ha ocurrido un error", data: null });
        }
    }
    catch (error) {
        console.log("error", error);
    };
}