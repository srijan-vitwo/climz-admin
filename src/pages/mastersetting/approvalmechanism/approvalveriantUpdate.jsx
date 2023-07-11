import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Image,
	Input,
	Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import userLogo from '../../../assets/images/user.png';

const ApprovalVeriantUpdate = ({ approval, rowData }) => {
	const [variantName, setVariantName] = useState(rowData?.variant_name);

	const matchedData = rowData?.approvers?.map((obj2) => {
		const matchedObj = approval.find(
			(obj1) => obj1.given_status === obj2.get_status
		);
		return {
			...obj2,
			...matchedObj,
		};
	});

	const newArray = [matchedData?.[matchedData?.length - 1]];

	console.log(matchedData, 'matchedData');
	console.log(newArray, 'newArray');

	return (
		<Box>
			<form
				style={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-end',
				}}>
				<Box w='100%'>
					<Box>
						<FormControl>
							<FormLabel>Variant Name</FormLabel>
							<Input
								type='text'
								placeholder='Enter Name'
								value={variantName}
								required
								onChange={(e) => setVariantName(e.target.value)}
							/>
						</FormControl>
					</Box>
					<Box
						display='flex'
						justifyContent='space-between'
						mt='20px'>
						<Box width='100%'>
							<div className='timeline'>
								{matchedData?.map((value, index) => (
									<Box>
										<Text
											fontWeight='600'
											marginBottom='5px'
											color='var(--chakra-colors-claimzTextBlueLightColor)'>
											{value.type_name}
										</Text>
										<Box
											className='timeline__event animated fadeInUp timeline__event--type2'
											key={index}>
											<Box className='timeline__event__icon'>
												<Image
													src={
														value?.img == null
															? userLogo
															: value?.profile_photo
													}
													alt={value?.emp_name}
													h='50px'
													w='50'
													mr='10px'
												/>
											</Box>
											<Box
												className='timeline__event__content'
												display='flex'
												alignItems='center'
												w='100%'>
												<Box className='timeline__event__description'>
													<Text
														fontSize='1.4rem'
														fontWeight='600'
														color='var(--chakra-colors-claimzTextBlueLightColor)'>
														{value?.emp_name}
													</Text>
												</Box>
											</Box>
										</Box>
									</Box>
								))}
							</div>
						</Box>
					</Box>
				</Box>
				<Button
					bgGradient='linear(180deg, #2267A2 0%, #0D4675 100%)'
					boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
					borderRadius='10px'
					p='20px 30px'
					fontSize='1.6rem'
					color='white'
					_hover={{
						bgGradient: 'linear(180deg, #2267A2 0%, #0D4675 100%)',
					}}
					_active={{
						bgGradient: 'linear(180deg, #2267A2 0%, #0D4675 100%)',
					}}
					_focus={{
						bgGradient: 'linear(180deg, #2267A2 0%, #0D4675 100%)',
					}}
					type='submit'>
					Submit
				</Button>
			</form>
		</Box>
	);
};

export default ApprovalVeriantUpdate;
