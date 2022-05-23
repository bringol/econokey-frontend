import React, {Component} from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

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
        //console.log(this.state.form);
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
                        <NavLink to="/" style={{ textDecoration: 'none'}}><button className="btn btn-success d-grid gap-2 col-6 mx-auto" >Entrar</button></NavLink>
                        <br/>
                        <NavLink to="/register" style={{ textDecoration: 'none'}}><button className="btn btn-success d-grid gap-2 mx-auto" >Crear nueva boveda</button></NavLink>
                    </div>   
                </div>   
            </div>
        );
    }
}

export default Login;