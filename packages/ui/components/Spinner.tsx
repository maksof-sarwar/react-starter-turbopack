import { SVGAttributes, SVGProps } from 'react';

type SpinnerProps = SVGProps<SVGElement> & {
	size?: number;
	title?: string;
};
export const Spinner = ({ size = 35, title = 'Loading', ...props }: SpinnerProps) => (
	<>
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='inline bg-transparent m-0 fill-white'
			width={size}
			height={size}
			viewBox='0 0 100 100'
			preserveAspectRatio='xMidYMid'
			{...props}>
			<g>
				<circle cx={72.214} cy={67.045} fill='#fff' r={4}>
					<animateTransform
						attributeName='transform'
						type='rotate'
						calcMode='spline'
						values='0 50 50;360 50 50'
						keySplines='0.5 0 0.5 1'
						repeatCount='indefinite'
						dur='1.4925373134328357s'
						begin='0s'
					/>
				</circle>
				<circle cx={67.045} cy={72.214} fill='#fff' r={4}>
					<animateTransform
						attributeName='transform'
						type='rotate'
						calcMode='spline'
						values='0 50 50;360 50 50'
						keySplines='0.5 0 0.5 1'
						repeatCount='indefinite'
						dur='1.4925373134328357s'
						begin='-0.062s'
					/>
				</circle>
				<circle cx={60.715} cy={75.869} fill='#fff' r={4}>
					<animateTransform
						attributeName='transform'
						type='rotate'
						calcMode='spline'
						values='0 50 50;360 50 50'
						keySplines='0.5 0 0.5 1'
						repeatCount='indefinite'
						dur='1.4925373134328357s'
						begin='-0.125s'
					/>
				</circle>
				<circle cx={53.655} cy={77.76} fill='#fff' r={4}>
					<animateTransform
						attributeName='transform'
						type='rotate'
						calcMode='spline'
						values='0 50 50;360 50 50'
						keySplines='0.5 0 0.5 1'
						repeatCount='indefinite'
						dur='1.4925373134328357s'
						begin='-0.187s'
					/>
				</circle>
				<circle cx={46.345} cy={77.76} fill='#fff' r={4}>
					<animateTransform
						attributeName='transform'
						type='rotate'
						calcMode='spline'
						values='0 50 50;360 50 50'
						keySplines='0.5 0 0.5 1'
						repeatCount='indefinite'
						dur='1.4925373134328357s'
						begin='-0.25s'
					/>
				</circle>
				<circle cx={39.285} cy={75.869} fill='#fff' r={4}>
					<animateTransform
						attributeName='transform'
						type='rotate'
						calcMode='spline'
						values='0 50 50;360 50 50'
						keySplines='0.5 0 0.5 1'
						repeatCount='indefinite'
						dur='1.4925373134328357s'
						begin='-0.312s'
					/>
				</circle>
				<circle cx={32.955} cy={72.214} fill='#fff' r={4}>
					<animateTransform
						attributeName='transform'
						type='rotate'
						calcMode='spline'
						values='0 50 50;360 50 50'
						keySplines='0.5 0 0.5 1'
						repeatCount='indefinite'
						dur='1.4925373134328357s'
						begin='-0.375s'
					/>
				</circle>
				<circle cx={27.786} cy={67.045} fill='#fff' r={4}>
					<animateTransform
						attributeName='transform'
						type='rotate'
						calcMode='spline'
						values='0 50 50;360 50 50'
						keySplines='0.5 0 0.5 1'
						repeatCount='indefinite'
						dur='1.4925373134328357s'
						begin='-0.437s'
					/>
				</circle>
				<animateTransform
					attributeName='transform'
					type='rotate'
					calcMode='spline'
					values='0 50 50;0 50 50'
					keySplines='0.5 0 0.5 1'
					repeatCount='indefinite'
					dur='1.4925373134328357s'
				/>
			</g>
		</svg>

		<span className='text-white inline-block'>{title}</span>
	</>
);
