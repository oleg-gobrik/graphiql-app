import { Box, InputLabel, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import { useLanguage } from '../../hooks';
import {
  setBodyRequest,
  setQueryResponse,
} from '../../store/queryDataSlice/queryDataSlice';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { EditorViewerProps, MODE } from './types';

const editorRows = 15;

export function EditorViewer({ isViewer }: EditorViewerProps) {
  const { dictionary } = useLanguage();
  const { bodyRequest, response } = useAppSelector(
    (state: RootState) => state.queryData
  );
  const dispatch = useAppDispatch();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      isViewer
        ? setQueryResponse(event.target.value)
        : setBodyRequest(event.target.value)
    );
  };
  if (isViewer) {
    return (
      <Box
        sx={{ mt: 2, bgcolor: 'var(--json-viewer-bg-color)', maxHeight: 850 }}
      >
        <InputLabel
          sx={{
            color: 'var(--label-font-color)',
            fontSize: 12,
            ml: 2,
            mt: 0.5,
          }}
        >
          {isViewer ? dictionary.responseViewer : dictionary.requestEditor}
        </InputLabel>
        <SyntaxHighlighter
          data-testid={MODE.RESPONSE_VIEWER}
          style={a11yDark}
          customStyle={{
            backgroundColor: 'var(--json-viewer-bg-color)',
            fontSize: 16,
            maxHeight: 810,
            marginTop: 0,
          }}
          language="json"
          wrapLongLines
        >
          {response}
        </SyntaxHighlighter>
      </Box>
    );
  } else {
    return (
      <TextField
        id={MODE.REQUEST_EDITOR}
        label={dictionary.requestEditor}
        multiline
        fullWidth
        rows={editorRows}
        variant="filled"
        margin="normal"
        value={bodyRequest}
        onChange={changeHandler}
      />
    );
  }
}
