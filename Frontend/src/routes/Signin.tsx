import { ChangeEvent, ErrorInfo, FormEvent, useEffect, useState } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';
import { SIGNIN } from '../apollo/mutations';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';
import { RootState } from '../redux/reducers';

const Signin = () => {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [signIn, { loading, error }] = useMutation(SIGNIN);
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);

    useEffect(() => {
        if (formValues.email.length < 2) {
            setErrors('Email is not valid');
        } else {
            setErrors('');
        }
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo, formValues.email]);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            // setFormValues({ email: '', password: '' });

            const res = await signIn({ variables: { input: formValues } });

            console.log('res in login', res);

            toast.success(`Welcome ${res?.data?.signIn?.user.username}`);
            dispatch(setCredentials({ ...res?.data?.signIn?.user }));
            navigate('/');
        } catch (error1: any) {
            toast.error(error?.message);
            toast.error(error1?.message);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const input_style =
        'form-control dark:text-slate-900 dark:bg-slate-400 placeholder:text-slate-600  block w-full px-4 py-4 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-blue-400 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none';

    return (
        <section className="bg-ct-blue-600 min-h-screen pt-20">
            <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
                <div className="md:w-8/12 lg:w-5/12 bg-white dark:bg-slate-700 px-8 py-10">
                    <h1 className="text-center mb-11 text-3xl font-bold text-blue-500">
                        Sign In
                    </h1>
                    <Form method="POST" id="signinForm" onSubmit={onSubmit}>
                        {errors && (
                            <p className="text-center bg-red-300 py-4 mb-6 rounded">
                                {errors}
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
                            {loading ? 'loading...' : 'Sign In'}
                        </button>

                        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                            <p className="text-center font-semibold mx-4 mb-0">
                                OR
                            </p>
                        </div>

                        {/* <a
                            className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded-lg shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                            style={{ backgroundColor: '#3b5998' }}
                            onClick={}
                            role="button"
                        >
                            <img
                                className="pr-2"
                                src="/google.svg"
                                alt=""
                                width={40}
                                height={40}
                            />
                            Continue with Google
                        </a> */}
                        {/* <a
                            className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded-lg shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
                            style={{ backgroundColor: '#55acee' }}
                            onClick={}
                            role="button"
                        >
                            <img
                                className="pr-2"
                                src="/github1.svg"
                                alt=""
                                width={40}
                                height={40}
                            />
                            Continue with GitHub
                        </a> */}
                        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                            <p className="text-center font-serif mx-4 mb-0">
                                Haven't signed up yet?
                            </p>
                        </div>
                        <Link
                            className="px-7 py-2 bg-cyan-500 text-white font-medium text-sm leading-snug uppercase rounded-lg shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
                            to="/signup"
                        >
                            Signup
                        </Link>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default Signin;
