import { PropsType } from "./button"

export const Input = ({className , placeholder , type} : any)=>{
    return (
        <input type={type} placeholder={placeholder} className={className} />
    )
}