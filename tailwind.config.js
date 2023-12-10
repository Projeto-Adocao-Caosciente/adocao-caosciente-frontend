/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react')
const lineclamp = require('@tailwindcss/line-clamp')
module.exports = {
    content: [
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        screens: {
            xs: '320px',
            sm: '480px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '[2xl]': '1536px',
        },
        extend: {},
    },
    darkMode: 'class',
    plugins: [nextui(), lineclamp],
}
