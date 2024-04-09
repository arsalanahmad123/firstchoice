import React from 'react'
import Chart from 'react-apexcharts'

const DashboardChart = () => {
    return (
        <>
            <Chart
                type='bar'
                height={200}
                width={900}
                series={[
                    {
                        name: 'Profit',
                        data: [
                            400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380,
                        ],
                    },
                ]}
                options={{
                    chart: {
                        id: 'basic-bar',
                    },
                    xaxis: {
                        categories: [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                        ],
                        labels: {
                            style: {
                                colors: ['#fff'],
                                fontWeight: 'bolder',
                            },
                        },
                    },
                    fill: {
                        colors: ['#ffbb2a'],
                        opacity: 0.9,
                    },
                    tooltip: {
                        theme: 'dark',
                    },
                }}
            />
        </>
    )
}

export default DashboardChart
