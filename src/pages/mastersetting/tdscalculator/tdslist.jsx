import React, { useEffect, useState } from 'react';
import {
	Box,
	Image,
	Table,
	Thead,
	Tbody,
	Tr,
	Td,
	Th,
	Button,
	Text,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	useToast,
	Input,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../assets/images/loader.gif';

const TdsList = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const [loader, setLoader] = useState(false);
	const [formDetails, setFormDetails] = useState();
	const [products, setProducts] = useState();

	useEffect(() => {
		const departmentList = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/declaration-list`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const response2 = await fetch(
					`${process.env.REACT_APP_API_URL}/all-exempt`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data1 = await response1.json();
					const data2 = await response2.json();

					setProducts(data1.data);
					setFormDetails(data2.data);

					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};

		departmentList();
	}, []);

	const ActionTemplate = (rowData) => {
		const { isOpen, onOpen, onClose } = useDisclosure();

		// const tierUpdate = async (e) => {
		// 	e.preventDefault();
		// 	let formData = new FormData();
		// 	formData.append('department_name', departmentName);
		// 	formData.append('hod', hod);
		// 	formData.append('id', id);

		// 	try {
		// 		setIsLoading(true);
		// 		const response2 = await fetch(
		// 			`${process.env.REACT_APP_API_URL}/department-update`,
		// 			{
		// 				method: 'POST',
		// 				body: formData,
		// 				headers: {
		// 					Authorization: `Bearer ${token}`,
		// 				},
		// 			}
		// 		);

		// 		if (response2.ok) {
		// 			toastCall();
		// 			setsucess(!sucess);
		// 		} else {
		// 			navigate('/login');
		// 		}
		// 	} catch (error) {
		// 		navigate('/login');
		// 	}
		// };

		return (
			<>
				<Button
					onClick={onOpen}
					bg='none'
					_hover={{ bg: 'none' }}
					_active={{ bg: 'none' }}>
					<i className='fa-solid fa-eye fa-2x'></i>
				</Button>
				<Drawer
					isOpen={isOpen}
					placement='right'
					onClose={onClose}
					size='xl'>
					<DrawerOverlay />
					<DrawerContent
						maxW='50% !important'
						bgGradient='linear(180deg, #DCF9FF 0%, #FFFFFF 100%)'>
						<DrawerCloseButton size='lg' />
						<DrawerHeader pt='28px'>
							<Box
								borderBottom='3px solid var(--chakra-colors-claimzBorderColor)'
								width='400px'
								pb='10px'
								mb='15px'>
								<Text
									background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
									backgroundClip='text'
									fontWeight='700'
									fontSize='28px'
									lineHeight='36px'>
									TDS Value Declaration
								</Text>
							</Box>
						</DrawerHeader>

						<DrawerBody>
							<Box
								background='white'
								border='1px dashed #CECECE'
								boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
								borderRadius='6px'
								padding='15px 10px'>
								<Box
									display='flex'
									justifyContent='space-between'
									borderBottom='1px dashed #CECECE'
									pb='5px'
									mb='1px'>
									<Text fontSize='1.7rem' fontWeight='600'>
										Particulars
									</Text>
									<Text fontSize='1.7rem' fontWeight='600'>
										Value
									</Text>
								</Box>
								{formDetails?.map((data, index) => {
									return (
										<Box
											key={index}
											display='flex'
											justifyContent='space-between'
											pt='15px'
											pb='5px'
											mb='1px'>
											<Box>
												<Text mb='5px'>
													{data.exampt}
												</Text>
											</Box>
											<Box>
												<Input type='text' />
											</Box>
										</Box>
									);
								})}

								<Box
									display='flex'
									justifyContent='space-between'
									borderTop='1px dashed #CECECE'
									pt='5px'>
									<Box>
										<Text mb='5px' fontWeight='600'>
											CTC
										</Text>
									</Box>
									<Box>
										<Text mb='5px' fontWeight='600'>
											1500000
										</Text>
									</Box>
								</Box>
							</Box>
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</>
		);
	};

	console.log(formDetails, 'setFormDetails');

	return (
		<>
			{loader ? (
				<Box
					height='calc(100vh - 117px)'
					width='100%'
					display='flex'
					justifyContent='center'
					alignItems='center'>
					<Image src={Loader} alt='Loader' />
				</Box>
			) : (
				<Table>
					<Thead>
						<Tr
							bgGradient='linear(180deg, #256DAA 0%, #02335C 100%)'
							boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
							color='white'
							padding='10px 15px'>
							<Th
								p='15px'
								fontSize='1.5rem'
								fontWeight='600'
								color='white'>
								EMP CODE
							</Th>
							<Th
								p='15px'
								fontSize='1.5rem'
								fontWeight='600'
								color='white'
								textAlign='center'>
								EMP Name
							</Th>
							<Th
								p='15px'
								fontSize='1.5rem'
								fontWeight='600'
								color='white'
								textAlign='center'>
								CTC
							</Th>
							<Th
								p='15px'
								fontSize='1.5rem'
								fontWeight='600'
								color='white'
								textAlign='center'>
								Declaration
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{products?.map((section, index) => (
							<React.Fragment key={index}>
								<Tr key={section?.list[0].id}>
									<Td p='15px'>
										{section?.list[0].emp_code}
									</Td>
									<Td p='15px' textAlign='center'>
										{section?.list[0].emp_name}
									</Td>
									<Td p='15px' textAlign='center'>
										{section?.ctc}
									</Td>
									<Td p='15px' textAlign='center'>
										<ActionTemplate rowData={section} />
									</Td>
								</Tr>
							</React.Fragment>
						))}
					</Tbody>
				</Table>
			)}
		</>
	);
};

export default TdsList;
