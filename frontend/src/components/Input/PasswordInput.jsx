import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ value, onChange, disabled, placeholder }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="relative">
            <input
                type={show ? "text" : "password"}
                placeholder={placeholder}
                className="input-box pr-12 !text-black"
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            <button
                type="button"
                className="absolute right-3 top-7 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                onClick={() => setShow(!show)}
            >
                {show ? (
                    <FaRegEye
                        size={22}
                        className='text-primary cursor-pointer'
                    />
                ) : (
                    <FaRegEyeSlash
                        size={22}
                        className='text-slate-400 cursor-pointer'
                    />
                )}
            </button>
        </div>
    );
};

export default PasswordInput