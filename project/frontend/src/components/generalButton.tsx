type buttonProps = {
    text: string,
    action?: () => void,
    type: 'submit' | 'button'
}

export default function GeneralButton({text, action, type}:buttonProps){
    return(
        <button type={type} onClick={action} className="w-20 h-8 rounded-4xl bg-blue-600/40">{text}</button>
    )
}