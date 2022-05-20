import { Typography, makeStyles } from '@material-ui/core'

// Notas:
// - Evaluar optimización del componente

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    marginBottom: theme.spacing(3),
    display: 'flex',
    width: '100%',
    overflow: 'hidden',
  },
  title: {
    position: 'relative',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    color: theme.palette.grey[600],
    whiteSpace: 'nowrap', // prevent the text from wrapping
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '21px',
  },
  line: {
    position: 'relative',
    marginLeft: 20,
    width: '100%',
    height: '100%',
    '&::before': {
      content: '""', // this ensures that the pseudo element is created
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: '50%',
      transform: 'translateY(-50%)',
      width: '100%',
      height: 1,
      backgroundColor: `${theme.palette.grey[200]}`
    },
  }
}))

interface TitleProps {
  label: string
}

const Title = ({ label }: TitleProps) => {
  const classes = useStyles()

  return (
    <Typography className={ classes.container } variant="body2" color="primary">
      <span className={ classes.title }>{ label }</span>
      <span className={ classes.line }></span>
    </Typography>
  )
}

export default Title
