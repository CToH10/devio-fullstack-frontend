'use client';

import { useApi } from '@/context/apiContext';
import { Br, Cut, Line, Printer, Row, Text } from 'react-thermal-printer';

// comments are library recommended way of connecting to printer

export function PrinterComponent() {
  const { payingOrder, paymentMethod, money, change } = useApi();

  const receipt = (
    <Printer type="epson" width={42} characterSet="pc860_portuguese">
      <Text
        size={{ width: 2, height: 2 }}
        align="center"
        bold
        className="font-bold text-size_5_24 text-center"
      >
        fast food
      </Text>
      <Br />
      <Line className="border-dashed" />
      {payingOrder.product_orders.map(order => (
        <>
          <Row
            className="flex w-80 justify-between"
            key={order.product.id}
            left={`${order.quantity}x - ${order.product.name}`}
            right={order.product.price.toLocaleString('pt-BR', {
              currency: 'BRL',
              style: 'currency',
            })}
          />
          <Text size={{ width: 1, height: 1 }}>{order.comment}</Text>
          {order.additionals.map(add => {
            return (
              <Row
                className="flex w-80 justify-between text-size_8_14"
                key={add.additional.name}
                left={add.additional.name}
                right={add.additional.price.toLocaleString('pt-BR', {
                  currency: 'BRL',
                  style: 'currency',
                })}
              />
            );
          })}
        </>
      ))}
      <Br />
      <Line className="border-dashed" />
      <Text
        align="center"
        size={{ height: 3, width: 3 }}
        bold
        className="font-bold text-size_2_36 text-center"
      >
        {payingOrder.code}
      </Text>
      <Br className="hidden" />
      <Line className="border-dashed" />
      <Text className="font-semibold text-center">{payingOrder.client}</Text>
      <Line className="border-dashed" />
      <Row
        className="flex w-80 justify-between"
        left="Total do pedido:"
        right={
          <Text bold className="font-bold">
            {payingOrder.priceTotal.toLocaleString('pt-BR', {
              currency: 'BRL',
              style: 'currency',
            })}
          </Text>
        }
      />
      <Br />
      <Line className="border-dashed" />
      {paymentMethod === 'cash' ? (
        <Row
          className="flex w-80 justify-between text-size_8_14"
          left={`Total pago: ${money.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}`}
          right={`Troco: ${change.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}`}
        />
      ) : (
        <Text align="center" className="text-center">
          {`Pago em ${paymentMethod === 'credit' ? 'crédito' : 'débito'}`}
        </Text>
      )}

      <Line className="border-dashed" />
      <Br />
      <Text align="center" className="text-center">
        Volte sempre!
      </Text>
      <Br />
      <Cut />
    </Printer>
  );

  // const [port, setPort] = useState<SerialPort>(null);
  // const { mutateAsync: print, isLoading: isPrinting } = useMutation(
  //   async () => {
  //     let printPort = port;

  //     if (printPort == null) {
  //       printPort = await navigator.serial.requestPort();
  //       await printPort.open({ baudRate: 9600 });
  //       setPort(printPort);
  //     }

  //     const writer = printPort.writable?.getWriter();
  //     if (writer != null) {
  //       const data = await render(receipt);

  //       await writer.write(data);
  //       writer.releaseLock();
  //     }
  //   },
  // );

  return (
    <section>
      <div>{receipt}</div>
      <div style={{ marginTop: 24 }}>
        <button
          type="button"
          className="btn-big btn-green print:hidden"
          // disabled={isPrinting}
          // onClick={() => print()}
          onClick={() => window.print()}
        >
          {/* {isPrinting ? 'Imprimindo' : 'Imprimir'} */}
          Imprimir
        </button>
      </div>
    </section>
  );
}
