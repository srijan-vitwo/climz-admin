import React, { useEffect, useState } from 'react';
import { Box, Input, useToast, Image } from '@chakra-ui/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../assets/images/loader.gif';

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

const CompopHistory = ({ rowData }) => {
	const toast = useToast();
	const navigate = useNavigate();
	let token = localStorage.getItem('token');
	const [isLoading, setIsLoading] = useState(false);
	const [sucess, setsucess] = useState();
	const [compopDetails, setCompopDetails] = useState(rowData.component_name);
	const [updateType, setUpdateType] = useState(rowData.type);
	const [id, setId] = useState(rowData.conveyance_mode_id);

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
				setIsLoading(true);
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
					setCompopDetails(data1.data);
					setIsLoading(false);
				} else {
					navigate('/login');
				}
			} catch (error) {
				navigate('/login');
			}
		};

		departmentList();
	}, [sucess]);

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
	return (
		<CssWrapper>
			{isLoading ? (
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
							value={compopDetails}
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
								bodyStyle={{
									textAlign: 'center',
								}}
								style={{
									width: '16.66%',
								}}></Column>
							<Column
								field='emp_code'
								header='Comp-Off Date'
								sortable
								bodyStyle={{
									textAlign: 'center',
								}}
								style={{
									width: '16.66%',
								}}></Column>
							<Column
								field='balance'
								header='From Time'
								sortable
								bodyStyle={{
									textAlign: 'center',
								}}
								style={{
									width: '16.66%',
								}}></Column>
							<Column
								field='balance'
								header='To Time'
								sortable
								bodyStyle={{
									textAlign: 'center',
								}}
								style={{
									width: '16.66%',
								}}></Column>
							<Column
								field='balance'
								header='Leave Apply Date'
								sortable
								bodyStyle={{
									textAlign: 'center',
								}}
								style={{
									width: '16.66%',
								}}></Column>
							<Column
								field='balance'
								header='Status'
								sortable
								bodyStyle={{
									textAlign: 'center',
								}}
								style={{
									width: '16.66%',
								}}></Column>
						</DataTable>
					</Box>
				</Box>
			)}
		</CssWrapper>
	);
};

export default CompopHistory;
