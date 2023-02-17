import { ButtonHTMLAttributes } from 'react';
import { TProps } from './types';

export const Button = ({ ...props }: TProps<ButtonHTMLAttributes<HTMLButtonElement>>) => {
	return (
		<button {...props} className='btn w-full btn-primary flex  btn-blockitems-center'>
			{props.children}
		</button>
	);
};
