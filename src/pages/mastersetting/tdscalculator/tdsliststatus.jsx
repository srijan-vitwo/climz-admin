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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../assets/images/loader.gif';

const TDSListStatus = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const [loader, setLoader] = useState(false);
	const [sucess, setsucess] = useState();
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
	}, [sucess]);

	const ActionTemplate = ({ ctc, list }) => {
		const { isOpen, onOpen, onClose } = useDisclosure();
		console.log(ctc, 'ctc');
		console.log(list, 'list');

		const groupOne = list?.filter((item) => item.group_id == 1);
		const groupTwo = list?.filter((item) => item.group_id == 2);
		const grouptTree = list?.filter((item) => item.group_id == 3);
		const groupFour = list?.filter((item) => item.group_id == 4);
		const groupfive = list?.filter((item) => item.group_id == 5);

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

		console.log(nestedArrayOne, 'nestedArrayOne');
		console.log(nestedArrayTwo, 'nestedArrayTwo');
		console.log(nestedArrayThree, 'nestedArrayThree');
		console.log(nestedArrayFour, 'nestedArrayFour');
		console.log(nestedArrayFive, 'nestedArrayFive');

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
							<h2>s</h2>
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
