/** @type {import('next').NextConfig} */


const nextConfig = {
    reactStrictMode:true,
    env: {
        API_ENDPOINT: 'https://ecomm-api-puce.vercel.app/api',
        // API_ENDPOINT: 'http://localhost:5000/api',

        EMAILJS_PUB_KEY: process.env.EMAILJS_PUB_ID,
        EMAILJS_SERV_ID: process.env.EMAILJS_SERV_ID,
        EMAILJS_TEMP_ID: process.env.EMAILJS_TEMP_ID,
    }
};

export default nextConfig;
