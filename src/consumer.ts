import { connect } from 'amqplib';

const AMQP_URL = 'amqp://mendezd:mendezd@localhost';

const QUEUE = 'hello';

export const consumer = async () => {
  try {
    const connection = await connect(AMQP_URL);

    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE, { durable: false });

    channel.consume(
      QUEUE,
      (msg: any) => {
        console.log(' [x] Received %s', msg.content.toString());
      },
      {
        noAck: true,
      }
    );
    channel.consume(
      `${QUEUE} 2`,
      (msg: any) => {
        console.log(' [x] Received %s', msg.content.toString());
      },
      {
        noAck: true,
      }
    );
  } catch (error) {}
};

consumer();
