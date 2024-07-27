import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, ChangeEvent, FormEvent } from 'react';
import login, {  LoginResponse,  } from '@/networks/mutations/auth/login';

interface LoginFormData {
  email : string;
  password : string
}

const LoginScreen = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const queryClient = useQueryClient();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const mutation = useMutation<LoginResponse, Error, LoginFormData>({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      queryClient.setQueryData(['user'], data.user);
      console.log('Login successful:', data);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Logging in...' : 'Login'}
      </button>
      {mutation.isError && <div>Error: {mutation.error.message}</div>}
    </form>
  );
};

export default LoginScreen;
