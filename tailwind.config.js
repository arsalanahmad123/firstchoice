/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                darkorange: '#d2734f',
                bgDarkColor: '#1f1f1f',
                bgLight: '#252525',
                
            },
        },
    },
    plugins: [require('daisyui')],
}
