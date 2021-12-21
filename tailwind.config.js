const colors = require('tailwindcss/colors')

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                sky: colors.sky,
                blueGray: colors.blueGray
            },
            backgroundImage: {
                nightBg: "url('/src/images/night.jpg')",
            },
            backgroundColor: {
                translucentWhite: 'rgba(255, 255, 255, 0.5)'
            },
            fontSize: {
                '10xl': [
                    '12rem',
                    {
                        lineHeight: 1,
                    },
                ],
            },  
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
