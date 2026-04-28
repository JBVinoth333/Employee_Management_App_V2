import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../../components/InputField';
import ThemeToggle from '../../components/ThemeToggle';
import { apiFetch } from '../../api';
import '../Signup/Signup.css';

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');

    function handleLogin(e) {
        e.preventDefault();
        setMessage('');

        apiFetch('/api/Login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status == 200) {
                    navigate('/dashboard');
                } else {
                    setMessage(data.message);
                }
            })
            .catch(() => {
                setMessage('Something went wrong. Try again.');
            });
    }

    return (
        <>
            <div className="page">
                <form className="card" onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="subtitle">Welcome back</p>

                    {message && <p className="error-msg">{message}</p>}

                    <InputField label="Username" value={username} onChange={setUsername} />
                    <InputField label="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={setPassword} />
                    <label className="checkbox-row">
                        <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                        Show Password
                    </label>

                    <button type="submit">Login</button>

                    <p className="toggle">
                        Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </form>
            </div>
            <div className="theme-toggle-bottom">
                <ThemeToggle />
            </div>
        </>
    );
}

