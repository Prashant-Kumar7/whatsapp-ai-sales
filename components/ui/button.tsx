export interface PropsType {
    children? : React.ReactNode,
    className? : string
}

export const Button = ({children , className , type} : any)=>{
    return (
        <button type={type} className={className}>
            {children}
        </button>
    )
}