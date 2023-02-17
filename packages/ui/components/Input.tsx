import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { TProps } from './types';

type TInputProps = TProps<InputHTMLAttributes<HTMLInputElement>> & {
	register?: UseFormRegisterReturn<string>;
};
export const Input = ({ ...props }: TInputProps) => {
	const className = (props?.className || '').concat(
		` block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`
	);
	return <input {...(props.register || {})} className={className} {...props} />;
};
