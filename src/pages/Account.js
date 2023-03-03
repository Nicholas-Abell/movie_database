import React, { useContext } from 'react';
import { AppContext } from '../App';
import SavedShows from '../components/SavedShows';

const Account = () => {
    const { setSelectedMovie } = useContext(AppContext);
    return (
        <>
            <div className='w-full'>
                <div className='absolute top-[20%] p-4 md:p-8'>
                    <h1 className='text-3xl md:text-5xl font-bold'></h1>
                </div>
            </div>
            <SavedShows setSelectedMovie={setSelectedMovie} />
        </>
    )
}

export default Account