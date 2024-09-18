// src/pages/Loading.tsx
import React from 'react';
import { Progress } from "@/components/ui/progress";
import logo2 from '@/assets/icons/Group 48687@2x.png' // shadcn/ui Loader component

const Loading: React.FC = () => {
    return (
        <>
            <div className="flex items-center justify-center h-screen bg-neutral-100">

                {/* Loading Spinner */}
                <div className="flex flex-col items-center">
                    <div className="hidden lg:flex items-center justify-center w-1/3 p-8">
                        <img src={logo2} alt="Logo" className="max-w-full h-auto" />
                    </div>
                    <Progress value={33} />
                </div>
            </div>
        </>

    );
};

export default Loading;
