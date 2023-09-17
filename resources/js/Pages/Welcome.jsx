import { Link, Head } from '@inertiajs/react';
import { BsCartPlusFill } from 'react-icons/bs';
import { CiShoppingCart } from 'react-icons/ci';
import { AiTwotoneDelete } from 'react-icons/ai';
import axios from 'axios';
import { router } from '@inertiajs/react'
import { useEffect, useState } from "react";

export default function Welcome({ auth, laravelVersion, phpVersion, product, goback, cart , displaycart, cartItems}) {
    const [count, setCount] = useState(cart);

    const handleCartIconClick = async (productId) => {
        try {
            await axios.post(route('product.add', [productId, count*1 + 1]));
            setCount(count*1 + 1);
        } catch (error) {
            console.log(error);
        }
    };


    const increment = async (productId, quantity) => {
        try {
            let count = quantity*1 + 1;
            router.post(route('setCartProductQuantity' , {
                id: productId,
                quantity: count,
            }))

            // setCount(count*1 + 1);
        } catch (error) {
            console.log(error);
        }
    };

    const decrement = async (productId, quantity) => {
        try {
            let count = quantity*1 - 1;
            router.post(route('setCartProductQuantity' , {
                id: productId,
                quantity: count,
            }))

            // setCount(count*1 + 1);
        } catch (error) {
            console.log(error);
        }
    };


    const del = async (id) => {
        try {
            router.post(route('delcart' , {
                id: id,
            }))

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
    }, [cart, count]);

    if(displaycart){
        return (
            <>
                <Head title="Welcome" />
                <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                    <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right flex justify-around w-60">

                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Log in
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    <div className=" p-6 lg:p-8">
                        <div className="mt-16">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                <table className="table-auto">
                                    <thead className='bg-amber-50 border-2'>
                                    <tr>
                                        <th>name</th>
                                        <th>quantity</th>
                                        <th>action</th>
                                    </tr>
                                    </thead>
                                    <tbody className='text-gray-200'>
                                    {
                                        cartItems.map((e,i)=>{
                                            return(
                                    <tr key={i}>
                                        <td>{e.name}</td>
                                        <td className='flex justify-center'>
                                            {e.total_quantity}
                                        </td>

                                        <td className='border-2'>
                                            <span className='cursor-pointer text-2xl mx-2'
                                            onClick={()=>{
                                                increment(e.product_id, e.total_quantity)
                                            }}
                                            >+</span>
                                            <span  onClick={()=>{
                                                decrement(e.product_id, e.total_quantity)
                                            }} className='cursor-pointer text-2xl mx-2'>-</span>
                                            <span onClick={()=>{
                                                del(e.product_id)
                                            }} className='cursor-pointer text-red-500 text-xl mx-2'>Del</span>
                                        </td>
                                    </tr>
                                            )
                                        })
                                    }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                            <Link className='text-red-300' href={'/'}>Go Back</Link>
                    </div>
                </div>
            </>
        );

    }


    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right flex justify-around w-60">
                    <Link href={route('cart')} className='addcart' style={{ 'position': 'relative' }}>
                        <CiShoppingCart className='text-amber-50' size={50} />
                        <span style={{ position: "absolute", 'left': '40%', 'top': '28%' }} className='text-white'> {count} </span>
                    </Link>
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <div className="mt-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            {product.map((e, i) => (
                                <Link key={i} href={route('products.show', e.id)}
                                      className="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"
                                >
                                    <div>
                                        <div className="h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                className="w-7 h-7 stroke-red-500"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0-2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                                />
                                            </svg>
                                        </div>
                                        <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                                            {e.name}
                                        </h2>
                                        <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                            {e.description}
                                        </p>
                                        <h2 className='text-gray-500'>{e.price} Gel</h2>
                                    </div>
                                    <BsCartPlusFill
                                        onClick={(event) => {
                                            event.preventDefault();
                                            handleCartIconClick(e.id)
                                        }}
                                        style={{ 'zIndex': 999999999 }}
                                        className='text-white' />
                                </Link>
                            ))}
                        </div>
                        {goback ? <Link className='text-gray-500' href={'/'}>Go Back</Link> : ''}
                    </div>
                </div>
            </div>
        </>
    );
}
