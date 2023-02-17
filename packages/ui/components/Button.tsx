import { ButtonHTMLAttributes } from 'react';
import { TProps } from './types';

export const Button = ({ ...props }: TProps<ButtonHTMLAttributes<HTMLButtonElement>>) => {
	const className = (props?.className || '').concat(` btn w-full btn-primary flex  btn-blockitems-center`);
	return (
		<button {...props} className={className}>
			{props.children}
		</button>
	);
};
