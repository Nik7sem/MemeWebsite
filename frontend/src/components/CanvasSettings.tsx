import React, {useState} from 'react';
import {Button, Container, Field, HStack, NumberInput} from "@chakra-ui/react";
import {clearCanvas, setCanvasSize} from "../api/canvas.ts";

const CanvasSettings = () => {
  const [size, setSize] = useState<{ rows: number, cols: number }>({rows: 100, cols: 100});
  const [isSizeInvalid, setSizeInvalid] = useState<{ rows: boolean, cols: boolean }>({rows: false, cols: false});

  function setCanvasRows(stringRows: string) {
    const rows = parseInt(stringRows)
    if (rows < 1 || rows > 1000) return setSizeInvalid({...isSizeInvalid, rows: true})
    setSizeInvalid({...isSizeInvalid, rows: false})
    setSize({...size, rows})
  }

  function setCanvasCols(stringCols: string) {
    const cols = parseInt(stringCols)
    if (cols < 1 || cols > 1000) return setSizeInvalid({...isSizeInvalid, cols: true})
    setSizeInvalid({...isSizeInvalid, cols: false})
    setSize({...size, cols})
  }

  return (
    <Container>
      <Button onClick={() => clearCanvas()}>Clear canvas</Button>
      <HStack>
        <Field.Root invalid={isSizeInvalid.rows}>
          <Field.Label>Rows</Field.Label>
          <NumberInput.Root value={size.rows.toString()}
                            onValueChange={e => setCanvasRows(e.value)} width="200px">
            <NumberInput.Control/>
            <NumberInput.Input/>
          </NumberInput.Root>
          <Field.ErrorText>{"invalid (1 <= rows <= 1000)"}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={isSizeInvalid.cols}>
          <Field.Label>Cols</Field.Label>
          <NumberInput.Root value={size.cols.toString()}
                            onValueChange={e => setCanvasCols(e.value)} width="200px">
            <NumberInput.Control/>
            <NumberInput.Input/>
          </NumberInput.Root>
          <Field.ErrorText>{"invalid (1 <= cols <= 1000)"}</Field.ErrorText>
        </Field.Root>
      </HStack>
      <Button mt='20px' onClick={() => setCanvasSize(size)}>Set size</Button>
    </Container>
  );
};

export default CanvasSettings;