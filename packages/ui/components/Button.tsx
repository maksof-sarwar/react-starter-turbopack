import { ButtonHTMLAttributes } from 'react';
import { TProps } from './types';
import { Spinner } from './Spinner';

export type TButtonProps = TProps<ButtonHTMLAttributes<HTMLButtonElement>> & { isLoading?: boolean };
export const Button = ({ isLoading = false, ...props }: TButtonProps) => {
	const className = (props?.className || '').concat(
		`  disabled:bg-yellow-300 btn w-full btn-primary flex  btn-blockitems-center`
	);
	return (
		<button {...props} className={className} disabled={isLoading}>
			{isLoading ? (
				<span className='text-center'>
					<Spinner />
				</span>
			) : (
				props.children
			)}
		</button>
	);
};
