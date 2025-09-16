import { TextEncoder, TextDecoder } from 'util';
import { ReadableStream, WritableStream, TransformStream } from 'stream/web';

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder as unknown as typeof TextDecoder;

(global as any).ReadableStream = ReadableStream;
(global as any).WritableStream = WritableStream;
(global as any).TransformStream = TransformStream;

class MockBroadcastChannel {
  constructor() {}
  postMessage() {}
  close() {}
  onmessage() {}
}

(global as any).BroadcastChannel = MockBroadcastChannel;
