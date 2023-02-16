import { RegisterOptions, useForm as useRectForm } from 'react-hook-form';

export type TForm = {
	formControl: Array<{
		label: string;
		name: string;
		attributes?: RegisterOptions;
		FormInput: (args) => JSX.Element;
	}>;
	buttonLabel: string;
	onSubmit: (args: any) => void;
};
export const useForm = ({ formControl, onSubmit, buttonLabel }: TForm) => {
	if (!formControl.length) throw new Error(`Form must have at least one element.`);

	const {
		register,
		handleSubmit,
		formState: { errors },
		...rest
	} = useRectForm();

	return {
		form: (
			<form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
				{formControl.map(({ FormInput, label, name, attributes = {} }, key) => (
					<div className='relative z-0 w-full mb-6 group' key={key}>
						{FormInput({ id: name + key, ...register(name, { ...attributes }) })}
						<label
							htmlFor={name + key}
							className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
							{label}
						</label>
						{errors[name] && <span className='text-red-500 text-sm'>{name} is required</span>}
					</div>
				))}
				<button type='submit' className='btn  w-full btn-primary flex  btn-blockitems-center'>
					{buttonLabel}
				</button>
			</form>
		),
		handleFunction: { handleSubmit, ...rest },
	};
};
