/**El seed-database es la informacion que quiero insetar en la base de datos 
 * de manera automatica
 */
interface SeedData {
    entradas:SeedEntrada[];

}
interface SeedEntrada {
    description:string;
    createdAt:number;
    status:string;
}

export const seedDataBase: SeedData = {
    /**Lo que voy a crear en mi base de datos llamada entradas, ahi tendremos
     * las entradas dentro de entradas_database
     */
    entradas : [
        {
            description:'Pendiente:Esta es la descripcion de mi tarea',
            createdAt:Date.now() - 1000000,
            status:'pendiente'
        },
        {
            description:'En progreso:Esta es la descripcion de mi tarea en progress',
            createdAt:Date.now(),
            status:'en-progreso'
        },
        {
            description:'Completada:Esta es la descripcion de mi tarea completada',
            createdAt:Date.now() - 100000,
            status:'completada'
        }
    ]
}