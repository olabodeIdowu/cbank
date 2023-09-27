import LoginForm from '../features/authentication/LoginForm';

export default function Login() {
  return (
    <main className='loginLayout'>
      <h1>Login</h1>
      <p className='loginHeader'>Sign In to your account</p>
      <LoginForm />
    </main>
  );
}
