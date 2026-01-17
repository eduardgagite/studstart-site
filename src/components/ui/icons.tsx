import { cn } from "@/lib/cn";
import { 
  FaPhone, 
  FaEnvelope,
  FaVk,
  FaTelegram,
  FaInstagram,
  FaArrowUp,
  FaMapMarkerAlt
} from "react-icons/fa";

type IconProps = {
  className?: string;
};

export function ArrowUpIcon({ className }: IconProps) {
  return <FaArrowUp className={cn("h-4 w-4", className)} aria-hidden="true" />;
}

export function MapPinIcon({ className }: IconProps) {
  return <FaMapMarkerAlt className={cn("h-5 w-5 flex-shrink-0", className)} aria-hidden="true" />;
}

export function PhoneIcon({ className }: IconProps) {
  return <FaPhone className={cn("h-5 w-5 flex-shrink-0", className)} aria-hidden="true" />;
}

export function EmailIcon({ className }: IconProps) {
  return <FaEnvelope className={cn("h-5 w-5 flex-shrink-0", className)} aria-hidden="true" />;
}

export function VKIcon({ className }: IconProps) {
  return <FaVk className={cn("h-5 w-5 flex-shrink-0", className)} aria-hidden="true" />;
}

export function TelegramIcon({ className }: IconProps) {
  return <FaTelegram className={cn("h-5 w-5 flex-shrink-0", className)} aria-hidden="true" />;
}

export function InstagramIcon({ className }: IconProps) {
  return <FaInstagram className={cn("h-5 w-5 flex-shrink-0", className)} aria-hidden="true" />;
}

// Helper function to get icon by name
export function getContactIcon(iconName: string, className?: string) {
  const icons: Record<string, React.ReactNode> = {
    phone: <PhoneIcon className={className} />,
    email: <EmailIcon className={className} />,
    vk: <VKIcon className={className} />,
    telegram: <TelegramIcon className={className} />,
    instagram: <InstagramIcon className={className} />,
  };

  return icons[iconName] || null;
}
