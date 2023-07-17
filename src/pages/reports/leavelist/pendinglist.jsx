import React, { useState, useEffect } from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import styled from '@emotion/styled';
import { Paginator } from 'primereact/paginator';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../assets/images/loader.gif';

const CssWrapper = styled.div`
	.p-datatable-wrapper::-webkit-scrollbar {
		width: 6px;
	}

	/* Track */
	.p-datatable-wrapper::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px grey;
		border-radius: 10px;
	}

	/* Handle */
	.p-datatable-wrapper::-webkit-scrollbar-thumb {
		background: var(--chakra-colors-claimzBorderGrayColor);
		border-radius: 10px;
	}

	.p-datatable-emptymessage .p-datatable .p-datatable-tbody > tr > td {
		text-align: center;
	}
	.p-datatable .p-sortable-column .p-column-title {
		font-size: 1.4rem;
	}
	.p-datatable .p-datatable-tbody > tr > td {
		font-size: 1.4rem;
		padding: 15px 10px;
	}
	.p-paginator {
		padding: 15px 10px;
	}
	.p-component {
		font-size: 1.4rem;
	}
	.p-dropdown-label {
		display: flex;
		align-items: center;
	}
	.p-datatable .p-column-header-content {
		justify-content: center;
	}
	.p-paginator .p-paginator-pages .p-paginator-page {
		font-size: 1.4rem;
	}
	.p-paginator .p-dropdown .p-dropdown-label {
		font-size: 1.4rem;
	}
	.p-datatable .p-datatable-tbody > tr > td {
		text-align: center;
	}
	.p-datatable .p-datatable-header {
		border-top: none;
	}
	.p-datatable > .p-datatable-wrapper {
		overflow: auto;
		height: calc(100vh - 280px);
		padding-right: 5px;
		margin-right: 5px;
	}
`;
const PendingList = () => {
	const navigate = useNavigate();
	let token = localStorage.getItem('token');
	const [first, setFirst] = useState(0);
	const [rows, setRows] = useState(10);
	const [sucess, setsucess] = useState();
	const [empList, setEmpList] = useState();
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		const formDataValue = async () => {
			try {
				setLoader(true);
				const response1 = await fetch(
					`${process.env.REACT_APP_API_URL}/pending-leave-list/${rows}?page=${first}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response1.ok) {
					const data = await response1.json();
					setEmpList(data.data);
					setLoader(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};
		formDataValue();
	}, [sucess, first, rows]);

	const onPageChange = (event) => {
		setFirst(event.first);
		setRows(event.rows);
	};

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
		date: {
			operator: FilterOperator.AND,
			constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
		},
		balance: {
			operator: FilterOperator.AND,
			constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
		},
		status: {
			operator: FilterOperator.OR,
			constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
		},
		activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
	});
	const [globalFilterValue, setGlobalFilterValue] = useState('');

	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		let _filters = { ...filters };
		_filters['global'].value = value;

		setFilters(_filters);
		setGlobalFilterValue(value);
	};

	const RenderHeader = () => {
		return (
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'>
				<Box
					width='40%'
					className='flex flex-wrap gap-2 justify-content-between align-items-center'>
					<Box as='span' width='100%' className='p-input-icon-left'>
						<i className='pi pi-search' />
						<InputText
							style={{ width: '100%' }}
							value={globalFilterValue}
							onChange={onGlobalFilterChange}
							placeholder='Keyword Search'
						/>
					</Box>
				</Box>
			</Box>
		);
	};
	const Header = RenderHeader();

	// const newData = [];
	// empList?.data?.map((item) => {
	// 	const dates = JSON.parse(item.dates); // Parse the dates string into an array

	// 	dates.map((date, index) => {
	// 		const newItem = {
	// 			...item,
	// 			dates: date,
	// 			id: `pending${index}`, // Replace the dates array with a single date
	// 		};

	// 		newData.push(newItem);
	// 	});
	// });

	const dateTemplate = (rowData) => {
		function formatDate(dateString) {
			const date = new Date(dateString);
			const options = { day: '2-digit', month: 'short', year: 'numeric' };
			return date.toLocaleDateString('en-US', options);
		}
		const dateStrings = rowData?.dates;
		const parsedDates = JSON.parse(dateStrings);
		const formattedDates = parsedDates.map(formatDate);
		return (
			<Box>
				<Text fontSize='1.4rem'>{formattedDates.join(', ')}</Text>
			</Box>
		);
	};

	return (
		<CssWrapper
			width='100%'
			height='100%'
			display='flex'
			alignItems='center'
			justifyContent='center'>
			<Box width='100%' bg='rgba(230, 237, 239, 1)'>
				{loader ? (
					<Box
						height='calc(100vh - 139px)'
						display='flex'
						alignItems='center'
						justifyContent='center'>
						<Image src={Loader} alt='Loader' />
					</Box>
				) : (
					<Box
						background='#F6F9F8'
						border='1px solid #CECECE'
						boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'>
						<Box className='card'>
							<DataTable
								value={empList?.data}
								header={Header}
								filters={filters}
								onFilter={(e) => setFilters(e.filters)}
								dataKey='id'>
								<Column
									style={{ width: '12%' }}
									header='Name'
									field='emp_name'
									bodyStyle={{ textAlign: 'center' }}
								/>
								<Column
									style={{ width: '12%' }}
									header='User ID'
									field='emp_code'
									bodyStyle={{ textAlign: 'center' }}
								/>
								<Column
									style={{ width: '12%' }}
									header='Leave Type'
									field='leave_types'
									bodyStyle={{ textAlign: 'center' }}
								/>
								<Column
									style={{ width: '12%' }}
									header='Leave Dates'
									field='dates'
									body={dateTemplate}
									bodyStyle={{ textAlign: 'center' }}
								/>
								<Column
									style={{ width: '12%' }}
									header='Description'
									field='description'
									bodyStyle={{ textAlign: 'center' }}
								/>
							</DataTable>
							<Box
								display='flex'
								justifyContent='flex-end'
								backgroundColor='white'>
								<Paginator
									first={first}
									rows={rows}
									totalRecords={empList?.total}
									rowsPerPageOptions={[
										5,
										`${empList?.total}`,
									]}
									onPageChange={onPageChange}
								/>
							</Box>
						</Box>
					</Box>
				)}
			</Box>
		</CssWrapper>
	);
};

export default PendingList;