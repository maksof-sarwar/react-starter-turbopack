import { ReactNode } from 'react';
import { FormState, UseFormRegister, useForm } from 'react-hook-form';

type TFormNode<T extends Record<string, any>> = {
	register: UseFormRegister<T>;
	state: FormState<T>;
};
export type TForm<T extends Record<string, any> = Record<string, any>> = {
	defaultValues?: T;
	formNode: ({ register, state }: TFormNode<T>) => JSX.Element;
	onSubmit: (args: any) => void;
};
export const Form = ({ defaultValues = {}, formNode, onSubmit }: TForm) => {
	const { handleSubmit, register, formState } = useForm({ defaultValues });

	return <form onSubmit={handleSubmit(onSubmit)}>{formNode({ register, state: formState })}</form>;
};
