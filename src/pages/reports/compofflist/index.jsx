import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Input,
	useDisclosure,
	FormControl,
	FormLabel,
	useToast,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Text,
	Image,
} from '@chakra-ui/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../assets/images/loader.gif';
import { BeatLoader } from 'react-spinners';
import CompopHistory from './compophistory';

const CssWrapper = styled.div`
	.p-datatable-wrapper::-webkit-scrollbar {
		width: 6px;
	}
	.p-datatable-wrapper::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px grey;
		border-radius: 10px;
	}
	.p-datatable-wrapper::-webkit-scrollbar-thumb {
		background: var(--chakra-colors-claimzBorderGrayColor);
		border-radius: 10px;
	}

	.p-datatable .p-sortable-column .p-column-title {
		font-size: 1.4rem;
	}
	.p-datatable .p-datatable-tbody > tr > td {
		font-size: 1.4rem;
	}
	.p-paginator {
		padding: 15px 10px;
	}
	.p-component {
		font-size: 1.4rem;
		padding-bottom: 10px;
	}
	.p-dropdown-label {
		display: flex;
		align-items: center;
	}
	.p-datatable .p-datatable-header {
		border: none;
		background-color: white;
	}
	.p-datatable .p-column-header-content {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.p-datatable-wrapper {
		margin-top: 5px;
		padding-right: 9px;
		overflow-y: scroll;
		height: calc(100vh - 190px);
	}
`;

const Compofflist = () => {
	const navigate = useNavigate();
	let token = localStorage.getItem('token');
	const [loader, setLoader] = useState(false);
	const [products, setProducts] = useState();
	const [sucess, setsucess] = useState();
	const [msg, setMsg] = useState();

	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		name: {
			operator: FilterOperator.AND,
			constraints: [
				{ value: null, matchMode: FilterMatchMode.STARTS_WITH },
			],
		},
		'country.name': {
			operator: FilterOperator.AND,
			constraints: [
				{ value: null, matchMode: FilterMatchMode.STARTS_WITH },
			],
		},
		representative: { value: null, matchMode: FilterMatchMode.IN },
		status: {
			operator: FilterOperator.OR,
			constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
		},
	});

	useEffect(() => {
		const departmentList = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/compoff-list`,
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
	}, [sucess, msg]);

	const onGlobalFilterChange = (event) => {
		const value = event.target.value;
		let _filters = { ...filters };

		_filters['global'].value = value;

		setFilters(_filters);
	};

	const RenderHeader = () => {
		const toast = useToast();
		const value = filters['global'] ? filters['global'].value : '';

		return (
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'>
				<Box
					as='span'
					className='p-input-icon-left'
					display='flex'
					alignItems='center'>
					<i style={{ lineHeight: 1.5 }} className='pi pi-search' />
					<Input
						pl='24px'
						type='search'
						value={value || ''}
						onChange={(e) => onGlobalFilterChange(e)}
						placeholder='Global Search'
						w='100%'
					/>
				</Box>
			</Box>
		);
	};
	const header = RenderHeader();

	const ActionTemplate = (rowData) => {
		const { isOpen, onOpen, onClose } = useDisclosure();
		return (
			<>
				<Button
					onClick={onOpen}
					bg='none'
					_hover={{ bg: 'none' }}
					_active={{ bg: 'none' }}>
					<i className='fa-solid fa fa-eye fa-2x'></i>
				</Button>
				<Drawer
					isOpen={isOpen}
					placement='right'
					onClose={onClose}
					size='xl'>
					<DrawerOverlay />
					<DrawerContent
						maxW='70% !important'
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
									{' '}
									Tier Master Item Update{rowData.id}
								</Text>
							</Box>
						</DrawerHeader>

						<DrawerBody>
							<CompopHistory rowData={rowData} />
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</>
		);
	};

	console.log(products, 'setProducts');

	return (
		<CssWrapper>
			{loader ? (
				<Box
					height='544px'
					width='100%'
					display='flex'
					justifyContent='center'
					alignItems='center'>
					<Image src={Loader} alt='Loader' />
				</Box>
			) : (
				<Box
					borderWidth='1px'
					borderRadius='0px 0px 5px 5px'
					shadow='1px 1px 3px rgba(0,0,0,0.3)'
					bg='white'
					p='0px 10px'>
					<Box className='card p-fluid'>
						<DataTable
							value={products}
							header={header}
							filters={filters}
							onFilter={(e) => setFilters(e.filters)}
							editMode='row'
							dataKey='conveyance_mode_id'
							tableStyle={{ minWidth: '50rem' }}>
							<Column
								field='emp_name'
								header='Employee Name'
								sortable
								bodyStyle={{ textAlign: 'center' }}
								style={{ width: '25%' }}></Column>
							<Column
								field='emp_code'
								header='Employee Id'
								sortable
								bodyStyle={{ textAlign: 'center' }}
								style={{ width: '25%' }}></Column>
							<Column
								field='balance'
								header='Comp-Off Balance'
								sortable
								bodyStyle={{ textAlign: 'center' }}
								style={{ width: '25%' }}></Column>
							<Column
								header='Comp-Off Details'
								body={ActionTemplate}
								headerStyle={{ width: '25%', minWidth: '8rem' }}
								bodyStyle={{ textAlign: 'center' }}></Column>
						</DataTable>
					</Box>
				</Box>
			)}
		</CssWrapper>
	);
};

export default Compofflist;
