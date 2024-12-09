import { Box } from '@mui/material'
import React from 'react'

const Container = ({children}) => {
  const styles = {
    container: {
      minHeight: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingY: 5,
    },
  }
  
  return (
    <Box
      sx={styles.container}
    >
      {children}
    </Box>
  )
}


export default Container