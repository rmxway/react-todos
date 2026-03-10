/** @type {import('next').NextConfig} */
const nextConfig = {
	allowedDevOrigins: ['192.168.1.66'],
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	images: {
		unoptimized: true,
	},
	transpilePackages: [],
};

export default nextConfig;
