import { ChangeEvent, useState, useEffect } from 'react';
import { SIGNUP } from '../apollo/mutations';
import { useMutation } from '@apollo/client';
import { Form, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [errorMassage, setErrorMassage] = useState('');
    const [signUp, { data, error, loading }] = useMutation(SIGNUP);

    const navigate = useNavigate();

    useEffect(() => {
        if (formValues.username.length < 2) {
            setErrorMassage('Username is too short');
        } else {
            setErrorMassage('');
        }
    }, [formValues.email, formValues.password, formValues.username]);

    if (error) {
        console.log('error', error);
        setErrorMassage(error.message);
    }
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            console.log('formValues before', formValues);
            const res = await signUp({
                variables: { input: formValues },
            });
            console.log('formValues after', formValues);

            console.log('data in signup', data);
            toast.success('you Successfully signed up');
            navigate('/signIn');
        } catch (error1: any) {
            toast.error(error1?.message);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
        console.log('formValues', formValues);
    };

    const input_style =
        'form-control dark:text-slate-900 dark:bg-slate-400 placeholder:text-slate-600  block w-full px-4 py-4 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-blue-400 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none';

    return (
        <section className="bg-ct-blue-600 min-h-screen pt-20">
            <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
                <div className="md:w-8/12 lg:w-5/12 bg-white dark:bg-slate-700 px-8 py-10">
                    <h1 className="text-center mb-11 text-3xl font-bold text-blue-500">
                        Sign Up
                    </h1>
                    <Form onSubmit={onSubmit}>
                        {errorMassage && (
                            <p className="text-center bg-red-300 py-4 mb-6 rounded">
                                {errorMassage}
                            </p>
                        )}
                        <div className="mb-6">
                            <input
                                required
                                type="email"
                                name="email"
                                value={formValues.email}
                                onChange={handleChange}
                                placeholder="Email address"
                                className={`${input_style}`}
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                required
                                type="username"
                                name="username"
                                value={formValues.username}
                                onChange={handleChange}
                                placeholder="Username"
                                className={`${input_style}`}
                            />
                        </div>

                        <div className="mb-6">
                            <input
                                required
                                type="password"
                                name="password"
                                value={formValues.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className={`${input_style}`}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                backgroundColor: `${loading ? '#ccc' : ''}`,
                            }}
                            className="inline-block px-7 py-4 bg-blue-400 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                            disabled={loading}
                        >
                            {loading ? 'loading...' : 'Sign Up'}
                        </button>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default Signup;
