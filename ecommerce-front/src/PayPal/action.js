const userAction = (userObj) => { // action
    return {
        isPay: userObj
    }
}

const changeUser = (state = {}, action) => {
    return{
        ...state,
        isPay: action.isPay
    }
}

export default {
    userAction,changeUser
}
