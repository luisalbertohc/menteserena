import { Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  title: {
    // position: 'relative',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    width: '100%',
    color: theme.palette.grey[600],
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '21px',
    '&:after': {
      content: '',
      borderTop: `1px solid ${theme.palette.grey[200]}`,
      width: '100%',
      height: 2
    },
    '&::before': {
      content: '',
      position: 'relative',
      borderTop: `1px solid ${theme.palette.grey[200]}`,
      width: '100%',
      height: 2
    }
  }
}))

interface TitleProps {
  label: string
}

const Title = ({ label }: TitleProps) => {
  const classes = useStyles()

  return (
    <Typography className={ classes.title } variant="body2" color="primary">
      { label }
    </Typography>
  )
}

export default Title
