import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Bep = () => {
    const id = localStorage.getItem("RestaurantID");
    console.log(id);
    return (
        <div className="">
            <div className="basis-3/4">
                <div className="flex justify-between mt-5 bg-indigo-200 rounded-lg p-5 m-5">
                    <div><p className='font-sans text-2xl font-bold'>Bếp</p></div>
                    
                </div>
                <Outlet/>

            </div>
        </div>
    );
}

export default Bep;