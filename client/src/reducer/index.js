import { GET_DOGS,GET_TEMPERAMENTS,GET_FILTER_TEMPERAMENTS,GET_BREED,ORDER_BY_NAME, ORDER_BY_WEIGHT,DOG_DETAILS } from "../actions/types";

const initialState = {
    dogs: [],
    temperaments: [],
    allDogs: [],
    details: [],
} 

const rootReducer = (state = initialState, action) => {//creo el reducer pasandoles el estado inicial y las actions
    switch (action.type) {
      case GET_DOGS:
        action.payload.forEach(el => {
          if (!el.temperaments[0]) {
            el.temperaments[0] = "no-temperaments" 
          }
        });
        return {
          ...state,
          dogs: action.payload,
          allDogs: action.payload,
        };
      case GET_TEMPERAMENTS:
        const filteresTemp = action.payload.filter((temp) => temp.name !== ""); //quito strings vacios
        return {
          ...state,
          temperaments: filteresTemp,
        };
  
      case GET_FILTER_TEMPERAMENTS:
        const allDogs = state.allDogs;
        let filteredDogs = [];
        if (action.payload === "All") {
          filteredDogs = allDogs;
        } else {
          for (let i = 0; i < allDogs.length; i++) {
            let found = allDogs[i].temperaments.find((t) => t === action.payload);
            if (found) {
              filteredDogs.push(allDogs[i]);
            } 
          }
        }
        return {
          
          ...state,
          dogs: filteredDogs,
        };
      case GET_BREED:
        return {
          ...state,
          dogs: action.payload,
        };
      case ORDER_BY_NAME:
        
          return {
            ...state,
            dogs: state.allDogs.sort((a, b) =>
              action.payload === "A-Z"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
            ),
          };
  
          case ORDER_BY_WEIGHT:
            const weightComparator = (a, b) => {
              const weightA = parseInt(a.weight[1]);
              const weightB = parseInt(b.weight[1]);
              if (weightA > weightB) {
                return action.payload === "min_weight" ? 1 : -1;
              }
              if (weightB > weightA) {
                return action.payload === "min_weight" ? -1 : 1;
              }
              return 0;
            };
            const sortedWeight = state.allDogs.sort(weightComparator);
            return {
              ...state,
              dogs: sortedWeight,
            };
      case DOG_DETAILS:
        let myDetails = action.payload
        if (!myDetails[0].temperaments[0]) { //agregamos "no-temperaments" a arreglos sin elementos dentro
          myDetails[0].temperaments[0] = "no-temperaments"
        }
        return {
          ...state,
          details: myDetails
        };
      default:
        return state;
    }
  };
export default rootReducer;