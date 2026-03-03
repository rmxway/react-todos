import { ErrorForm, FormBlock, Label, stringPattern } from './styled';

export { ErrorForm, FormBlock, Label, stringPattern };

interface NavbarFormsProps {
	children: React.ReactNode;
}

export const NavbarForms = ({ children }: NavbarFormsProps) => {
	return <>{children}</>;
};
