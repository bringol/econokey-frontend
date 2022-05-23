import React, {Component} from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends Component {
    state={
        form:{
            username:'',
            password:''
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
                        <button class="btn btn-success d-grid gap-2 col-6 mx-auto" >Entrar</button>
                        <br/>
                        <button class="btn btn-success d-grid gap-2 mx-auto" >Crear nueva boveda</button>
                    </div>   
                </div>   
            </div>
        );
    }
}

export default Login;