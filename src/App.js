import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Switch, Typography, styled } from "@mui/material";
import useWindowSize from "./windowSizeListner";
import CloseIcon from '@mui/icons-material/Close';
import Cookies from "universal-cookie";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const styles = {
	root: {
		background: "red",
		width: "200px",
		height: "max-content",
		position: "fixed",
		bottom: "1vh",
		background: "white",
		left: "2vh",
		borderRadius: "1.5rem",
		width: "30rem",
		boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
		zIndex: 9999,
		padding: "0 1.2rem 1rem 1.2rem",
		minHeight: "10rem"
	},
	mobileRoot: {
		left: "50%",
		transform: "translate(-50%)",
		maxWidth: "90%"
	}
}

const IOSSwitch = styled((props) => (
	<Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
	width: 42,
	height: 26,
	padding: 0,
	'& .MuiSwitch-switchBase': {
		padding: 0,
		margin: 2,
		transitionDuration: '300ms',
		'&.Mui-checked': {
			transform: 'translateX(16px)',
			color: '#fff',
			'& + .MuiSwitch-track': {
				backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
				opacity: 1,
				border: 0,
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: 0.5,
			},
		},
		'&.Mui-focusVisible .MuiSwitch-thumb': {
			color: '#33cf4d',
			border: '6px solid #fff',
		},
		'&.Mui-disabled .MuiSwitch-thumb': {
			color:
				theme.palette.mode === 'light'
					? theme.palette.grey[100]
					: theme.palette.grey[600],
		},
		'&.Mui-disabled + .MuiSwitch-track': {
			opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
		},
	},
	'& .MuiSwitch-thumb': {
		boxSizing: 'border-box',
		width: 22,
		height: 22,
	},
	'& .MuiSwitch-track': {
		borderRadius: 26 / 2,
		backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
		opacity: 1,
		transition: theme.transitions.create(['background-color'], {
			duration: 500,
		}),
	},
}));

function getDomainName() {
	const hostname = window.location.hostname;
	const parts = hostname.split('.').reverse();

	// Check if the domain has more than 2 parts
	if (parts.length > 2) {
		return parts[2] + '.' + parts[1] + '.' + parts[0];
	}

	return hostname;
}

function App() {
	const [width, height] = useWindowSize();
	const [isPreferencesOpen, setPreferencesOpen] = React.useState(false);
	const [cookieSettings, setCookieSettings] = React.useState(null);
	const [isCookieModalOpen, setIsCookieModalOpen] = React.useState(false);

	const cookies = React.useMemo(() => new Cookies(), []);

	function gtag() {
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push(arguments);
	}

	const sendConsent = React.useCallback((consent) => {
		gtag('consent', 'default', consent);
	}, []);

	React.useEffect(() => {
		const getConfigFromLocalStorage = window.localStorage.getItem("CookieManagerV1");
		let shouldOpenModal = false;
		if (getConfigFromLocalStorage == null) {
			window.localStorage.setItem("CookieManagerV1", JSON.stringify({ analytics: true, marketting: true, isAccepted: false }));
			shouldOpenModal = true;
		}
		if (cookieSettings == null) {
			const storedConfig = JSON.parse(getConfigFromLocalStorage);
			setCookieSettings(getConfigFromLocalStorage == null ? { analytics: true, marketting: true, isAccepted: false } : storedConfig);
			if (!storedConfig?.isAccepted) shouldOpenModal = true;
		} else {
			window.localStorage.setItem("CookieManagerV1", JSON.stringify(cookieSettings));
			if (!cookieSettings?.isAccepted) shouldOpenModal = true;
		}
		if (shouldOpenModal) {
			setIsCookieModalOpen(shouldOpenModal)
		}
	}, [cookieSettings]);

	const handleAnalyticsSwitch = ev => {
		ev?.stopPropagation();
		const checked = ev?.target?.checked;
		setCookieSettings(prvObj => {
			const newObj = { ...prvObj };
			newObj.analytics = checked;
			return newObj;
		})
	}
	const handleMarkettingSwitch = ev => {
		ev?.stopPropagation();
		const checked = ev?.target?.checked;
		setCookieSettings(prvObj => {
			const newObj = { ...prvObj };
			newObj.marketting = checked;
			return newObj;
		})
	}

	const handleClose = () => {
		setIsCookieModalOpen(false);
	}

	const handleSubmitCookieSettings = () => {
		const consent = {
			'ad_storage': cookieSettings?.marketting ? "granted" : "denied",
			'ad_user_data': cookieSettings?.marketting ? "granted" : "denied",
			'ad_personalization': cookieSettings?.marketting ? "granted" : "denied",
			'analytics_storage': cookieSettings?.analytics ? "granted" : "denied",
		}

		cookies.set("CookieManagerV1-Cookies", consent, {
			expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
			path: "/",
			domain: `.${getDomainName()}`
		})
		window.localStorage.setItem("CookieManagerV1", JSON.stringify({ ...cookieSettings, isAccepted: true }));
		sendConsent(consent);
		console.info("User Submitted Cookies :: ", JSON.stringify(consent));
		handleClose();
	}

	const preventClickprop = ev => ev?.stopPropagation();
	if (!isCookieModalOpen) return <></>;

	return <Box sx={{ ...styles.root, ...(width < 600 ? styles.mobileRoot : null) }}>
		<Box sx={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", height: "3rem" }}>
			<Typography sx={{ textAlign: "center", fontSize: "1.1rem", fontWeight: "400" }}>Manage Consent</Typography>
			<Box sx={{ position: "absolute", height: "100%", right: "0", top: 0, display: "flex", alignItems: "center" }}>
				<CloseIcon sx={{ fontSize: "1.1rem", cursor: "pointer" }} onClick={() => handleClose()} />
			</Box>
		</Box>
		<Box sx={{ minHeight: "8rem", height: "max-content" }}>
			<Box><Typography sx={{ fontSize: "0.8rem" }}>To provide the best experiences, we use technologies like cookies to store and/or access device information. Consenting to these technologies will allow us to process data such as browsing behaviour or unique IDs on this site. Not consenting or withdrawing consent, may adversely affect certain features and functions.</Typography></Box>
			<Box sx={{ height: isPreferencesOpen ? "10rem" : 0, overflow: isPreferencesOpen ? "auto" : "hidden", transition: "height .3s" }}>
				<Accordion disableGutters>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1-content"
						id="panel1-header"
						sx={{ background: "#FAF9F6", borderRadius: "0.8rem" }}
					>
						<Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
							<Typography sx={{ fontSize: "0.9rem" }}>Functional</Typography>
							<Typography sx={{ fontSize: "0.6rem", color: "green" }}>Always Active</Typography>
						</Box>
					</AccordionSummary>
					<AccordionDetails>
						<Typography sx={{ fontSize: "0.6rem" }}>
							These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work. These cookies do not store any personally identifiable information.
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion disableGutters>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2-content"
						id="panel2-header"
						sx={{ background: "#FAF9F6", borderRadius: "0.8rem" }}
					>
						<Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
							<Typography sx={{ fontSize: "0.9rem" }}>Analytics</Typography>
							<IOSSwitch onClick={preventClickprop} onChange={handleAnalyticsSwitch} checked={cookieSettings?.analytics} />
						</Box>
					</AccordionSummary>
					<AccordionDetails>
						<Typography sx={{ fontSize: "0.6rem" }}>
							These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. We may also recommend content to you based on your website activity. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies we will not know when you have visited our site, and will not be able to monitor its performance.
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion disableGutters sx={{ boxShadow: "none" }}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2-content"
						id="panel3-header"
						sx={{ background: "#FAF9F6", borderRadius: "0.8rem" }}
					>
						<Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
							<Typography sx={{ fontSize: "0.9rem" }}>Marketting</Typography>
							<IOSSwitch onClick={preventClickprop} onChange={handleMarkettingSwitch} checked={cookieSettings?.marketting} />
						</Box>
					</AccordionSummary>
					<AccordionDetails>
						<Typography sx={{ fontSize: "0.6rem" }}>
							Cookies that help with our communications and marketing.
							These cookies enable us to show marketing messages and first-party ads, and to measure the effectiveness of our social media presence. They’re also used to group you in a targeting segment with people who have similar interests. Certain cookies in this category are used to provide you with personalised content based on your previous activity on the site.
						</Typography>
					</AccordionDetails>
				</Accordion>
			</Box>
		</Box>
		<Box>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<Button onClick={handleSubmitCookieSettings} variant="contained" sx={{ width: "48%", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>Accept</Button>
				{isPreferencesOpen ?
					<Button onClick={() => setPreferencesOpen(false)} variant="outlined" color="secondary" sx={{ width: "48%", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>Save Preferences</Button> :
					<Button onClick={() => setPreferencesOpen(true)} variant="outlined" sx={{ width: "48%", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>View Preferences</Button>}
			</Box>
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-end", height: "2rem", gap: "0.3rem" }}>
				<Typography color="primary" sx={{ fontSize: "0.6rem", textDecoration: "underline" }}>Cookie Policy</Typography>
				<Typography color="primary" sx={{ fontSize: "0.6rem", textDecoration: "underline" }}>Privacy Statement</Typography>
			</Box>
		</Box>
	</Box >
}

export default App;