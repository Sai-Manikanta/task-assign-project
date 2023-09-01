import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Logo from './../components/ui/Logo';
import axios from './../api/axios';

const Signup = () => {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            mobileNumber: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: yup.object().shape({
            name: yup.string().required('First name is required'),
            email: yup.string().email('Invalid email address').required('Email address is required'),
            mobileNumber: yup.string().required('Mobile number is required').matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
            password: yup.string().required('Password is required').matches(/^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/, 'Password must have at least one number and one special character'),
            confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Password and Confirm Password must match').required('Please confirm your password'),
        }),
        onSubmit: values => {
            axios.post('/v1/auth/register', values)
                .then(res => {
                    toast('You have registered successfully', {
                        position: "top-right",
                        autoClose: 1000,
                        theme: "light",
                        type: 'success'
                    });

                    setTimeout(() => {
                        router.push('/login');
                    }, 1000);
                })
                .catch(err => {
                    console.log(err.message)
                })
        },
    });

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Logo />
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-5 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create and account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="text-red-500 mt-1">{formik.errors.name}</div>
                                ) : null}
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your Email
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-red-500 mt-1">{formik.errors.email}</div>
                                ) : null}
                            </div>
                            <div>
                                <label
                                    htmlFor="mobileNumber"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Mobile Number
                                </label>
                                <input
                                    type="text"
                                    name="mobileNumber"
                                    id="mobileNumber"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter mobile number"
                                    value={formik.values.mobileNumber}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                                    <div className="text-red-500 mt-1">{formik.errors.mobileNumber}</div>
                                ) : null}
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Set your Password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="text-red-500 mt-1">{formik.errors.password}</div>
                                ) : null}
                            </div>
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Confirm password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                    <div className="text-red-500 mt-1">{formik.errors.confirmPassword}</div>
                                ) : null}
                            </div>
                            <button
                                type="submit"
                                className="w-full border text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Create an account
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?{" "}
                                <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Login here
                                </Link>
                                {/* <a
                                    href="#"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Login here
                                </a> */}
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signup