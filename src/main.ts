import {App} from "./app";

async function bootstrap() {
    const app = new App(8000);
    await app.init();
}

bootstrap();
