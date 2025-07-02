import { Icon } from "@iconify-icon/react";
import Button from "./Button";

interface GoogleLoginProps {
	isLoading: boolean;
	onClick: () => void;
}

const GoogleLoginButton = ({ isLoading, onClick }: GoogleLoginProps) => {
	return (
		<Button 
            onClick={onClick}
            isLoading={isLoading}
            fullWidth
            className="flex items-center justify-center"

        >
			<Icon
				icon="logos:google-icon"
				width="20"
				height="20"
				className="mr-2 text-current"
			/>
			Entrar com o Google
		</Button>
	);
};

export default GoogleLoginButton;
