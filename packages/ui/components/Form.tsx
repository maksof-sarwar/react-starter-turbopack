import { ReactNode } from 'react';
import { UseFormRegister, useForm } from 'react-hook-form';
export type TForm = {
	defaultValues?: Record<string, any>;
	formNode: (register: UseFormRegister<Record<string, any>>) => JSX.Element;
	onSubmit: (args: any) => void;
};
export function Form({ defaultValues = {}, formNode, onSubmit }: TForm) {
	const { handleSubmit, register } = useForm({ defaultValues });

	return <form onSubmit={handleSubmit(onSubmit)}>{formNode(register)}</form>;
}
