export const LeccionData = [
    {
        id: 'array',
        title: 'Array',
        definition: 'Es la estructura de datos más simple y utilizada. Cuenta con la menor cantidad de reglas y están almacenadas en una memoria contigua que está en orden. Los arreglos son todo lo que necesitas si sólo vas almacenar unos datos e iterar sobre ellos, recorriéndolos uno por uno. Especialmente si conoces los índices.',
        where: 'Los arreglos se pueden ver implementados en el desarrollo de otras estructuras de datos como lo son las tablas hash, pilas y colas. Aunque también se encuentran en situaciones cotidianas, acciones como agregar un número de contacto a nuestro teléfono o añadir una nueva canción a nuestra playlist son procesos que siguen la arquitectura de un arreglo.',
        explication: '',
        img: '',
        more: 'Métodos',
        more_added: [
            {
                title: 'Método pop',
                text: 'El método pop elimina el último elemento de un arreglo. Es de tiempo constante O(1) porque siempre hará una operación sin importar el tamaño del arreglo.',
                img: '/assets/img/array_pop.gif',
            },
            {
                title: 'Método push',
                text: 'El método push agrega un elemento al final del arreglo. Es de tiempo constante O(1) porque siempre hará una operación sin importar el tamaño del arreglo. ',
                img: '/assets/img/array_push.gif',
            },
            {
                title: 'Método insert',
                text: 'El método insert agrega un elemento seleccionando un índice del arreglo. Es de tiempo lineal O(n) porque Big-O considera el peor caso, ese sería insertar un elemento en el primer índice, obligando así hacer n operaciones para reorganizar el arreglo.',
                img: '/assets/img/array_insert.gif',
            },
            {
                title: 'Método delete',
                text: 'El método delete elimina un elemento seleccionando un índice del arreglo. Es de tiempo lineal O(n) porque Big-O considera el peor caso, ese sería eliminar el primer elemento, obligando así hacer n operaciones para reorganizar el arreglo.',
                img: '/assets/img/array_delete.gif',
            }
        ],
        advantage: [
            {
                one: 'Tener una estructura ordenada con datos cerca uno del otro en la memoria lo hace realmente rápido.',
                two: 'Son ideales para búsquedas rápidas en la que se sabe que índice consultar.',
                three: 'Los métodos push y pop son de tiempo constante O (1).',
                four: 'Cuando aprendes algoritmos, descubres que son realmente buenos para ordenar datos.'
            }
        ],
        disadvantage: [
            {
                one: 'Duplica su espacio de memoria para generar otro arreglo por si el primero queda lleno.',
                two: 'La forma en la que escala no es óptima ni simple.',
                three: 'Tiene inserciones y eliminaciones lentas porque generalmente debes cambiar el arreglo.',
                four: 'Corres con el riesgo de consumir mucha memoria si llenas el arreglo y te quedan más elementos por agregar.'
            }
        ]
    },
    {
        id: 'hashtable',
        title: 'Hash Table',
        definition: 'Las tablas hash son una estructura de datos que relacionan una llave y un valor utilizando una función hash. Esta función es la encargada de calcular el índice al que han de ir a parar los elementos que estamos guardando en la tabla.',
        where: 'Los ve mucho en base de datos y en el caché. ¡Incluso el algoritmo que emplea Shazam para encontrar tus canciones utiliza tablas hash!',
        explication: 'Imagina que vas a salir a comprar 5 helados, 8 hamburguesas y 4 refrescos para una cena familiar. La función hash toma nuestro pedido. Luego agarra la clave (en este caso es nuestra comida) y la transforma en un índice, a este índice se le realizan ciertas operaciones que define la misma función para poder encontrar una ubicación en la memoria para poder almacenar nuestro pedido. Imagina que el sistema ya albergó la cantidad máxima de comida, por lo que en el próximo ingreso seguro coincidirá en el mismo espacio de memoria que el de alguna comida añadida anteriormente. A este problema se le conoce como "colisión".',
        img: '',
        more: 'Métodos',
        more_added: [
            {
                title: 'O(1): Tiempo constante',
                text: 'No importa cuán grande sea la entrada siempre hará la misma cantidad de operaci. Un ejemplo podría ser identificar el primer elemento de un arreglo.',
                img: '',
            },
            {
                title: 'O(n): Tiempo lineal',
                text: 'n denota el número de elementos o el tamaño de la entrada. Tiene tantas operaciones como elementos. Un ejemplo podría ser busccar algo en un arreglo de n elementos.',
                img: '/assets/img/O(n).jpg',
            },
            {
                title: 'O(n²): Tiempo cuadrático',
                text: 'Incrementa cuadráticamente por cada elemento que se le añada a la entrada. Un ejemplo podría ser la implementación de un ciclo for anidado.',
                img: '/assets/img/O(nn).jpg',
            }
        ],
        advantage: [
            {
                one: 'Por lo general utiliza más espacio, pero optimiza el tiempo del proceso.',
                two: 'Útiles para mejorar la complejidad del tiempo. ¡Especialmente para reemplazar los bucles anidados!',
                three: 'Sus lookup e inserciones son realmente rápidos.',
                four: 'Tienen claves flexibles permitiendo que sus búsquedas sean rápidas.'
            }
        ],
        disadvantage: [
            {
                one: 'No tienen orden. Están dispersos en la memoria.',
                two: 'Aumenta la complejidad de la memoria.',
                three: 'Si quieres tomar todas las claves de una tabla hash, tendrás que recorrer todo el espacio de la memoria.',
                four: 'Se debe tener en cuenta una buena resolución para colisiones.'
            }
        ]
    },
    {
        id: 'linkedlist',
        title: 'Linked List',
        definition: 'Es una estructura de datos muy simple. Es básicamente un elemento que se vincula al siguiente elemento, el cual se vincula al siguiente elemento hasta que el último elemento apunta a null.',
        explication: 'Las listas enlazadas constan de un conjunto de nodos. Puedes considerar a cada uno de estos nodo como un objeto, dentro de él habrán dos atributos: un valor que posee y un puntero que apunta hacia el siguiente nodo.',
        img: '',
        more: 'Métodos',
        advantage: [
            {
                one: 'Son ordenadas.',
                two: 'Podemos añadir otro elemento sin cambiar los índices.',
                three: 'Las operaciones de inserción y eliminación son rápidas.',
                four: 'No sabemos cuando terminará la lista. Son dinámicas.'
            }
        ],
        disadvantage: [
            {
                one: 'Requieren de mucha más memoria.',
                two: 'No hay acceso aleatorio, cuando buscas algo debes recorrer toda la lista.',
                three: 'Tiene búsquedas lentas.',
                four: 'Son difíciles por los punteros, pero livianos y autónomos.'
            }
        ]
    },
    {
        id: 'stack',
        title: 'Stack',
        definition: 'Las pilas son una estructura de datos lineal; es decir, permiten recorrer secuencialmente sus datos. Sigue el principio LIFO ("último en entrar, primero en salir"). Son similares a las colas, teniendo como única diferencia la forma en como se eliminan los elementos. Tratan exclusivamente con el elemento que está al principio o al final de la estructura de datos.',
        where: 'La arquitectura de las pilas están muy presentes en el modelo de la mayoría de lenguajes de programación. Está presente en el historial de navegación al presionar el botón de Atrás y en el funcionamiento del botón de Deshacer cuando escribes algún texto.',
        explication: '',
        more: 'Métodos',
        advantage: [
            {
                one: 'Las restricciones de sus métodos las convierten en estructuras de datos muy óptimas.',
                two: 'Son ordenadas.',
                three: 'Tiene operaciones rápidas.',
                four: 'Son útiles cuando necesitas saber el último valor que se vio o agregó.'
            }
        ],
        disadvantage: [
            {
                one: '1',
                two: '2',
                three: 'Son lentas sus búsquedas.',
                four: 'Se requiere de muchos recursos para poder construir un grafo que escale bien.'
            }
        ]
    },
    {
        id: 'queue',
        title: 'Queue',
        explication: '',
        more: 'Métodos',
        advantage: [
            {
                one: 'Las restricciones de sus métodos las convierten en estructuras de datos muy óptimas.',
                two: 'Son ordenadas.',
                three: 'Tiene operaciones rápidas.',
                four: 'El método peek es rápido.'
            }
        ],
        disadvantage: [
            {
                one: '1',
                two: '2',
                three: 'Son lentas sus búsquedas.',
                four: 'Se requiere de muchos recursos para poder construir un grafo que escale bien.'
            }
        ]
    },
    {
        id: 'tree',
        title: 'Tree',
        definition: ' Es una estructura de datos que tiene una estructura jerárquica, a diferencia de las estructuras de datos lineales como lo son las listas enlazadas o los arreglos. Están definidos como una colección de nodos, vértices, aristas y que además es acíclica.',
        where: 'Puedes encontrarlo en el DOM; en la toma de decisiones y en los juegos en línea como el ajedrez. Los comentarios de Facebook son una estructura de datos del tipo árbol en el cual puedo comentar la foto de un amigo y su amigo puede comentar mi comentario.',
        explication: '',
        more: 'Clasificación',
        more_added: [
            {
                title: 'Árbol binario',
                text: 'Es un tipo de árbol que cumpla con las siguientes reglas: cada hijo sólo puede tener un padre, cada nodo sólo pueder 0, 1, 2 nodos, y finalmente, cada nodo representa un estado determinado.',
                img: '',
            },
            {
                title: 'Árbol binario perfecto',
                text: 'El árbol binario perfecto tiene todo completado. Todos los nodos hojas están llenos y no hay ninguno que tenga un solo hijo; estos tienen 0 o 2 hijos.',
                img: '/assets/img/tree_binary.jpg',
            },
            {
                title: 'Árbol binario completo',
                text: '.',
                img: '/assets/img/full_binary_tree.jpg',
            }
        ],
        advantage: [
            {
                one: 'Son indispensables porque algunos datos necesitan estar en forma de grafo.',
                two: 'Son buenos para relaciones.',
                three: 'Hay algoritmos en tornos a únicamente a grafos.',
                four: 'Son utilizados cuando se trata de modelar la vida real.'
            }
        ],
        disadvantage: [
            {
                one: '1',
                two: '2',
                three: 'Los grafos son muy difíciles de escalar.',
                four: 'Se requiere de muchos recursos para poder construir un grafo que escale bien.'
            }
        ]
    },
    {
        id: 'graph',
        title: 'Graph',
        definition: 'Un grafo es simplemente un conjunto de valores que está relacionado por pares y que parece una red. Cada elemento se llama nodo o vértice y se unen con aristas.',
        where: 'Facebook lo usa para su red social. Amazon para sus motores de recomendación y Google Maps para determinar el camino más corto hacia el lugar que desea ir.',
        explication: '',
        more: 'Clasificación',
        more_added: [
            {
                title: 'Grafos cíclicos y acíclicos',
                text: 'Un grafo cíclico es aquel cuyo camino recorre todos los nodos de un grafo pasando una y solo una vez por cada arista, es de condición necesaria que regrese al vértice en donde inició el camino, en cambio, los grafos acíclicos son aquellos que no tienen ciclos.',
                img: '/assets/img/graph_cycle.jpg',
            },
            {
                title: 'Grafos dirigidos y no dirigidos',
                text: 'Los grafos dirigidos son aquellos que poseen direcciones en sus aristas, en cambio, los grafos no dirigidos no tienen definido un sentido.',
                img: '/assets/img/graph_dirigido.jpg',
            },
            {
                title: 'Grafos ponderados y no ponderados',
                text: 'Los grafos ponderados son aquellos que tienen un valor o un peso asociado en cada uno de sus aristas, en cambio, los grafos no ponderados son aquellos que no tiene un valor o un peso asociado en sus aristas.',
                img: '/assets/img/grafo_ponderado.jpg',
            }
        ],
        advantage: [
            {
                one: 'Son indispensables porque algunos datos necesitan estar en forma de grafo.',
                two: 'Son buenos para relaciones.',
                three: 'Hay algoritmos en tornos a únicamente a grafos.',
                four: 'Son utilizados cuando se trata de modelar la vida real.'
            }
        ],
        disadvantage: [
            {
                one: '1',
                two: '2',
                three: 'Los grafos son muy difíciles de escalar.',
                four: 'Se requiere de muchos recursos para poder construir un grafo que escale bien.'
            }
        ]
    },
    {
        id: 'big-o',
        title: 'Big-O',
        definition: 'Cuando hablamos de rendimiento y optimización resulta importante definir una forma en la que podamos hablar sobre que tan bueno o malo es un algoritmo para ciertos casos. Big-O nos permite clasificar todas las diferentes formas en las que crecen los algoritmos dependiendo de las entradas (input).',
        where: 'Está presente en cualquier código que desarrollamos para resolver un problema. Big-O podría ayudarnos a definir como escala nuestro programa y si nuestro algoritmo es el adecuado para la situación.',
        previous: [
            {
                title: 'Fundamentos',
                text_left: ' Tienes que tener en cuenta algo: Al hablar de la rapidez de un algoritmo no podemos simplificarlo con el tiempo, pues muchos algoritmos cambian su comportamiento al modificar el tamaño de la entrada. Algunos algoritmos funcionan bien con cantidades pequeñas de datos pero muy mal con cantidades grandes y viceversa.',
                text_right: 'Suele relacionarse con legibilidad, escalabilidad y rapidez. La rapidez en ocasiones está influenciada por el ordenador que estamos usando. Así que habría que estudiar como escala nuestro código y ahí Big-O nos podría ayudar. En lugar de calcular el tiempo de ejecución para medir su eficiencia, puede calcularse cuántas operaciones se realizan.',
            }
        ],
        explication: 'Big-O se preocupa por el tamaño de la entrada, sobre todo cuando es grande. Nosotros podemos comparar dos algoritmos diferentes usando Big-O y decir cual es mejor que otro cuando se trata de escalabilidad, independientemente de las diferencias de nuestro ordenador. Cuando hablamos de Big-O y escalabilidad del código nos referimos a cuanto se ralentiza nuestro algoritmo mientras nuestra entrada va creciendo. Esto es posible representarlo a través del siguiente gráfico:',
        img: '/assets/img/big-o.jpg',
        more: 'Clasificación',
        more_added: [
            {
                title: 'O(1): Tiempo constante',
                text: 'No importa cuán grande sea la entrada siempre hará la misma cantidad de operaci. Un ejemplo podría ser identificar el primer elemento de un arreglo.',
                img: '/assets/img/O(1).jpg',
            },
            {
                title: 'O(n): Tiempo lineal',
                text: 'n denota el número de elementos o el tamaño de la entrada. Tiene tantas operaciones como elementos. Un ejemplo podría ser busccar algo en un arreglo de n elementos.',
                img: '/assets/img/O(n).jpg',
            },
            {
                title: 'O(n²): Tiempo cuadrático',
                text: 'Incrementa cuadráticamente por cada elemento que se le añada a la entrada. Un ejemplo podría ser la implementación de un ciclo for anidado.',
                img: '/assets/img/O(nn).jpg',
            }
        ],
        information_aditional: 'Existen distintos tipos de Big-O que están asociados a diferentes algoritmos. Veamos cuáles son:',
        aditional: [
            'O (1): Sin bucles.',
            'O (log(n)): Por lo general, los algoritmos de búsqueda tienen log(n) si están ordenados (búsqueda binaria).',
            'O (n): Bucles for, while; ciclos que recorren n elementos.',
            'O (n log(n)): Generalmente operaciones de clasificación.',
            'O (n²): Cada elemento de una colección debe compararse con cualquier otro elemento. Bucles anidados.',
            'O (2ⁿ): Algoritmos recursivos que resuelven un problema de tamaño n.',
            'O (n!): Agregar un bucle a cada elemento'
        ]
    },
    {
        id: 'recursive',
        title: 'Algoritmos recursivos',
        more: 'Nada.',
        more_added: [
            {
                one: '',
                two: '',
                three: '',
                four: ''
            }
        ],
    },
    {
        id: 'sort',
        title: 'Algoritmos de ordenamiento',
        more: 'Nada.',
        more_added: [
            {
                one: '',
                two: '',
                three: '',
                four: ''
            }
        ],
    },
    {
        id: 'search',
        title: 'Algoritmos de búsqueda',
        more: 'Nada.',
        more_added: [
            {
                one: '',
                two: '',
                three: '',
                four: ''
            }
        ],
    }
];