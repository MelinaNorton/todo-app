type buttonProps = {
    text: string,
    action?: () => void,
    type: 'submit' | 'button'
}

export default function GeneralButton({text, action, type}:buttonProps){
    return(
        <button type={type} onClick={()=> action} className="w-12 h-7 rounded-4xl bg-blue-600/40">{text}</button>
    )
}