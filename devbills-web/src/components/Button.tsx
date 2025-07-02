import { Icon } from "@iconify-icon/react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "secondary" | "success" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: ButtonVariant;
	fullWidth?: boolean;
	isLoading?: boolean;
}

const Button = ({
	children,
	variant = "primary",
	fullWidth = false,
	isLoading = false,
	className,
	disabled,
	...rest
}: ButtonProps) => {
	const variantClasses = {
		primary:
			"bg-primary-500 text-[#051626] font-semibold hover:bg-primary-600 active:translate-y-0",
		outline:
			"border border-primary-500 text-primary-500 hover:bg-primary-500/10",
		secondary: "bg-gray-800 text-white hover:bg-gray-700",
		success: "bg-green-500 text-[#051626] hover:brightness-90",
		danger: "bg-red-500 text-white hover:brightness-90",
	};

	const renderLoading = () => (
		<div className="flex items-center justify-center">
			<Icon
				icon="line-md:loading-loop"
				className="animate-spin -ml-1 mr-2 text-current"
				width="24"
				height="24"
			/>
			{children}
		</div>
	);
	return (
		<button
			type="button"
			className={`cursor-pointer px-5 py-2.5 rounded-xl font-medium transition-all flex items-center justify-center 
				${variantClasses[variant]}
				${isLoading || disabled ? "opacity-70 cursor-not-allowed" : ""}
				${className}
				${fullWidth ? "w-full" : ""}
				
				`}
			disabled={isLoading || disabled}
			{...rest}
		>
			{isLoading ? renderLoading() : children}
		</button>
	);
};

export default Button;
