type buttonProps = {
    text: string,
    action?: () => void,
    type: 'submit' | 'button'
}

export default function GeneralButton({text, action, type}:buttonProps){
    return(
        <button type={type} onClick={action} className="transition-transform active:scale-95 hover:scale-103 duration-500 hover:cursor-pointer hover:bg-blue-500/60 w-20 h-8 rounded-4xl bg-blue-600/60 p-1 text-center">{text}</button>
    )
}