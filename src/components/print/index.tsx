'use client';

import { useApi } from '@/context/apiContext';
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
  const { payingOrder } = useApi();
  const receipt = (
    <Printer type="epson" width={42} characterSet="pc860_portuguese">
      <Text size={{ width: 2, height: 2 }} align="center" bold>
        fast food
      </Text>
      <Br />
      <Line />
      {payingOrder.product_orders.map(order => (
        <>
          <Row
            left={`${order.quantity}x - ${order.product.name}`}
            right={order.product.price.toLocaleString('pt-BR', {
              currency: 'BRL',
              style: 'currency',
            })}
          />
          <Text size={{ width: 1, height: 1 }}>{order.comment}</Text>
        </>
      ))}
      <Br />
      <Line />
      <Text align="center" size={{ height: 3, width: 3 }} bold>
        {payingOrder.code}
      </Text>
      <Br />
      <Line />
      {/* <Text>{payingOrder.client}</Text>
      <Line /> */}
      <Row
        left="Total do pedido:"
        right={
          <Text bold>
            {payingOrder.priceTotal.toLocaleString('pt-BR', {
              currency: 'BRL',
              style: 'currency',
            })}
          </Text>
        }
      />
      <Br />
      <Line />
      <Text align="center">Volte sempre!</Text>
      <Br />
      <Cut />
    </Printer>
  );

  const [port, setPort] = useState<SerialPort>(null);
  const { mutateAsync: print, isLoading: isPrinting } = useMutation(
    async () => {
      let printPort = port;

      if (printPort == null) {
        printPort = await navigator.serial.requestPort();
        await printPort.open({ baudRate: 9600 });
        setPort(printPort);
      }

      const writer = printPort.writable?.getWriter();
      if (writer != null) {
        const data = await render(receipt);

        await writer.write(data);
        writer.releaseLock();
      }
    },
  );

  return (
    <section>
      <div>{receipt}</div>
      {/* <div style={{ marginTop: 24 }}>
        <button
          type="button"
          className="btn-big btn-green"
          disabled={isPrinting}
          onClick={() => print()}
        >
          {isPrinting ? 'Imprimindo' : 'Imprimir'}
        </button>
      </div> */}
    </section>
  );
}
