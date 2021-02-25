const INCREMENT = 'test/INCREMENT' as const;
const DECREMENT = 'test/DECREMENT' as const;

export const increase = () => <const>({type:INCREMENT});
export const decrease = () => <const>({type:DECREMENT});

type TestAction = 
    ReturnType<typeof increase> |
    ReturnType<typeof decrease>;

const initialState = {
    count: 0,
    value: 0
}

export default function TestReducer(state=initialState, action:TestAction) {
    switch(action.type) {
        case INCREMENT:
            return {...state, count:state.count + 1};
        case DECREMENT:
            return {...state, count:state.count - 1};
        default:
            return state;
    }
}