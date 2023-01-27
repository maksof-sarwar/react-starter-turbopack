import { HTMLAttributes } from 'react';
export const Button = ({ ...props }: HTMLAttributes<HTMLButtonElement>) => {
	return (
		<button {...props} className='rab-bg-red-700'>
			Boop
		</button>
	);
};
