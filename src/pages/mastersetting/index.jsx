import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'


const MasterSetting = () => {
    let location = useLocation();
    return (
        <Box
            position='relative'
            width="100%"
            bg="rgba(230, 237, 239, 1)"
        >
            {location.pathname === '/master-setting' && (
                <Box>
                    <Box
                        borderBottom='3px solid var(--chakra-colors-claimzBorderColor)' width='300px' pb='5px'>
                        <Text background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
                            backgroundClip='text'
                            fontWeight='700'
                            fontSize='28px'
                            lineHeight='36px'>Master Settings</Text>
                    </Box >
                    <Box display='flex' flexWrap='wrap' justifyContent='space-between' alignItems='center' pt='28px' mb='34px' sx={{
                        '& .manage_items': {
                            width: '48%'
                        }
                    }}>
                        <Link to='manage-company/company-profile' className='manage_items'>
                            <Box display='flex' justifyContent='center' alignItems='center' border='2px solid var(--chakra-colors-claimzBorderColor)' p='20px 15px' borderRadius='15px' mb='15px' color='claimzTextBlueColor' cursor='pointer' transition='0.3s ease all' _hover={{
                                bgGradient: 'linear(180deg, #256DAA, #01325B)',
                                color: 'white'
                            }}>
                                <i className="fa-solid fa-building fa-2x"></i>
                                <Text fontSize='2.2rem' fontWeight='700' pl='10px'>Manage Company</Text>
                            </Box>
                        </Link>
                        <Link to='travel-policies' className='manage_items'>
                            <Box display='flex' justifyContent='center' alignItems='center' border='2px solid var(--chakra-colors-claimzBorderColor)' p='20px 15px' borderRadius='15px' mb='15px' color='claimzTextBlueColor' cursor='pointer' transition='0.3s ease all' _hover={{
                                bgGradient: 'linear(180deg, #256DAA, #01325B)',
                                color: 'white'
                            }}>
                                <i className="fa-solid fa-location-dot fa-2x"></i>
                                <Text fontSize='2.2rem' fontWeight='700' pl='10px'>Travel Policies</Text>
                            </Box>
                        </Link>
                        <Link to='conveyance-policies' className='manage_items'>
                            <Box display='flex' justifyContent='center' alignItems='center' border='2px solid var(--chakra-colors-claimzBorderColor)' p='20px 15px' borderRadius='15px' mb='15px' color='claimzTextBlueColor' cursor='pointer' transition='0.3s ease all' _hover={{
                                bgGradient: 'linear(180deg, #256DAA, #01325B)',
                                color: 'white'
                            }}>
                                <i className="fa-solid fa-shield-halved fa-2x"></i>
                                <Text fontSize='2.2rem' fontWeight='700' pl='10px'>Conveyance Policies</Text>
                            </Box>
                        </Link>
                        <Link to='payroll-details' className='manage_items'>
                            <Box display='flex' justifyContent='center' alignItems='center' border='2px solid var(--chakra-colors-claimzBorderColor)' p='20px 15px' borderRadius='15px' mb='15px' color='claimzTextBlueColor' cursor='pointer' transition='0.3s ease all' _hover={{
                                bgGradient: 'linear(180deg, #256DAA, #01325B)',
                                color: 'white'
                            }}>
                                <i className="fa-solid fa-sack-dollar fa-2x"></i>
                                <Text fontSize='2.2rem' fontWeight='700' pl='10px'>Payroll Details</Text>
                            </Box>
                        </Link>
                        <Link to='attendance-settings/week-of-variant' className='manage_items'>
                            <Box display='flex' justifyContent='center' alignItems='center' border='2px solid var(--chakra-colors-claimzBorderColor)' p='20px 15px' borderRadius='15px' mb='15px' color='claimzTextBlueColor' cursor='pointer' transition='0.3s ease all' _hover={{
                                bgGradient: 'linear(180deg, #256DAA, #01325B)',
                                color: 'white'
                            }}>
                                <i className="fa-solid fa-clipboard-user fa-2x"></i>
                                <Text fontSize='2.2rem' fontWeight='700' pl='10px'>Attendance Settings</Text>
                            </Box>
                        </Link>
                        {/* <Link to='manage-employee/all-employee' className='manage_items'>
                                        <Box display='flex' justifyContent='center' alignItems='center' border='2px solid var(--chakra-colors-claimzBorderColor)' p='20px 15px' borderRadius='15px' mb='15px' color='claimzTextBlueColor' cursor='pointer' transition='0.3s ease all' _hover={{
                                            bgGradient: 'linear(180deg, #256DAA, #01325B)',
                                            color: 'white'
                                        }}>
                                            <i className="fa-solid fa-users fa-2x"></i>
                                            <Text fontSize='2.2rem' fontWeight='700' pl='10px'>Manage Employee</Text>
                                        </Box>
                                    </Link> */}
                        {/* <Link to='onboarding-candidate' className='manage_items'>
                                        <Box display='flex' justifyContent='center' alignItems='center' border='2px solid var(--chakra-colors-claimzBorderColor)' p='20px 15px' borderRadius='15px' mb='15px' color='claimzTextBlueColor' cursor='pointer' transition='0.3s ease all' _hover={{
                                            bgGradient: 'linear(180deg, #256DAA, #01325B)',
                                            color: 'white'
                                        }}>
                                            <i className="fa-solid fa-user-plus fa-2x"></i>
                                            <Text fontSize='2.2rem' fontWeight='700' pl='10px'>Onboarding  Candidate</Text>
                                        </Box>
                                    </Link> */}
                        <Link to='question-master' className='manage_items'>
                            <Box display='flex' justifyContent='center' alignItems='center' border='2px solid var(--chakra-colors-claimzBorderColor)' p='20px 15px' borderRadius='15px' mb='15px' color='claimzTextBlueColor' cursor='pointer' transition='0.3s ease all' _hover={{
                                bgGradient: 'linear(180deg, #256DAA, #01325B)',
                                color: 'white'
                            }}>
                                <i className="fa-solid fa-user-plus fa-2x"></i>
                                <Text fontSize='2.2rem' fontWeight='700' pl='10px'>Question Master</Text>
                            </Box>
                        </Link>
                        <Link to='business-location' className='manage_items'>
                            <Box display='flex' justifyContent='center' alignItems='center' border='2px solid var(--chakra-colors-claimzBorderColor)' p='20px 15px' borderRadius='15px' mb='15px' color='claimzTextBlueColor' cursor='pointer' transition='0.3s ease all' _hover={{
                                bgGradient: 'linear(180deg, #256DAA, #01325B)',
                                color: 'white'
                            }}>
                                <i className="fa-solid fa-building fa-2x"></i>
                                <Text fontSize='2.2rem' fontWeight='700' pl='10px'>Business Location</Text>
                            </Box>
                        </Link>
                        <Link to='assets-master' className='manage_items'>
                            <Box display='flex' justifyContent='center' alignItems='center' border='2px solid var(--chakra-colors-claimzBorderColor)' p='20px 15px' borderRadius='15px' mb='15px' color='claimzTextBlueColor' cursor='pointer' transition='0.3s ease all' _hover={{
                                bgGradient: 'linear(180deg, #256DAA, #01325B)',
                                color: 'white'
                            }}>
                                <i className="fa-solid fa-laptop-file fa-2x"></i>
                                <Text fontSize='2.2rem' fontWeight='700' pl='10px'>Assets Master</Text>
                            </Box>
                        </Link>
                    </Box>

                    <Box
                        borderBottom='3px solid var(--chakra-colors-claimzBorderColor)' width='300px' pb='5px'>
                        <Text background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
                            backgroundClip='text'
                            fontWeight='700'
                            fontSize='28px'
                            lineHeight='36px'>Important Steps</Text>
                    </Box >

                    <Box display='flex' mt='15px'>
                        <Box pr='10px' color='claimzOrangeColor'>
                            <i className="fa-solid fa-star-of-life"></i>
                        </Box>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, blanditiis? Deserunt recusandae, hic deleniti eius fugit, aliquid voluptatum porro expedita impedit, optio dolorem consequuntur facere! Dignissimos optio nostrum dolor et illum mollitia perferendis voluptatum, facilis eveniet obcaecati culpa consectetur nemo fuga doloribus asperiores totam, ipsum cupiditate quis at! Beatae, laboriosam.</Text>
                    </Box>
                    <Box display='flex' mt='15px'>
                        <Box pr='10px' color='claimzOrangeColor'>
                            <i className="fa-solid fa-star-of-life"></i>
                        </Box>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, blanditiis? Deserunt recusandae, hic deleniti eius fugit, aliquid voluptatum porro expedita impedit, optio dolorem consequuntur facere! Dignissimos optio nostrum dolor et illum mollitia perferendis voluptatum, facilis eveniet obcaecati culpa consectetur nemo fuga doloribus asperiores totam, ipsum cupiditate quis at! Beatae, laboriosam.</Text>
                    </Box>
                </Box>
            )}

            <Outlet />
        </Box>
    )
}

export default MasterSetting