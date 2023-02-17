import React from 'react';

export const ErrorLabel = ({ message }: { message: string | undefined }) => {
	if (!message) return <></>;
	return <span className='text-red-500 text-sm'>{message}</span>;
};
