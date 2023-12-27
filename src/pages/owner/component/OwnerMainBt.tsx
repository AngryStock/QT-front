// OwnerMainBt.tsx
import React from 'react';

interface OwnerMainBtProps {
    data: string;
}

const OwnerMainBt: React.FC<OwnerMainBtProps> = ({ data }) => {
    return (
        <button className='bg-rose-300 w-32 h-14 flex justify-center items-center  rounded-lg '>{data}</button>
    );
};

export default OwnerMainBt;
