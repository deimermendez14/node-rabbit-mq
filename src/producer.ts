import { connect } from 'amqplib';

const AMQP_URL = 'amqp://mendezd:mendezd@localhost';

const QUEUE = 'hello';

export const producer = async () => {
  try {
    const connection = await connect(AMQP_URL);

    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE, { durable: false });

    await channel.assertQueue(`${QUEUE} 2`, { durable: false });

    channel.sendToQueue(QUEUE, Buffer.from('Never give up'));
    channel.sendToQueue(
      `${QUEUE} 2`,
      Buffer.from('Never give up from second queue')
    );
  } catch (error) {
    console.error(error);
  }
};

producer();
