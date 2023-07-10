import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Input,
	useToast,
	useDisclosure,
	Image,
} from '@chakra-ui/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../assets/images/loader.gif';
import Tdsform from './tdsform';

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
		border-top: none;
		padding-bottom: 10px;
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
		height: calc(100vh - 213px);
	}
`;
const TDSList = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const [loader, setLoader] = useState(false);
	const [sucess, setsucess] = useState();
	const [products, setProducts] = useState();
	const [departmentList, setDepartmentList] = useState();
	const [updatedValue, setUpdatedValue] = useState();
	const [isLoading, setIsLoading] = useState(false);
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
					`${process.env.REACT_APP_API_URL}/emp-department`,
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

	const onRowEditComplete = (e) => {
		let _products = [...products];
		let { newData, index } = e;

		_products[index] = newData;

		setUpdatedValue(_products);
	};

	const textEditor = (options) => {
		return (
			<Input
				textAlign='center'
				type='text'
				value={options.value}
				onChange={(e) => options.editorCallback(e.target.value)}
			/>
		);
	};

	const statusBodyTemplate = (rowData) => {
		return <h1>O</h1>;
	};

	const onGlobalFilterChange = (event) => {
		const value = event.target.value;
		let _filters = { ...filters };

		_filters['global'].value = value;

		setFilters(_filters);
	};

	const renderHeader = () => {
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
						w='450px'
					/>
				</Box>
				<Box>
					<Button
						bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
						boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
						borderRadius='10px'
						p='20px'
						fontSize='1.6rem'
						color='white'
						_hover={{
							bgGradient:
								'linear(180deg, #2267A2 0%, #0D4675 100%)',
						}}
						_active={{
							bgGradient:
								'linear(180deg, #2267A2 0%, #0D4675 100%)',
						}}
						_focus={{
							bgGradient:
								'linear(180deg, #2267A2 0%, #0D4675 100%)',
						}}
						onClick={() =>
							navigate('/master-setting/add-department')
						}>
						Add Department
					</Button>
				</Box>
			</Box>
		);
	};

	const header = renderHeader();

	const ActionTemplate = (rowData) => {
		const toast = useToast();
		const [departmentName, setDepartmentName] = useState(
			rowData.department.department_name
		);
		const [hod, setHod] = useState(rowData.department.hod);
		const [id, setId] = useState(rowData.department.id);
		const { isOpen, onOpen, onClose } = useDisclosure();

		function toastCall() {
			return toast({
				title: 'Employee Department Updated Sucessfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}

		const departmentListData = async (e) => {
			e.preventDefault();
			onOpen();
			try {
				setIsLoading(true);
				const response2 = await fetch(
					`${process.env.REACT_APP_API_URL}/emp-list`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response2.ok) {
					const data2 = await response2.json();
					setDepartmentList(data2.data);
					setIsLoading(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};

		const tierUpdate = async (e) => {
			e.preventDefault();
			let formData = new FormData();
			formData.append('department_name', departmentName);
			formData.append('hod', hod);
			formData.append('id', id);

			try {
				setIsLoading(true);
				const response2 = await fetch(
					`${process.env.REACT_APP_API_URL}/department-update`,
					{
						method: 'POST',
						body: formData,
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response2.ok) {
					toastCall();
					setsucess(!sucess);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};

		return <Tdsform />;
	};

	return (
		<CssWrapper>
			{loader ? (
				<Box
					height='calc(100vh - 137px)'
					width='100%'
					display='flex'
					justifyContent='center'
					alignItems='center'>
					<Image src={Loader} alt='Loader' />
				</Box>
			) : (
				<div className='card p-fluid'>
					<DataTable
						value={products}
						header={header}
						filters={filters}
						onFilter={(e) => setFilters(e.filters)}
						editMode='row'
						dataKey='department.id'
						onRowEditComplete={onRowEditComplete}
						tableStyle={{ minWidth: '50rem' }}>
						<Column
							field='department.department_name'
							header='Emp ID'
							editor={(options) => textEditor(options)}
							sortable
							headerStyle={{ width: '14%' }}
							bodyStyle={{ textAlign: 'left' }}></Column>
						<Column
							field='hod'
							header='EMP Name'
							editor={(options) => textEditor(options)}
							sortable
							headerStyle={{ width: '14%' }}
							bodyStyle={{ textAlign: 'center' }}></Column>
						<Column
							field='inventoryStatus'
							header='CTC'
							body={statusBodyTemplate}
							headerStyle={{ width: '14%' }}
							bodyStyle={{ textAlign: 'center' }}></Column>
						<Column
							header='Gross'
							field=''
							headerStyle={{ width: '14%' }}
							bodyStyle={{ textAlign: 'center' }}></Column>
						<Column
							header='Taxable Amount'
							field=''
							headerStyle={{ width: '14%' }}
							bodyStyle={{ textAlign: 'center' }}></Column>
						<Column
							header='TDS'
							field=''
							headerStyle={{ width: '14%' }}
							bodyStyle={{ textAlign: 'center' }}></Column>
						<Column
							header='View'
							body={ActionTemplate}
							headerStyle={{ width: '14%' }}
							bodyStyle={{ textAlign: 'center' }}></Column>
					</DataTable>
				</div>
			)}
		</CssWrapper>
	);
};

export default TDSList;
