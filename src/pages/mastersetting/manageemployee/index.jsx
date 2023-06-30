import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'

const ManageEmployee = () => {
    return (
        <Box
            width="100%"
            bg="rgba(230, 237, 239, 1)"
        >
            <Box
                borderBottom='3px solid var(--chakra-colors-claimzBorderColor)' width='300px' pb='10px' mb='20px'>
                <Text background='linear-gradient(180deg, #2770AE 0%, #01325B 100%)'
                    backgroundClip='text'
                    fontWeight='700'
                    fontSize='28px'
                    lineHeight='36px'>List of Employee </Text>
            </Box >
            <Box
                background='#F6F9F8'
                border='1px solid #CECECE'
                boxShadow='3px 3px 4px rgba(0, 0, 0, 0.25)'
                borderRadius='6px'
                padding='15px'
                mt='20px'
            >
                <Outlet />
            </Box>
        </Box >
    )
}

export default ManageEmployee