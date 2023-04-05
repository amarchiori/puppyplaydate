import React from 'react'
import { UseControllerProps, Controller } from 'react-hook-form'

interface FloatingLabelInputProps
  extends UseControllerProps {
  label: string;
  type: string
  name: string;
  control: any;
}

const CustomInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, name, type, control, ...props }, ref) => {

  return (
    <>
          {/* <input 
              id={name}
              type={type}
              ref={register}
              {...props}
              placeholder=" "
              className="
              w-full h-16 p-3 pt-4 placeholder-transparent border-b-2 border-t-0 border-x-0 bg-transparent border-mainGreen peer focus:outline-none focus:border-gray-500 focus:shadow-sm
              "/>
          <label 
              htmlFor={name}
              className="
              absolute top-0 left-0 h-full px-3 py-5 text-sm transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1
              "
          >
              {label} 
          </label> */}
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <div className="relative z-10 w-2/3 m-auto pb-5">
                  <input
                    type={type}
                    placeholder=''
                    ref={ref}
                    value={value || ''}
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.value)}
                    className='
                    w-full h-16 p-3 pt-4 focus:ring-transparent placeholder-transparent border-b-2 border-t-0 border-x-0 bg-transparent border-mainGreen peer focus:outline-none focus:border-mainGreen focus:shadow-sm
                    '
                    {...props}
                    />
                    <label 
                    htmlFor={name}
                    className="
                    absolute top-0 left-0 h-full px-3 py-10 text-lg transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-10 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1
                    ">
                    {label} 
                    </label>
              </div>
            )
            }
          />
    </>
  )
}
)

export default CustomInput;