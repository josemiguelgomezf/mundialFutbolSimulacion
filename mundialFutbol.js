import { desordenar } from './desordenar.js';
export default class mundialFutbol {
    constructor(nombre, teams) {
      this.nombre = nombre;
      this.teams = teams;
      const planificacionGrupos = [];
      const planificacionPartidos = [];
      const equiposPlayoffs = [];
      this.crearGrupos(planificacionGrupos);
      this.crearPartidos(planificacionGrupos, planificacionPartidos);
      console.log('Grupos y equipos');
      console.log('===============================================');
      this.mostrarPlanificacionPrevia(planificacionGrupos, planificacionPartidos);
      console.log('===============================================');
      console.log('==============COMIENZA EL MUNDIAL==============');
      console.log('===============================================');
      this.jugarPartidos(planificacionGrupos,planificacionPartidos);
      console.log('===============================================');
      console.log('======COMIENZO DE LA FASE DE ELIMINATORIAS=====');
      console.log('===============================================');
      this.playoffs(planificacionGrupos, equiposPlayoffs);
    }
    nombreGrupo(i){
      //creamos una variable letra y un array abecedario
      var letra;
      const abecedario=['A','B','C','D','E','F','G','H'];
      //si existe la posicion en el array abecedario entonces
      //asignamos a la variable letra lo que haya en la posicion dentro de abecedario
      if (abecedario[i]){
        letra=abecedario[i];
      }
      else {
        letra=i;
      }
      //devolvemos el nombre del grupo
      return 'Grupo '+letra;
    }

    crearGrupos(planificacionGrupos){
      //creamos la variable aux que nos permitira posteriormente recorrer el array teams
      var aux = 0;
      for (let i = 0; i < 8; i++) {
        //creamos un grupo por cada vuelta del bucle for
        const grupo = [];
        //añadimos los equipos a cada grupo
        for (let i = 0; i < 4; i++) {
          //añadimos los equipos a cada grupo
          let teamObj = this.añadirInfoEquipos(this.teams[aux]);
          grupo.push(teamObj);
          aux++;
        }
        planificacionGrupos.push(grupo);
      }
    } 

    añadirInfoEquipos(teamName) {
      return {
          nombre: teamName,
          puntos: 0,
          golesFavor: 0,
          golesContra: 0
      }
  }

    crearPartidos(planificacionGrupos, planificacionPartidos){
      for (let i = 0; i < 8; i++) {
        //guardamos un grupo por cada vuelta del bucle for
        const grupo = planificacionGrupos[i];
        //guardamos el conjunto de partidos por cada vuelta del bucle for
        const planificacionJornadas =[];
        const jornada1 =[];
        const jornada2 =[];
        const jornada3 =[];
        const partido1 =[];
        const partido2 =[];
        const partido3 =[];
        const partido4 =[];
        const partido5 =[];
        const partido6 =[];
        partido1.push(grupo[0],grupo[1]);
        partido2.push(grupo[2],grupo[3]);
        partido3.push(grupo[0],grupo[2]);
        partido4.push(grupo[1],grupo[3]);
        partido5.push(grupo[3],grupo[0]);
        partido6.push(grupo[2],grupo[1]);
        jornada1.push(partido1);
        jornada1.push(partido2);
        jornada2.push(partido3);
        jornada2.push(partido4);
        jornada3.push(partido5);
        jornada3.push(partido6);
        planificacionJornadas.push(jornada1);
        planificacionJornadas.push(jornada2);
        planificacionJornadas.push(jornada3);
        //desordenamos las jornadas
        desordenar(planificacionJornadas);
        //desordenamos locales y visitantes
        desordenar(partido1);
        desordenar(partido2);
        desordenar(partido3);
        desordenar(partido4);
        desordenar(partido5);
        desordenar(partido6);
        planificacionPartidos.push(planificacionJornadas);
      } 
    }
    mostrarPlanificacionPrevia(planificacionGrupos, planificacionPartidos){
      //recorremos el array partidos
      let i = 0;
      do {
      console.log(this.nombreGrupo(i));
      console.log('-----------------------------------------------');
      for (var j=0; j<4; j++){
        console.log(planificacionGrupos[i][j].nombre);
      }
      console.log('');
      for (var y=0; y<3; y++){
        console.log('Jornada '+(y+1)+':');
        for (var z=0; z<2; z++){
          console.log('- '+planificacionPartidos[i][y][z][0].nombre+' vs '+planificacionPartidos[i][y][z][1].nombre);
        }
        console.log('');
      }
      i++;
      } while (i < 8);
    }

    jugarPartidos(planificacionGrupos,planificacionPartidos){
      //recorremos el array partidos
        for (var y=0; y<3; y++){
          for (var i=0; i<8; i++){
          console.log(this.nombreGrupo(i)+' - Jornada '+(y+1));
          console.log('-----------------------------------------------');
          for (var z=0; z<2; z++){
            let golesLocal=Math.floor((Math.random() * (10 - 0 + 1)) + 0);
            let golesVisitante=Math.floor((Math.random() * (10 - 0 + 1)) + 0);
            console.log(planificacionPartidos[i][y][z][0].nombre+' '+golesLocal+'-'
            +golesVisitante+' '+planificacionPartidos[i][y][z][1].nombre);
            if (golesLocal>golesVisitante){
              planificacionPartidos[i][y][z][0].puntos+=3;
            }
            if (golesLocal<golesVisitante){
              planificacionPartidos[i][y][z][1].puntos+=3;
            }
            if (golesLocal===golesVisitante){
              planificacionPartidos[i][y][z][0].puntos+=1;
              planificacionPartidos[i][y][z][1].puntos+=1;
            }
            planificacionPartidos[i][y][z][0].golesFavor+=golesLocal;
            planificacionPartidos[i][y][z][0].golesContra+=golesVisitante;
            planificacionPartidos[i][y][z][1].golesFavor+=golesVisitante;
            planificacionPartidos[i][y][z][1].golesContra+=golesLocal;
            planificacionGrupos[i].sort(function (a, b) {
              if (a.puntos > b.puntos) {
                return -1;
              }
              if (a.puntos < b.puntos) {
                return 1;
              }
              if (a.puntos === b.puntos) {
                if ((a.golesFavor-a.golesContra) > (b.golesFavor-b.golesContra)){
                  return -1;
                }
                if ((a.golesFavor-a.golesContra) < (b.golesFavor-b.golesContra)){
                  return 1;
                }
                  if ((a.golesFavor-a.golesContra) === (b.golesFavor-b.golesContra)){
                    if (a.nombre > b.nombre) {
                      return -1;
                    }
                    if (a.nombre < b.nombre) {
                      return 1;
                    }
                    return 0;
                  }
                return 0;
              }
              return 0;
            });
          }
          console.log('Equipo/Puntos/GolesF/GolesC/Diferencia');
          for (var j=0; j<4; j++){
            console.log(planificacionGrupos[i][j].nombre+' '+planificacionGrupos[i][j].puntos+' '+
            planificacionGrupos[i][j].golesFavor+' '+planificacionGrupos[i][j].golesContra+' '+
            (planificacionGrupos[i][j].golesFavor-planificacionGrupos[i][j].golesContra));
          }
          console.log('');
        }
      }
    }
    playoffs(planificacionGrupos, equiposPlayoffs){
      const equiposCuartos = [];
      const equiposSemis = [];
      const equiposFinal = [];
      const equipos3y4 = [];
      var equipoGanador='';
      for (var i=0; i<8; i++){
        for (var j=0; j<2; j++)
        equiposPlayoffs.push(planificacionGrupos[i][j].nombre);
      }
      var string='';
      for (let team of equiposPlayoffs){
        string += team+', ';
      }
      console.log('');
      console.log(string);
      console.log('');
      console.log('=========OCTAVOS DE FINAL==========');
      console.log('');
      for (var i=0; i<8; i+=2){
        let golesLocal=Math.floor((Math.random() * (10 - 0 + 1)) + 0);
        let golesVisitante=Math.floor((Math.random() * (10 - 0 + 1)) + 0);
        let golesLocal2=Math.floor((Math.random() * (10 - 0 + 1)) + 0);
        let golesVisitante2=Math.floor((Math.random() * (10 - 0 + 1)) + 0);
            if (golesLocal>golesVisitante){
            console.log(planificacionGrupos[i][0].nombre+' '+golesLocal+'-'
            +golesVisitante+' '+planificacionGrupos[(i+1)][1].nombre+
            ' => '+planificacionGrupos[i][0].nombre);
            equiposCuartos.push(planificacionGrupos[i][0].nombre);
            }
            if (golesLocal<golesVisitante){
            console.log(planificacionGrupos[i][0].nombre+' '+golesLocal+'-'
            +golesVisitante+' '+planificacionGrupos[(i+1)][1].nombre+
            ' => '+planificacionGrupos[(i+1)][1].nombre);
            equiposCuartos.push(planificacionGrupos[(i+1)][1].nombre);
            }
            if (golesLocal===golesVisitante){
              console.log(planificacionGrupos[i][0].nombre+' '+golesLocal+'-'
              +golesVisitante+' '+planificacionGrupos[(i+1)][1].nombre+
              ' => PENALTIS');
              let ganador=Math.floor(Math.random() * 1);
              if (ganador<1){
                console.log('Gana: '+planificacionGrupos[i][0].nombre);
                equiposCuartos.push(planificacionGrupos[i][0].nombre);
              }
              if (ganador>0) {
                console.log('Gana: '+planificacionGrupos[(i+1)][1].nombre);
                equiposCuartos.push(planificacionGrupos[(i+1)][1].nombre);
              }
            }
            if (golesLocal2>golesVisitante2){
              console.log(planificacionGrupos[i+1][0].nombre+' '+golesLocal2+'-'
              +golesVisitante2+' '+planificacionGrupos[(i)][1].nombre+
              ' => '+planificacionGrupos[i+1][0].nombre);
              equiposCuartos.push(planificacionGrupos[i+1][0].nombre);
              }
            if (golesLocal2<golesVisitante2){
              console.log(planificacionGrupos[i+1][0].nombre+' '+golesLocal2+'-'
              +golesVisitante2+' '+planificacionGrupos[(i)][1].nombre+
              ' => '+planificacionGrupos[(i)][1].nombre);
              equiposCuartos.push(planificacionGrupos[(i)][1].nombre);
              }
            if (golesLocal2===golesVisitante2){
              console.log(planificacionGrupos[i+1][0].nombre+' '+golesLocal2+'-'
              +golesVisitante2+' '+planificacionGrupos[(i)][1].nombre+
              ' => PENALTIS');
                let ganador=Math.floor(Math.random() * 1);
                if (ganador<1){
                  console.log('Gana: '+planificacionGrupos[i+1][0].nombre);
                  equiposCuartos.push(planificacionGrupos[i+1][0].nombre);
                }
                if (ganador>0) {
                  console.log('Gana: '+planificacionGrupos[(i)][1].nombre);
                  equiposCuartos.push(planificacionGrupos[(i)][1].nombre);
                }
            }
      }
      console.log('');
      console.log('=========CUARTOS DE FINAL==========');
      console.log('');
      for (var i=0; i<8; i+=2){
        let golesLocal=Math.floor((Math.random() * (10 - 0 + 1)) + 0);
        let golesVisitante=Math.floor((Math.random() * (10 - 0 + 1)) + 0);
        if (golesLocal>golesVisitante){
          console.log(equiposCuartos[i]+' '+golesLocal+'-'
          +golesVisitante+' '+equiposCuartos[i+1]+
          ' => '+equiposCuartos[i]);
          equiposSemis.push(equiposCuartos[i]);
          }
          if (golesLocal<golesVisitante){
            console.log(equiposCuartos[i]+' '+golesLocal+'-'
            +golesVisitante+' '+equiposCuartos[i+1]+
            ' => '+equiposCuartos[i+1]);
            equiposSemis.push(equiposCuartos[i+1]);
          }
          if (golesLocal===golesVisitante){
            console.log(equiposCuartos[i]+' '+golesLocal+'-'
            +golesVisitante+' '+equiposCuartos[i+1]+
            ' => PENALTIS');
            let ganador=Math.floor(Math.random() * 1);
            if (ganador<1){
              console.log('Gana: '+equiposCuartos[i]);
              equiposSemis.push(equiposCuartos[i]);
            }
            if (ganador>0) {
              console.log('Gana: '+equiposCuartos[i+1]);
              equiposSemis.push(equiposCuartos[i+1]);
            }
          }
      }
      console.log('');
      console.log('=========SEMIFINALES==========');
      console.log('');
      for (var i=0; i<4; i+=2){
        let golesLocal=Math.floor((Math.random() * (10 - 0 + 1)) + 0);
        let golesVisitante=Math.floor((Math.random() * (10 - 0 + 1)) + 0);
        if (golesLocal>golesVisitante){
          console.log(equiposSemis[i]+' '+golesLocal+'-'
          +golesVisitante+' '+equiposSemis[i+1]+
          ' => '+equiposSemis[i]);
          equiposFinal.push(equiposSemis[i]);
          equipos3y4.push(equiposSemis[i+1]);
          }
          if (golesLocal<golesVisitante){
            console.log(equiposSemis[i]+' '+golesLocal+'-'
            +golesVisitante+' '+equiposSemis[i+1]+
            ' => '+equiposSemis[i+1]);
            equiposFinal.push(equiposSemis[i+1]);
            equipos3y4.push(equiposSemis[i]);
          }
          if (golesLocal===golesVisitante){
            console.log(equiposSemis[i]+' '+golesLocal+'-'
            +golesVisitante+' '+equiposSemis[i+1]+
            ' => PENALTIS');
            let ganador=Math.floor(Math.random() * 1);
            if (ganador<1){
              console.log('Gana: '+equiposSemis[i]);
              equiposFinal.push(equiposSemis[i]);
              equipos3y4.push(equiposSemis[i+1]);
            }
            if (ganador>0) {
              console.log('Gana: '+equiposSemis[i+1]);
              equiposFinal.push(equiposSemis[i+1]);
              equipos3y4.push(equiposSemis[i]);
            }
          }
      }
      console.log('');
      console.log('=========TERCER Y CUARTO PUESTO==========');
      console.log('');
        let golesLocal=Math.floor((Math.random() * (10 - 0 + 1)) + 0);
        let golesVisitante=Math.floor((Math.random() * (10 - 0 + 1)) + 0);
        if (golesLocal>golesVisitante){
          console.log(equipos3y4[0]+' '+golesLocal+'-'
          +golesVisitante+' '+equipos3y4[1]+
          ' => '+equipos3y4[0]);
          }
          if (golesLocal<golesVisitante){
            console.log(equipos3y4[i]+' '+golesLocal+'-'
            +golesVisitante+' '+equipos3y4[1]+
            ' => '+equipos3y4[1]);
          }
          if (golesLocal===golesVisitante){
            console.log(equipos3y4[0]+' '+golesLocal+'-'
            +golesVisitante+' '+equipos3y4[1]+
            ' => PENALTIS');
            let ganador=Math.floor(Math.random() * 1);
            if (ganador<1){
              console.log('Gana: '+equipos3y4[0]);
            }
            if (ganador>0) {
              console.log('Gana: '+equipos3y4[1]);
            }
          }
      console.log('');
      console.log('=========FINAL==========');
      console.log('');
        let golesLocal2=Math.floor((Math.random() * (10 - 0 + 1)) + 0);
        let golesVisitante2=Math.floor((Math.random() * (10 - 0 + 1)) + 0);
        if (golesLocal2>golesVisitante2){
          console.log(equiposFinal[0]+' '+golesLocal2+'-'
          +golesVisitante2+' '+equiposFinal[1]+
          ' => '+equiposFinal[0]);
          equipoGanador=equiposFinal[0];
          }
          if (golesLocal2<golesVisitante2){
            console.log(equiposFinal[0]+' '+golesLocal2+'-'
            +golesVisitante2+' '+equiposFinal[1]+
            ' => '+equiposFinal[1]);
            equipoGanador=equiposFinal[1];
          }
          if (golesLocal2===golesVisitante2){
            console.log(equiposFinal[0]+' '+golesLocal2+'-'
            +golesVisitante2+' '+equiposFinal[1]+
            ' => PENALTIS');
            let ganador=Math.floor(Math.random() * 1);
            if (ganador<1){
              console.log('Gana: '+equiposFinal[0]);
              equipoGanador=equiposFinal[0];
            }
            if (ganador>0) {
              console.log('Gana: '+equiposFinal[1]);
              equipoGanador=equiposFinal[1];
            }
          }
          console.log('');
          console.log('===============================================');
          console.log('¡'+equipoGanador+' campeón del mundo!');
          console.log('===============================================');
    }
  }