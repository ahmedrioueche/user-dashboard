import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function UserModal({
  isOpen,
  onClose,
  title,
  children,
}: UserModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px] bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border">
        <DialogHeader>
          <DialogTitle className="text-light-text-primary dark:text-dark-text-primary">
            {title}
          </DialogTitle>
    
        </DialogHeader>
        <div className="p-1">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
