import react from '@vitejs/plugin-react';

export default {
    plugins: [
        react({
            include: '**/*.js' // Allow JSX in .js files
        })
    ]
};
