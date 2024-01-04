import React from 'react';

type Props = {
    children: React.ReactNode;
};

export const Liste = ({ children }: Props) => {
    return <dl className={'list'}>{children}</dl>;
};
