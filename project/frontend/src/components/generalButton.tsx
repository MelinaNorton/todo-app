type buttonProps = {
    text: string,
    action?: () => void,
    type: 'submit' | 'button'
}

export default function GeneralButton({text, action, type}:buttonProps){
    return(
        <button type={type} onClick={action} className="transition-transform active:scale-95 hover:scale-105 duration-500 hover:cursor-pointer hover:bg-blue-600/50 w-20 h-8 rounded-4xl bg-blue-600/60">{text}</button>
    )
}