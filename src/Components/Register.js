import React, {Component} from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Register extends Component {
    state={
        form:{
            username:'',
            password:'',
            repeatedPassword:'',
            fingerprint:''
        }  
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    render(){
        return(
            <div className='containerPrincipal'>
                <div className='containterSecundario'>
                    <div className='form-group'>
                        <label>Usuario: </label>
                        <br/>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            onChange={this.handleChange}
                            />
                        <br/>
                        <label>Contrasenia: </label>
                        <br/>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={this.handleChange}
                            />
                        <br/>
                        <label>Repita la Contrasenia: </label>
                        <br/>
                        <input
                            type="password"
                            className="form-control"
                            name="repeatedPassword"
                            onChange={this.handleChange}
                            />
                        {/*<br/>
                         <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" name="fingerprint"/>
                            <label class="form-check-label" for="flexSwitchCheckDefault">Utilizar huella dactilar</label>
                        </div> 
                        <br/>*/}
                        <br/>
                        <button class="btn btn-success d-grid gap-2 col-6 mx-auto" >Crear</button>
                        <br/>
                        <button class="btn btn-secondary d-grid gap-2 col-6 mx-auto" >Volver</button>
                    </div>   
                </div>   
            </div>
        );
    }
}

export default Register;