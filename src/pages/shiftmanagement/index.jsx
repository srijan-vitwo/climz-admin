import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'


const ShiftManagement = () => {
    let location = useLocation();
    return (
        <Box
            position='relative'
            width="100%"
            bg="rgba(230, 237, 239, 1)"
        >
            {location.pathname === '/shift-management' && (
                <Box>
                    <Box
                        borderBottom='3px solid var(--chakra-colors-claimzBorderColor)' width='300px' pb='5px'>
                        <Text background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
                            backgroundClip='text'
                            fontWeight='700'
                            fontSize='28px'
                            lineHeight='36px'>Shift Management</Text>
                    </Box >
                    <Box display='flex' flexWrap='wrap' justifyContent='space-between' alignItems='center' pt='28px' mb='34px' sx={{
                        '& .manage_items': {
                            width: '48%'
                        }
                    }}>
                        <Link to='add-shift-management' className='manage_items'>
                            <Box display='flex' justifyContent='center' alignItems='center' border='2px solid var(--chakra-colors-claimzBorderColor)' p='20px 15px' borderRadius='15px' mb='15px' color='claimzTextBlueColor' cursor='pointer' transition='0.3s ease all' _hover={{
                                bgGradient: 'linear(180deg, #256DAA, #01325B)',
                                color: 'white'
                            }}>
                                <i className="fa-solid fa-business-time fa-2x"></i>
                                <Text fontSize='2.2rem' fontWeight='700' pl='10px'>Add Shift</Text>
                            </Box>
                        </Link>
                        <Link to='shift-list' className='manage_items'>
                            <Box display='flex' justifyContent='center' alignItems='center' border='2px solid var(--chakra-colors-claimzBorderColor)' p='20px 15px' borderRadius='15px' mb='15px' color='claimzTextBlueColor' cursor='pointer' transition='0.3s ease all' _hover={{
                                bgGradient: 'linear(180deg, #256DAA, #01325B)',
                                color: 'white'
                            }}>
                                <i className="fa-solid fa-list fa-2x"></i>
                                <Text fontSize='2.2rem' fontWeight='700' pl='10px'>Shift Management List</Text>
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

export default ShiftManagement