'use client'

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import {
  Br,
  Cut,
  Line,
  Printer,
  Row,
  Text,
  render,
} from 'react-thermal-printer';

export function PrinterComponent() {
  const receipt = (
    <Printer type="epson" width={42} characterSet="pc860_portuguese">
      <Text size={{ width: 2, height: 2 }}>fast food</Text>
      <Text bold>texto ainda mais texto</Text>
      <Br />
      <Line />
      <Row left="Text" right="txeT" />
      <Row left="Text" right="txeT " />
      <Row left="Text" right="txeT" />
      <Row left="Text" right="txeT" />
      <Row left="Text" right="txeT" />
      <Row left="Text" right="txeT" />
      <Line />
      <Row left="Text" right="txeT" />
      <Text>OUTRO TEXTO</Text>
      <Row left="Text" right="txeT" />
      <Br />
      <Line />
      <Row left="Text" right="txeT" />
      <Row left="Tex" right="txeT" />
      <Line />
      <Row left="Text" right="txeT" />
      <Row left="Text" right="txeT" />
      <Row left="Text" right="txeT" />
      <Row left="Text" right="txeT" />
      <Line />
      <Br />
      <Text align="center">Wifi: some-wifi / PW: 123123</Text>
      <Cut />
    </Printer>
  );

  const [port, setPort] = useState<SerialPort>();
  const { mutateAsync: print, isLoading: isPrinting } = useMutation(
    async () => {
      let _port = port;
      if (_port == null) {
        _port = await navigator.serial.requestPort();
        await _port.open({ baudRate: 9600 });
        setPort(_port);
      }

      const writer = _port.writable?.getWriter();
      if (writer != null) {
        const data = await render(receipt);

        await writer.write(data);
        writer.releaseLock();
      }
    },
  );

  return (
    <main>
      <div>{receipt}</div>
      <div style={{ marginTop: 24 }}>
        <button type="button" disabled={isPrinting} onClick={() => print()}>
          {isPrinting ? 'Imprimindo' : 'Imprimir'}
        </button>
      </div>
    </main>
  );
}
