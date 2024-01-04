import {
  Backdrop,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  defaultAPIRequest,
  firstExampleAPIRequest,
} from '../../constants/defaultValues';
import { useLanguage } from '../../hooks';
import { EndpointHelperProps } from './types';

export function EndpointHelper({
  isWindowOpen,
  openWindowHandler,
}: EndpointHelperProps) {
  const { dictionary } = useLanguage();
  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isWindowOpen}
    >
      <Card sx={{ minWidth: 300, backgroundColor: 'var(--gray)' }}>
        <CardContent>
          <Typography sx={{ mb: 2 }}>
            {dictionary.messageAPIEndpointsList}
          </Typography>
          {/* TODO: Set new URLs with good APIEndpoints */}
          {[defaultAPIRequest, firstExampleAPIRequest, defaultAPIRequest].map(
            (text, index) => (
              <Typography
                key={index + text}
                variant="body2"
                sx={{ padding: 1 }}
              >
                {text}
                <br />
              </Typography>
            )
          )}
        </CardContent>
        <CardActions sx={{ float: 'right' }}>
          <IconButton
            onClick={() => openWindowHandler(false)}
            sx={{ color: 'var(--white)' }}
          >
            <CloseIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Backdrop>
  );
}
