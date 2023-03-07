import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai'

const Search = () => {
    return (
        <div className='pt-20'>
            <form className='px-4 mb-8'>
                <div className='flex justify-center items-center gap-4 bg-slate-700 rounded p-1'>
                    <AiOutlineSearch size={20} />
                    <input type='text' placeholder='search for a movie or show' className='z-10 text-white w-full rounded bg-slate-600 py-1 px-4 focus:border-none' />
                </div>
            </form>
            <div className='w-full h-full'>
                <h1 className='px-8 text-gray-400'>Search by Genre</h1>
                <ul>
                    <li>
                        <div className='border border-gray-400 p-8 hover:bg-slate-600 cursor-pointer'>
                            <h1 className='text-3xl'>Action</h1>
                        </div>
                    </li>
                    <li>
                        <div className='border border-gray-400 p-8 hover:bg-slate-600 cursor-pointer'>
                            <h1 className='text-3xl'>Anime</h1>
                        </div>
                    </li>

                    <div className='border border-gray-400 p-8 hover:bg-slate-600 cursor-pointer'>
                        <h1 className='text-3xl'>Comedy</h1>
                    </div>
                    <li>
                        <div className='border border-gray-400 p-8 hover:bg-slate-600 cursor-pointer'>
                            <h1 className='text-3xl'>Crime</h1>
                        </div>
                    </li>
                    <li>
                        <div className='border border-gray-400 p-8 hover:bg-slate-600 cursor-pointer'>
                            <h1 className='text-3xl'>Documentaries</h1>
                        </div>
                    </li>
                    <li>
                        <div className='border border-gray-400 p-8 hover:bg-slate-600 cursor-pointer'>
                            <h1 className='text-3xl'>Drama</h1>
                        </div>
                    </li>
                    <li>
                        <div className='border border-gray-400 p-8 hover:bg-slate-600 cursor-pointer'>
                            <h1 className='text-3xl'>Fantasy</h1>
                        </div>
                    </li>
                    <li>
                        <div className='border border-gray-400 p-8 hover:bg-slate-600 cursor-pointer'>
                            <h1 className='text-3xl'>Horror</h1>
                        </div>
                    </li>
                    <li>
                        <div className='border border-gray-400 p-8 hover:bg-slate-600 cursor-pointer'>
                            <h1 className='text-3xl'>Romance</h1>
                        </div>
                    </li>
                    <li>
                        <div className='border border-gray-400 p-8 hover:bg-slate-600 cursor-pointer'>
                            <h1 className='text-3xl'>Sci-Fi</h1>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Search