import React, { Component } from 'react'


class EditUser extends Component {

    constructor(props){
        super(props);
        
        this.state = props.user;
    }

    render(){
        return <div>
            <div className="form-group form-row">
                <div className="col-8">
                    <input className="form-control" 
                        type="text" 
                        value={this.state.username} 
                        name="username" 
                        onChange={(e) => this.handleChange(e)} ></input>
                </div>
            </div> 
            <div className="form-group form-row">
               <div className="col-8">   
                    <input className="form-control" 
                        type="text" 
                        value={this.state.email} 
                        name="email" 
                        onChange={(e) => this.handleChange(e)}
                        ></input>    
               </div>
            </div>
            <div className="form-group form-row">
                <button
                    className="btn btn-primary"
                    onClick={(e) => this.props.onSave(this.state)}
                    >Save</button>
             </div>
        </div>
    }

    handleChange(event){
        const input = event.target;
        const value = input.value;
        const name = input.name;

        this.setState({ ...this.state, [name]:value })
    }   
}

export default EditUser