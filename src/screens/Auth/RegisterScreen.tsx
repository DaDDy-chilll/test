import { useMutation } from '@tanstack/react-query';
import { useState, ChangeEvent, FormEvent } from 'react';
import register, { registerErrResponse, registerResponse } from '@/networks/mutations/auth/register';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const RegisterScreen = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const mutation = useMutation<registerResponse, registerErrResponse, FormData>({
    mutationFn: (data: FormData) => register(data),
    onSuccess: (data) => {
      // handle success (e.g., navigate to another page, show a success message)
      console.log('Registration successful:', data);
    },
    onError: (error) => {
      // handle error (e.g., show an error message)
      console.error('Registration failed:', error);
    }
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
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
        {mutation.isPending ? 'Registering...' : 'Register'}
      </button>
      {mutation.isError && <div>Error: {mutation.error.message}</div>}
    </form>
  );
};

export default RegisterScreen;
