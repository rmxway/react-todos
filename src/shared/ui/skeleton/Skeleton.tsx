import { SkeletonBase } from './styled';

interface SkeletonProps {
	width?: string;
	height?: string;
	className?: string;
}

export const Skeleton = ({ width, height, className }: SkeletonProps) => (
	<SkeletonBase $width={width} $height={height} className={className} />
);
