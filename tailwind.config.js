/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                darkorange: '#d2734f',
                lightGold: '#ffbb2a',
                bgDarkColor: '#0F172A',
                bgLight: '#172033',
                card1: '#D2EFF3',
                card2: '#FFFAC3',
                card3: '#DBCAFF',
                card4: '#FFCDBC',
                card5: '#a7e2c9',
            },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['night'],
    },
}
