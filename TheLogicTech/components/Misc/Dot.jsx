import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';

export default function DotsMobileStepper({ activeStep }) {
	const theme = useTheme();
	return (
		<MobileStepper
			variant="dots"
			steps={4}
			position="static"
			activeStep={activeStep}
			sx={{
				backgroundColor: 'transparent',
			}}
		/>
	);
}
