/** @type {import('next').NextConfig} */
const nextAuthUrl =
	process.env.NEXTAUTH_URL ??
	(process.env.VERCEL_URL
		? `https://${process.env.VERCEL_URL}`
		: 'http://localhost:3000');

const nextConfig = {
	allowedDevOrigins: ['192.168.1.66'],
	reactStrictMode: true,
	env: {
		NEXTAUTH_URL: nextAuthUrl,
	},
	compiler: {
		styledComponents: true,
	},
	images: {
		unoptimized: true,
	},
	transpilePackages: [],
};

export default nextConfig;
