import React from 'react';
import FormInput from '../form-input/Form-input';
import CustomButton from '../button/Custom-button';
import '../../styles/components/Sign-in.styles.scss';

import { auth, signInWithGoogle } from '../../firebase/Firebase.utils';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email:'',
            password:''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;
        try{
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email:'', password:''});

        }catch(error){
            console.log(error);
        }
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value })
    }

    render (){
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name='email' type='email' label="email" value={this.state.email} handleChange = {this.handleChange} required />
                    <FormInput 
                        name='password' 
                        type='password' 
                        label="password"
                        value={this.state.password} 
                        handleChange = {this.handleChange}
                        required />
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn={true}>Sign In With Google</CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;