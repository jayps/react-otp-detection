import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [value, setValue] = React.useState('')

    React.useEffect(() => {
        if ('OTPCredential' in window) {
            console.log('Setting up OTP listener...');
            const ac = new AbortController();
            navigator.credentials.get({
                otp: {transport: ['sms']},
                signal: ac.signal
            }).then(otp => {
                setValue(otp.code);
            }).catch(err => {
                console.log(err);
            });
        }
    }, []);

    const onChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <div className="App">
            <form>
                <input autoComplete="one-time-code" required value={value} onChange={onChange}/>
                <input type="submit"/>
            </form>
        </div>
    );
}

export default App;
