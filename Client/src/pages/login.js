import React from 'react';

const Login = (props) => {
    const { email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError } = props;

    return (
        <section className='login'>
            <div className='loginContainer'>
                <label>Email</label>
                <input
                    type='text'
                    autoFocus
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <p className="errorMsg">{emailError}</p>
                <label>Password</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                />
                <p className="errorMessage">{passwordError}</p>

                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                            <button onClick={handleLogin}>Sign In</button>
                            <p>
                                Dont have an account?
                            <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span>
                            </p>
                        </>
                    ) : (
                        <>
                            <button onClick={handleSignup}>Sign up</button>
                            <p>
                                have an account?
                            <span onClick={() => setHasAccount(!hasAccount)}>Signin</span>
                            </p>
                        </>

                    )

                    }

                </div>
            </div>

        </section>
    )
}

export default Login;