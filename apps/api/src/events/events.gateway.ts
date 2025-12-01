import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ProductsService } from '../products/products.service';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(private readonly productsService: ProductsService) { }

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
        // Send the first product as initial state
        const initialProduct = this.productsService.getAllProducts()[0];
        client.emit('viewer:update-product', initialProduct);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('host:change-product')
    handleProductChange(client: Socket, productId: string) {
        const product = this.productsService.getProductById(productId);
        if (product) {
            console.log(`Host changed product to: ${product.title}`);
            this.server.emit('viewer:update-product', product);
        }
    }
}
