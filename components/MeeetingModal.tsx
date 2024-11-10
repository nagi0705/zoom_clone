import React, { ReactNode } from 'react'

interface MeetingModalProps { 
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    children?: ReactNode;
    handleClick?: () => void;
    buttonText?: string;
    image?: string;
    buttonIcon?: string;
}

const MeetingModal = ({ isOpen, onClose, title, className, buttonText, handleClick }: MeetingModalProps) => {
  return (
    <div>MeetingModal</div>
  )
}

export default MeetingModal