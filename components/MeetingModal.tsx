import React, { ReactNode } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface MeetingModalProps { 
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children?: ReactNode;
    handleClick?: () => void;
    buttonText?: string;
}

const MeetingModal = ({ isOpen, onClose, title, children, handleClick, buttonText }: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-dark-1 px-6 py-8 text-white shadow-lg">
            <div className="relative flex flex-col gap-6">
                {/* Close Button */}
                <button
                  className="absolute right-4 top-4 text-gray-400 hover:text-white focus:outline-none"
                  onClick={onClose}
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Title */}
                <h1 className={cn('text-2xl font-semibold text-center')}>
                  {title}
                </h1>

                {/* Content */}
                {children}

                {/* Action Button */}
                <Button
                  className="bg-blue-1 w-full py-3 text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  onClick={handleClick}
                >
                  {buttonText || 'Confirm'}
                </Button>
            </div>
        </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;