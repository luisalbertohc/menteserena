import { Grid, makeStyles, Button, Typography, TextField, IconButton } from '@material-ui/core'
import Avatar from '@components/profile/Avatar'
import CloseIcon from '@material-ui/icons/Close'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import SearchIcon from "@material-ui/icons/Search"
import classnames from 'classnames'
import { useState, useEffect } from 'react'
import { getPatients } from '@api'

// Notas:
// - El loading se puede mejorar

const useStyles = makeStyles(theme => ({
  dialog: {
    position: 'relative',
    padding: theme.spacing(2, 3, 3)
  },
  dialogTitle: {
    marginBottom: 8,
    borderBottom: '1px solid #E9E9E9',
    paddingBottom: theme.spacing(1),
    width: '100%',
    fontSize: 10,
    lineHeight: 1
  },
  dialogText: {
    marginBottom: 8,
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 10,
    lineHeight: 1
  },
  dialogInput: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    width: 328,
    height: 38,
    [theme.breakpoints.up('sm')]: {
      width: 373
    },
    '& .MuiInputBase-input': {
      paddingTop: 0,
      paddingBottom: 0,
      alignItems: 'center',
      height: 38
    },
    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: 0
    },
    '& .MuiIconButton-root': {
      borderRadius: '0 5px 5px 0',
      padding: 0,
      width: 42,
      height: '100%',
      backgroundColor: theme.palette.primary.main,
      color: '#FFF',
      cursor: 'none'
    }
  },
  dialogButtons: {
    justifyContent: 'space-between',
    '& .MuiGrid-item': {
      width: '48%'
    }
  },
  dialogButton: {
    display: 'flex',
    alignItems: 'flex-end',
    width: '100%',
    '& button': {
      width: '100%',
      height: 30,
      textTransform: 'none',
      '& .MuiButton-label': {
        fontSize: 12
      }
    }
  },
  dialogButtonBig: {
    width: '100% !important'
  },
  itemContainer: {
    marginBottom: theme.spacing(1),
    borderRadius: 5,
    padding: theme.spacing(1),
    flexWrap: 'nowrap',
    maxHeight: 48,
    '&.unselected': {
      border: '1px solid #D8D8D8',
      background: 'transparent',
      width: 303,
      [theme.breakpoints.up('sm')]: {
        width: 349
      }
    },
    '&.selected': {
      backgroundColor: '#F2F2F2',
      width: 328,
      [theme.breakpoints.up('sm')]: {
        width: 373
      },
      '&:last-child': {
        marginBottom: theme.spacing(3)
      }
    }
  },
  itemContent: {
    width: 'auto',
  },
  itemName: {
    marginLeft: theme.spacing(1),
    color: theme.palette.grey['A400'],
    fontSize: 14,
    lineHeight: 1
  },
  itemBtn: {
    fontSize: 10,
    cursor: 'pointer',
    '& .plus': {
      color: '#57C4C4'
    },
    '& .minus': {
      width: 15,
      height: 15,
      color: '#A3A3A3'
    }
  },
  unselectedWrapper: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
    flexWrap: 'nowrap',
    maxHeight: 216,
    overflowY: 'auto'
  }
}))

interface SelectMembersVideoCallProps {
  user: {
    profile_picture: string
    user_type: string
    name: string
    first_name: string
    last_name: string
    id: number
  }
  startVideoCalling?: () => void
  showValue: boolean
}

// interface Patient {
//   first_name: string
//   last_name: string
//   profile_picture: string
//   user_id: number
//   user_type: string
// }

const SelectMembersVideoCall = ({ user: patientCero, startVideoCalling, showValue }: SelectMembersVideoCallProps) => {
  const classes = useStyles()
  const firstPatientSelected = [
    {
      profile_picture: patientCero.profile_picture,
      user_type: patientCero.user_type,
      first_name: patientCero.first_name,
      last_name: patientCero.last_name,
      user_id: patientCero.id
    }
  ]
  const [isLoading, setIsLoading] = useState(true)
  const [showList, setShowList] = useState(showValue)
  const [hideButton, setHideButton] = useState(!showValue)
  const [filterPatients, setFilterPatients] = useState(null)
  const [unselectedPatients, setUnselectedPatients] = useState(null)
  const [selectedPatients, setSelectedPatients] = useState(null)
  
  // to filter the list of unselected patients
  const filterList = (e) => {
    let updatedList = unselectedPatients
    updatedList = updatedList.filter(patient => {
      const name = patient.first_name + ' ' + patient.last_name
      return (
        name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      )
    })
    setFilterPatients(updatedList)
  }

  // to show the searching list
  const handlerShowList = (value) => {
    setShowList(value)
    setHideButton(!value)
  }
  
  // find patient by id
  const findPatient = (array, id) => {
    return array.find(element => element.user_id === id)
  }
  
  // to remove patient
  const handlerRemovePatient = (id) => {
    setUnselectedPatients(() => [...unselectedPatients, findPatient(selectedPatients, id)])
    setFilterPatients(() => [...filterPatients, findPatient(selectedPatients, id)])
    setSelectedPatients((selectedPatients) => selectedPatients.filter(patient => patient.user_id !== id))
  }
  
  // to add patient
  const handlerAddPatient = (id) => {
    if (selectedPatients.length <= 4) {
      setSelectedPatients(() => [...selectedPatients, findPatient(unselectedPatients, id)])
      setUnselectedPatients((unselectedPatients) => unselectedPatients.filter(patient => patient.user_id !== id))
      setFilterPatients((filterPatients) => filterPatients.filter(patient => patient.user_id !== id))
    } else return
  }
  
  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true)
      try {
        let patients = await getPatients()
        patients = patients.filter(patient => patient.user_id !== patientCero.id)
        setSelectedPatients(firstPatientSelected)
        setUnselectedPatients(patients)
        setFilterPatients(patients)
        // setError(null)
      } catch(error) {
        // setError(error)
        // setUnselectedPatients(null)
        console.log('Hubo un error', error)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  if (isLoading) {
    return <></>
  }
  
  return (
    <Grid container direction="column" classes={{ root: classes.dialog }}>

      {/* title */}
      <Grid container item>
        <Typography classes={{ root: classes.dialogTitle }}>Participantes</Typography>
      </Grid>

      {/* selected patients */}
      <Grid container item direction="column">
        {Boolean(selectedPatients) && (
          selectedPatients.map((user, index) => {
            return (
              <Grid container item justify="space-between" alignItems="center" className={ classnames(classes.itemContainer, 'selected') } key={ user.user_id }>
                <Grid container item alignItems="center" className={ classes.itemContent }>
                  <Avatar avatarUrl={ user.profile_picture } tiny />
                  <Typography color="primary" className={ classes.itemName }>
                    { user.user_type === 'PROVIDER' ? user.name : user.first_name + ' ' + user.last_name }
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={ classes.itemBtn }>
                    { Boolean(index === 0) ? 'Paciente' : <CloseIcon className={ 'minus' } onClick={ () => handlerRemovePatient(user.user_id) }/> }
                  </Typography>
                </Grid>
              </Grid>
            )
          })
        )}
      </Grid>

      {Boolean(showList) && (
        <>
          {/* searchbar */}
          <Grid item>
            <form>
              <Typography classes={{ root: classes.dialogText }}>Busca a las personas que quieres añadir a la videollamada</Typography>
              <TextField
                type="text"
                placeholder="Buscar"
                className={ classes.dialogInput }
                onChange={ filterList }
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchIcon/>
                    </IconButton>
                  )
                }}
              />
            </form>
          </Grid>

          {/* unselected patients */}
          <Grid container item direction="column" className={ classes.unselectedWrapper }>
            {Boolean(filterPatients) && (
              filterPatients.map((user) => {
                return (
                  <Grid container item justify="space-between" alignItems="center" className={ classnames(classes.itemContainer, 'unselected') } key={ user.user_id }>
                    <Grid container item alignItems="center" className={ classes.itemContent }>
                      <Avatar avatarUrl={ user.profile_picture } tiny />
                      <Typography color="primary" className={ classes.itemName }>
                        { user.user_type === 'PROVIDER' ? user.name : user.first_name + ' ' + user.last_name }
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography className={ classes.itemBtn }>
                        <AddCircleIcon className={ 'plus' } onClick={ () => handlerAddPatient(user.user_id) }/>
                      </Typography>
                    </Grid>
                  </Grid>
                )
              })
            )}
          </Grid>
        </>
      )}


      
      {/* buttons */}
      <Grid container item className={ classes.dialogButtons}>
        
        {Boolean(hideButton) ? (
          <>
            {/* add patients */}
            <Grid item classes={{ root: classes.dialogButton }}>
              <Button variant="outlined" color="primary" disableElevation onClick={ () => handlerShowList(true) }>Añadir personas</Button>
            </Grid>

            {/* init call */}
            <Grid item classes={{ root: classes.dialogButton }}>
              <Button variant="contained" color="primary" disableElevation onClick={ startVideoCalling }>Iniciar llamada</Button>
            </Grid>
          </>
        ) : (
          <>
            {/* init call */}
            <Grid item classes={{ root: classes.dialogButton }} className={ classes.dialogButtonBig }>
              <Button variant="contained" color="primary" disableElevation onClick={ startVideoCalling }>Iniciar llamada</Button>
            </Grid>
          </>
        )}

      </Grid>

    </Grid>
  )
}

export default SelectMembersVideoCall
