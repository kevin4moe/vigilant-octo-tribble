module.exports = {
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            backgroundColor: ["hover", "active"],
            borderRadius: ["focus"],
            textColor: ["hover"],
        },
    },
    plugins: [],
};
