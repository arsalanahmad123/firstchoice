import React from 'react';
import {  Bar } from 'react-chartjs-2';

function Donut() {
    return (
        <div className='-pb-9'>
            <div className='flex flex-col md:justify-around md:flex-row  '>
                <div className='w-[400px] '>
                    <Bar
                        id="bar"
                        data={{
                            labels: ['A', 'B', 'C'],
                            datasets: [
                                {
                                    label: 'Citrus Disease Detection',
                                    data: [10, 20, 90]
                                },
                            ],

                        }}
                    />
                </div>
            </div>
           
        </div>
    );
}

export default Donut;
