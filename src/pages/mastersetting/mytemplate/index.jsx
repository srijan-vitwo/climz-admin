import React, { useEffect, useState } from 'react';
import {
	Box,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	TabIndicator,
	Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Alltemplate from '../questionmaster.jsx/alltemplate';
import Loader from '../../../assets/images/loader.gif';

const MyTemplate = () => {
	const navigate = useNavigate();
	const [loader, setLoader] = useState(false);
	const token = localStorage.getItem('token');
	const [template, setTemplate] = useState();
	useEffect(() => {
		const addDepartment = async () => {
			try {
				setLoader(true);
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/all-template`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (response.ok) {
					const data = await response.json();
					setTemplate(data.data);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		addDepartment();
	}, []);

	return (
		<Tabs position='relative' variant='unstyled'>
			<TabList
				sx={{
					'& .chakra-tabs__tab': {
						borderRadius: '15px 15px 0px 0px',
						color: 'claimzTextBlueLightColor',
						fontSize: '1.6rem',
						fontWeight: '700',
						pb: '10px',
						pt: '10px',
					},
					'& .chakra-tabs__tab[aria-selected=true]': {
						borderRadius: '15px 15px 0px 0px',
						color: 'white',
						bg: 'claimzMainGeadientColor',
					},
				}}>
				<Tab>My Template</Tab>
				<Tab>All Template</Tab>
			</TabList>
			<TabIndicator
				mt='-2.5px'
				height='3px'
				bg='claimzTextBlueLightColor'
				borderRadius='1px'
			/>
			<TabPanels>
				<TabPanel p='0px 0px 0px' height='calc(100vh - 188px)'>
					<Box
						height='calc(100vh - 188px)'
						background='#F6F9F8'
						border='1px solid #CECECE'
						boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
						borderRadius='0px 0px 6px 6px'
						padding='0px 10px'>
						f
					</Box>
				</TabPanel>
				<TabPanel p='0px 0px 0px' height='calc(100vh - 188px)'>
					<Box
						background='#F6F9F8'
						border='1px solid #CECECE'
						boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
						borderRadius='0px 0px 6px 6px'
						padding='15px'>
						{loader ? (
							<Box
								height='calc(100vh - 188px)'
								width='100%'
								display='flex'
								justifyContent='center'
								alignItems='center'>
								<Image src={Loader} alt='Loader' />
							</Box>
						) : (
							<Alltemplate template={template} />
						)}
					</Box>
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default MyTemplate;
