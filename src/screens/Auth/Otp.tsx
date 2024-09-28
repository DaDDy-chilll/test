import React, { useState, useRef, ChangeEvent } from 'react';
import { jp } from "@/lang/jp";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Otp: React.FC = () => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (element: ChangeEvent<HTMLInputElement>, index: number) => {
        if (isNaN(Number(element.target.value))) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.target.value : d))]);

        // Focus next input
        if (element.target.value !== '' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
            <div className="w-full sm:max-w-md bg-white p-4 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 mt-8 mb-10 pb-6">{jp.enterOtp}</h2>
                <div className="flex flex-wrap justify-center gap-y-2 mb-10">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            ref={(input) => (inputRefs.current[index] = input)}
                            value={data}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleBackspace(e, index)}
                            className="w-12 h-12 border-2 rounded bg-white text-center text-xl font-bold focus:outline-none focus:border-blue-500 mx-1"
                        />
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-x-2 mr-0 sm:mx-[45px] md:mx-[45px] mb-8">
                    <div className="sm:w-1/3 md:w-1/3 w-full">
                        <Link to="/forgot_password">
                            <button className="mt-6 px-4 py-2 bg-gray-200 rounded w-full border">
                                {jp.back}
                            </button>
                        </Link>
                    </div>
                    <div className="sm:w-2/3 md:w-2/3 w-full">
                        <Button className="mt-6 px-4 py-2 rounded w-full">
                            {jp.verify}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Otp;
