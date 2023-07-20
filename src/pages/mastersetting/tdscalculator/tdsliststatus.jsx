import React, { useEffect, useState } from 'react';
import {
	Box,
	Image,
	Button,
	Text,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Table,
	Thead,
	Tbody,
	Th,
	Tr,
	Td,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	TabIndicator,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../assets/images/loader.gif';

const TDSListStatus = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const [loader, setLoader] = useState(false);
	const [products, setProducts] = useState();

	useEffect(() => {
		const departmentList = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/pending-declaration-list`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data1 = await response1.json();

					setProducts(data1.data);

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

	const ActionTemplate = ({ list }) => {
		const { isOpen, onOpen, onClose } = useDisclosure();

		const groupOne = list?.filter((item) => item.group_id == 1);
		const groupTwo = list?.filter((item) => item.group_id == 2);
		const grouptTree = list?.filter((item) => item.group_id == 3);
		const groupFour = list?.filter((item) => item.group_id == 4);
		const groupfive = list?.filter((item) => item.group_id == 5);
		const groupNamesArray = list.map((item) => item.group_name);
		const uniqueData = [...new Set(groupNamesArray)];

		// Grouping declarations by type_id
		const groupedDeclarationsOne = groupOne?.reduce((acc, declaration) => {
			const typeId = declaration.type_id;
			if (acc[typeId]) {
				acc[typeId].push(declaration);
			} else {
				acc[typeId] = [declaration];
			}
			return acc;
		}, {});

		const groupedDeclarationsTwo = groupTwo?.reduce((acc, declaration) => {
			const typeId = declaration.type_id;
			if (acc[typeId]) {
				acc[typeId].push(declaration);
			} else {
				acc[typeId] = [declaration];
			}
			return acc;
		}, {});

		const groupedDeclarationsThree = grouptTree?.reduce(
			(acc, declaration) => {
				const typeId = declaration.type_id;
				if (acc[typeId]) {
					acc[typeId].push(declaration);
				} else {
					acc[typeId] = [declaration];
				}
				return acc;
			},
			{}
		);

		const groupedDeclarationsFour = groupFour?.reduce(
			(acc, declaration) => {
				const typeId = declaration.type_id;
				if (acc[typeId]) {
					acc[typeId].push(declaration);
				} else {
					acc[typeId] = [declaration];
				}
				return acc;
			},
			{}
		);

		const groupedDeclarationsFive = groupfive?.reduce(
			(acc, declaration) => {
				const typeId = declaration.type_id;
				if (acc[typeId]) {
					acc[typeId].push(declaration);
				} else {
					acc[typeId] = [declaration];
				}
				return acc;
			},
			{}
		);

		const nestedArrayOne = Object.values(groupedDeclarationsOne);
		const nestedArrayTwo = Object.values(groupedDeclarationsTwo);
		const nestedArrayThree = Object.values(groupedDeclarationsThree);
		const nestedArrayFour = Object.values(groupedDeclarationsFour);
		const nestedArrayFive = Object.values(groupedDeclarationsFive);

		const typeNamesArrayOne = nestedArrayOne.map((set) => set[0].type_name);
		const typeNamesArrayTwo = nestedArrayTwo.map((set) => set[0].type_name);
		const typeNamesArrayThree = nestedArrayThree.map(
			(set) => set[0].type_name
		);
		const typeNamesArrayFour = nestedArrayFour.map(
			(set) => set[0].type_name
		);
		const typeNamesArrayFive = nestedArrayFive.map(
			(set) => set[0].type_name
		);

		// const typeNameOne = [...new Set(nestedArrayOneType)];
		// console.log(nestedArrayOne, 'nestedArrayOne');
		// console.log(nestedArrayTwo, 'nestedArrayTwo');
		// console.log(nestedArrayThree, 'nestedArrayThree');
		// console.log(nestedArrayFour, 'nestedArrayFour');
		console.log(nestedArrayOne, 'nestedArrayOne');

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
										'& .chakra-tabs__tab[aria-selected=true]':
											{
												borderRadius:
													'15px 15px 0px 0px',
												color: 'white',
												bg: 'claimzMainGeadientColor',
											},
									}}>
									{uniqueData.map((groupName, index) => (
										<Tab key={index}>{groupName}</Tab>
									))}
								</TabList>
								<TabIndicator
									mt='-2.5px'
									height='3px'
									bg='claimzTextBlueLightColor'
									borderRadius='1px'
								/>
								<TabPanels>
									<TabPanel p='0px 0px 0px'>
										<Box
											background='white'
											border='1px solid #CECECE'
											boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
											borderRadius='0px 0px 6px 6px'
											padding='0px'>
											<Tabs
												position='relative'
												variant='unstyled'>
												<TabList
													sx={{
														'& .chakra-tabs__tab': {
															color: 'claimzTextBlueLightColor',
															fontSize: '1.6rem',
															fontWeight: '700',
															pb: '10px',
															pt: '10px',
														},
														'& .chakra-tabs__tab[aria-selected=true]':
															{
																color: 'white',
																bg: 'claimzMainGeadientColor',
															},
													}}>
													{typeNamesArrayOne.map(
														(groupName, index) => (
															<Tab key={index}>
																{groupName}
															</Tab>
														)
													)}
												</TabList>
												<TabIndicator
													mt='-2.5px'
													height='3px'
													bg='claimzTextBlueLightColor'
													borderRadius='1px'
												/>
												<TabPanels>
													<TabPanel p='0px 0px 0px'>
														<Box
															background='white'
															border='1px solid #CECECE'
															boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
															borderRadius='0px 0px 6px 6px'
															padding='0px'>
															4
														</Box>
													</TabPanel>
												</TabPanels>
											</Tabs>
										</Box>
									</TabPanel>
									<TabPanel p='0px 0px 0px'>
										<Box
											background='white'
											border='1px solid #CECECE'
											boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
											borderRadius='0px 0px 6px 6px'
											padding='0px'>
											<Tabs
												position='relative'
												variant='unstyled'>
												<TabList
													sx={{
														'& .chakra-tabs__tab': {
															borderRadius:
																'15px 15px 0px 0px',
															color: 'claimzTextBlueLightColor',
															fontSize: '1.6rem',
															fontWeight: '700',
															pb: '10px',
															pt: '10px',
														},
														'& .chakra-tabs__tab[aria-selected=true]':
															{
																borderRadius:
																	'15px 15px 0px 0px',
																color: 'white',
																bg: 'claimzMainGeadientColor',
															},
													}}>
													{typeNamesArrayTwo.map(
														(groupName, index) => (
															<Tab key={index}>
																{groupName}
															</Tab>
														)
													)}
												</TabList>
												<TabIndicator
													mt='-2.5px'
													height='3px'
													bg='claimzTextBlueLightColor'
													borderRadius='1px'
												/>
												<TabPanels>
													<TabPanel p='0px 0px 0px'>
														<Box
															background='white'
															border='1px solid #CECECE'
															boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
															borderRadius='0px 0px 6px 6px'
															padding='0px'>
															4
														</Box>
													</TabPanel>
												</TabPanels>
											</Tabs>
										</Box>
									</TabPanel>
									<TabPanel p='0px 0px 0px'>
										<Box
											background='white'
											border='1px solid #CECECE'
											boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
											borderRadius='0px 0px 6px 6px'
											padding='0px'>
											<Tabs
												position='relative'
												variant='unstyled'>
												<TabList
													sx={{
														'& .chakra-tabs__tab': {
															borderRadius:
																'15px 15px 0px 0px',
															color: 'claimzTextBlueLightColor',
															fontSize: '1.6rem',
															fontWeight: '700',
															pb: '10px',
															pt: '10px',
														},
														'& .chakra-tabs__tab[aria-selected=true]':
															{
																borderRadius:
																	'15px 15px 0px 0px',
																color: 'white',
																bg: 'claimzMainGeadientColor',
															},
													}}>
													{typeNamesArrayThree.map(
														(groupName, index) => (
															<Tab key={index}>
																{groupName}
															</Tab>
														)
													)}
												</TabList>
												<TabIndicator
													mt='-2.5px'
													height='3px'
													bg='claimzTextBlueLightColor'
													borderRadius='1px'
												/>
												<TabPanels>
													<TabPanel p='0px 0px 0px'>
														<Box
															background='white'
															border='1px solid #CECECE'
															boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
															borderRadius='0px 0px 6px 6px'
															padding='0px'>
															4
														</Box>
													</TabPanel>
												</TabPanels>
											</Tabs>
										</Box>
									</TabPanel>
									<TabPanel p='0px 0px 0px'>
										<Box
											background='white'
											border='1px solid #CECECE'
											boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
											borderRadius='0px 0px 6px 6px'
											padding='0px'>
											<Tabs
												position='relative'
												variant='unstyled'>
												<TabList
													sx={{
														'& .chakra-tabs__tab': {
															borderRadius:
																'15px 15px 0px 0px',
															color: 'claimzTextBlueLightColor',
															fontSize: '1.6rem',
															fontWeight: '700',
															pb: '10px',
															pt: '10px',
														},
														'& .chakra-tabs__tab[aria-selected=true]':
															{
																borderRadius:
																	'15px 15px 0px 0px',
																color: 'white',
																bg: 'claimzMainGeadientColor',
															},
													}}>
													{typeNamesArrayFour.map(
														(groupName, index) => (
															<Tab key={index}>
																{groupName}
															</Tab>
														)
													)}
												</TabList>
												<TabIndicator
													mt='-2.5px'
													height='3px'
													bg='claimzTextBlueLightColor'
													borderRadius='1px'
												/>
												<TabPanels>
													<TabPanel p='0px 0px 0px'>
														<Box
															background='white'
															border='1px solid #CECECE'
															boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
															borderRadius='0px 0px 6px 6px'
															padding='0px'>
															4
														</Box>
													</TabPanel>
												</TabPanels>
											</Tabs>
										</Box>
									</TabPanel>
									<TabPanel p='0px 0px 0px'>
										<Box
											background='white'
											border='1px solid #CECECE'
											boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
											borderRadius='0px 0px 6px 6px'
											padding='0px'>
											<Tabs
												position='relative'
												variant='unstyled'>
												<TabList
													sx={{
														'& .chakra-tabs__tab': {
															borderRadius:
																'15px 15px 0px 0px',
															color: 'claimzTextBlueLightColor',
															fontSize: '1.6rem',
															fontWeight: '700',
															pb: '10px',
															pt: '10px',
														},
														'& .chakra-tabs__tab[aria-selected=true]':
															{
																borderRadius:
																	'15px 15px 0px 0px',
																color: 'white',
																bg: 'claimzMainGeadientColor',
															},
													}}>
													{typeNamesArrayFive.map(
														(groupName, index) => (
															<Tab key={index}>
																{groupName}
															</Tab>
														)
													)}
												</TabList>
												<TabIndicator
													mt='-2.5px'
													height='3px'
													bg='claimzTextBlueLightColor'
													borderRadius='1px'
												/>
												<TabPanels>
													<TabPanel p='0px 0px 0px'>
														<Box
															background='white'
															border='1px solid #CECECE'
															boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
															borderRadius='0px 0px 6px 6px'
															padding='0px'>
															4
														</Box>
													</TabPanel>
												</TabPanels>
											</Tabs>
										</Box>
									</TabPanel>
								</TabPanels>
							</Tabs>
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</>
		);
	};

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
										<ActionTemplate
											ctc={section?.ctc}
											list={section.list}
										/>
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

export default TDSListStatus;
