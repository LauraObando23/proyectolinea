    import express, { Application } from 'express';
    import cors from 'cors';
    import routesCurso from '../routes/curso';
    import routesUser from '../routes/user';
    import routesGrupo from '../routes/grupo';
    import routesCentro from '../routes/centrofor';
    import { curso } from './curso';
    import { user } from './user';
    import { grupo } from './grupo';
    import { centrofor } from './centrofor';
    class Server {
        private app: express.Application;
        private port: string;

        constructor(){
            this.app = express();
            this.port = process.env.port || '3001';
            this.listen();
            this.midlewares(); 
            this.routes();
            this.dbConnect();
        }

        listen(){
            this.app.listen(this.port, () => {
                console.log('Aplicacion corriendo ' + this.port);
            })
        }

        routes(){
            this.app.use('/api/cursos', routesCurso);
            this.app.use('/api/users', routesUser);
            this.app.use('/api/grupos', routesGrupo);
            this.app.use('/api/centro', routesCentro);
        }

        midlewares(){
            //parseo body
            this.app.use(express.json());
            //cors
            this.app.use(cors());
        }

        async dbConnect(){
            try {
                await curso.sync({ alter: true })
                await user.sync()
                await grupo.sync()
                await centrofor.sync()
                console.log('Conexion establecida ok');
            } catch (error){
                console.log('Error en conexion', error);
            }
        }
    }
    export default Server; 
